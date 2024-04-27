import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import localStorageConstants from "../../constants/localStorage.constants";
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
      state.entities = state.entities.filter((f) => f !== action.payload);
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
  dispatch(favouritesAddItem(product));

  const { favourites } = getState();

  updateFavouritesLocalStorage(favourites.entities);
};

export const getFavouritesProductsList = () => (state) => state.favourites.entities;

export default favouritesReducer;
