import { createSlice } from "@reduxjs/toolkit";

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
    productsReceved: (state, action) => {
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
const { productsRequested, productsReceved, productsRequstFailed } = productsSlice.actions;

export const loadProductsList = () => (dispatch) => {
  dispatch(productsRequested());
};

const getProducts = () => (state) => state.products.entities;

export default productsReducer;
