import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    isOpen: false,
    entities: [],
  },
  reducers: {
    basketOpen: (state) => {
      state.isOpen = true;
    },
    basketClose: (state) => {
      state.isOpen = false;
    },
    basketAddProduct: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

const { basketOpen, basketClose, basketAddProduct } = basketSlice.actions;

export const openBasket = () => (dispatch) => {
  dispatch(basketOpen());
};

export const closeBasket = () => (dispatch) => {
  dispatch(basketClose());
};

export const addProductToBasket = (productId) => (dispatch) => {
  dispatch(basketAddProduct(productId));
};

export const { reducer: basketReducer } = basketSlice;

export const getBasketStatus = () => (state) => state.basket.isOpen;

export const getBasketEntities = () => {
  return createSelector(
    (state) => state.basket.entities,
    (state) => state.products.entities,
    (basket, products) => {
      const basketProductsItems = basket.map((productId) => {
        return products.find((item) => item._id === productId);
      });
      return basketProductsItems;
    }
  );
};

export default basketReducer;
