import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import localStorageConstants from "../constants/localStorage.constants";
import customHistory from "../utils/history";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    currentUser: null,
    error: null,
    successRegister: false,
  },
  reducers: {
    authRequested: (state) => {
      state.isLoading = true;
    },
    authSetUserSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    authLoginSuccess: (state) => {
      state.isLoading = false;
    },
    authRegisterSuccess: (state) => {
      state.isLoading = false;
      state.successRegister = true;
    },
    authLogOut: (state) => {
      state.currentUser = null;
    },
    authFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    authResetError: (state) => {
      state.error = null;
    },
    authResetRegisterState: (state) => {
      state.successRegister = false;
    },
  },
});

const {
  authLoginSuccess,
  authRegisterSuccess,
  authRequested,
  authSetUserSuccess,
  authLogOut,
  authFailed,
  authResetError,
  authResetRegisterState,
} = authSlice.actions;

const { reducer: authReducer } = authSlice;

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(authRequested());
    dispatch(authResetError());

    const data = await authService.register(userData);
    dispatch(authRegisterSuccess());
  } catch (error) {
    dispatch(authFailed(error.response.data.message));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(authRequested());
    dispatch(authResetError());

    const data = await authService.login(userData);

    dispatch(authLoginSuccess(data.userInfo));
    dispatch(authSetUserSuccess(data.userInfo));
    localStorageService.set(localStorageConstants.token, data.token);
    localStorageService.set(localStorageConstants.userId, data.userId);
    customHistory.replace("/");
  } catch (error) {
    dispatch(authFailed(error.response.data.message));
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    dispatch(authRequested());
    dispatch(authResetError());

    const { userInfo } = await authService.getUser(userId);

    dispatch(authSetUserSuccess(userInfo));
  } catch (error) {
    dispatch(authFailed(error.response.data.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.remove(localStorageConstants.token);
  localStorageService.remove(localStorageConstants.userId);
  dispatch(authLogOut());
  dispatch(authResetError());
  customHistory.replace("/");
};

export const stopLoading = () => (dispatch) => {
  dispatch(authFailed("Не авторизован"));
};

export const resetAuthError = () => (dispatch) => {
  dispatch(authResetError());
};

export const resetRegisterStatus = () => (dispatch) => {
  dispatch(authResetRegisterState());
};

export const getIsAuthLoading = () => (state) => state.auth.isLoading;

export const getCurrentUser = () => (state) => state.auth.currentUser;

export const isRoleIncluded = (role) => (state) =>
  state.auth.currentUser?.roles.includes(role) || false;

export const getAuthError = () => (state) => state.auth.error;

export const getSuccessRegister = () => (state) => state.auth.successRegister;

export default authReducer;
