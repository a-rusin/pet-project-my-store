import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesRecived: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    categoriesRequstedFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { categoriesRequested, categoriesRecived, categoriesRequstedFailed } = categoriesSlice.actions;

const { reducer: categoriesReducer } = categoriesSlice;

export const loadCategoriesList = () => async (dispatch) => {
  try {
    dispatch(categoriesRequested());
    const data = await categoriesService.getAll();
    dispatch(categoriesRecived(data));
  } catch (error) {}
};

export const getCategoriesList = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) => state.categories.isLoading;
export const getCategoryNameByPath = (path) => (state) => state.categories.entities.find((item) => item.path === path);
export const getCategoryNameById = (id) => (state) => state.categories.entities.find((item) => item._id === id);

export default categoriesReducer;
