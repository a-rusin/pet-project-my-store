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
      state.entities.push({
        count: 1,
        productId: action.payload,
      });
    },
    bastetDeleteProduct: (state, action) => {
      state.entities = state.entities.filter((product) => product.productId !== action.payload);
    },
    basketIncProductCount: (state, action) => {
      const productItem = state.entities.find((product) => product.productId === action.payload);
      productItem.count++;
    },
    basketDecrProductCount: (state, action) => {
      const productItem = state.entities.find((product) => product.productId === action.payload);
      productItem.count--;
    },
    basketClearProduct: (state) => {
      state.entities = [];
    },
  },
});

const { basketOpen, basketClose, basketAddProduct, bastetDeleteProduct, basketIncProductCount, basketDecrProductCount, basketClearProduct } =
  basketSlice.actions;

export const openBasket = () => (dispatch) => {
  dispatch(basketOpen());
};

export const closeBasket = () => (dispatch) => {
  dispatch(basketClose());
};

export const addProductToBasket = (productId) => (dispatch) => {
  dispatch(basketAddProduct(productId));
};

export const incrementCountProductInBasket = (productId) => (dispatch) => {
  dispatch(basketIncProductCount(productId));
};

export const dicrementCountProductInBasket = (productId) => (dispatch, getState) => {
  const { basket } = getState();

  const productItem = basket.entities.find((product) => product.productId === productId);

  if (productItem.count === 1) {
    dispatch(bastetDeleteProduct(productId));
  } else {
    dispatch(basketDecrProductCount(productId));
  }
};

export const deleteProductFromBasket = (productId) => (dispatch) => {
  dispatch(bastetDeleteProduct(productId));
};

export const clearBasket = () => (dispatch) => {
  dispatch(basketClearProduct());
};

export const { reducer: basketReducer } = basketSlice;

export const getBasketStatus = () => (state) => state.basket.isOpen;

export const getBasketEntities = () => {
  return createSelector(
    (state) => state.basket.entities,
    (state) => state.products.entities,
    (basket, products) => {
      const basketProductsItems = basket.map((product) => {
        const productItem = products.find((item) => item._id === product.productId);
        return {
          _id: productItem._id,
          count: product.count,
          product: productItem,
        };
      });
      return basketProductsItems;
    }
  );
};

export default basketReducer;
