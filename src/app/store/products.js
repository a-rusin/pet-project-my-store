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
  },
});

const { reducer: productsReducer } = productsSlice;
const { productsRequested, productsRecived, productsRequstFailed } = productsSlice.actions;

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
