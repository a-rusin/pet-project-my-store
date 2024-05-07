import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import localStorageConstants from "../constants/localStorage.constants";
import productsService from "../services/products.service";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    isLoading: false,
    entities: [],
    errors: null,
  },
  reducers: {
    favouritesAddItem: (state, action) => {
      state.entities.push(action.payload);
    },
    favouritesRemoveItem: (state, action) => {
      state.entities = state.entities.filter((f) => f._id !== action.payload._id);
    },
    favouritesRequested: (state) => {
      state.isLoading = true;
    },
    favouritesRecived: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
  },
});

const { reducer: favouritesReducer } = favouritesSlice;

const { favouritesAddItem, favouritesRemoveItem, favouritesRequested, favouritesRecived } = favouritesSlice.actions;

const updateFavouritesLocalStorage = (data) => {
  const dataFavourites = data.map((product) => product._id);
  localStorageService.set(localStorageConstants.favourites, dataFavourites);
};

export const getProductsInfo = (productArray) => async (dispatch) => {
  try {
    dispatch(favouritesRequested());
    const data = await productsService.getProductsByArray(productArray);

    dispatch(favouritesRecived(data));
  } catch (error) {}
};

export const addProductToFavourite = (product) => (dispatch, getState) => {
  const { favourites } = getState();

  const isExist = favourites.entities.find((f) => f._id === product._id);

  if (isExist) {
    dispatch(favouritesRemoveItem(product));
  } else {
    dispatch(favouritesAddItem(product));
  }

  const { favourites: newFavourites } = getState();

  updateFavouritesLocalStorage(newFavourites.entities);
};

export const getFavouritesProductsList = () => (state) => state.favourites.entities;
export const getFavouritesProductsListLoadingStatus = () => (state) => state.favourites.isLoading;

export default favouritesReducer;
