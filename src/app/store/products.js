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
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequstFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: productsReducer } = productsSlice;
const { productsRequested, productsRecived, productsRequstFailed } = productsSlice.actions;

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested());

  try {
    const data = await productsService.getAll();

    setTimeout(() => {
      dispatch(productsRecived(data));
    }, 4000);
  } catch (error) {}
};

export const getProductsList = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) => state.products.isLoading;

export default productsReducer;
