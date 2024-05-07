import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsRecived: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    productsRequstFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    productUpdated: (state, action) => {
      const index = state.entities.findIndex((item) => item._id === action.payload._id);
      state.entities[index] = action.payload;
    },
    productDeleted: (state, action) => {
      state.entities = state.entities.filter((item) => item._id !== action.payload);
    },
    productAddNewItem: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

const { reducer: productsReducer } = productsSlice;
export const { productsRequested, productsRecived, productsRequstFailed, productUpdated, productDeleted, productAddNewItem } = productsSlice.actions;

export const loadProductsList = (path) => async (dispatch) => {
  dispatch(productsRequested());

  try {
    const data = await productsService.getAll(path);

    dispatch(productsRecived(data));
  } catch (error) {}
};

export const getProductsList = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) => state.products.isLoading;

export default productsReducer;
