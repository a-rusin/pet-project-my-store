import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import localStorageService from "../services/localStorage.service";
import localStorageConstants from "../constants/localStorage.constants";
import productsService from "../services/products.service";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    isOpen: false,
    entities: [],
    isLoading: false,
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
        productId: action.payload._id,
        productInfo: action.payload,
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
    basketProductsRequired: (state) => {
      state.isLoading = true;
    },
    basketProductsRecived: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
  },
});

const {
  basketOpen,
  basketClose,
  basketAddProduct,
  bastetDeleteProduct,
  basketIncProductCount,
  basketDecrProductCount,
  basketClearProduct,
  basketProductsRequired,
  basketProductsRecived,
} = basketSlice.actions;

const updateBasketLocalStorage = (data) => {
  const dataBasket = data.map((product) => ({ count: product.count, productId: product.productId }));
  localStorageService.set(localStorageConstants.basket, dataBasket);
};

export const openBasket = () => (dispatch) => {
  dispatch(basketOpen());
};

export const closeBasket = () => (dispatch) => {
  dispatch(basketClose());
};

export const addProductToBasket = (product) => (dispatch, getState) => {
  dispatch(basketAddProduct(product));
  const { basket } = getState();
  updateBasketLocalStorage(basket.entities);
};

export const deleteProductFromBasket = (productId) => (dispatch, getState) => {
  dispatch(bastetDeleteProduct(productId));
  const { basket } = getState();
  updateBasketLocalStorage(basket.entities);
};

export const incrementCountProductInBasket = (productId) => (dispatch, getState) => {
  dispatch(basketIncProductCount(productId));
  const { basket } = getState();
  updateBasketLocalStorage(basket.entities);
};

export const dicrementCountProductInBasket = (productId) => (dispatch, getState) => {
  const { basket } = getState();

  const productItem = basket.entities.find((product) => product.productId === productId);

  if (productItem.count === 1) {
    dispatch(bastetDeleteProduct(productId));
  } else {
    dispatch(basketDecrProductCount(productId));
  }

  const { basket: basketNew } = getState();
  updateBasketLocalStorage(basketNew.entities);
};

export const clearBasket = () => (dispatch, getState) => {
  dispatch(basketClearProduct());

  const { basket } = getState();
  updateBasketLocalStorage(basket.entities);
};

export const getProductsInfo = (productArray) => async (dispatch) => {
  try {
    dispatch(basketProductsRequired());

    const products = productArray.map((item) => item.productId);

    const data = await productsService.getProductsByArray(products);

    const productEntities = productArray.map((item) => ({
      count: item.count,
      productId: item.productId,
      productInfo: data.find((p) => p._id === item.productId),
    }));
    dispatch(basketProductsRecived(productEntities));
  } catch (error) {}
};

export const { reducer: basketReducer } = basketSlice;

export const getBasketStatus = () => (state) => state.basket.isOpen;

export const getBasketEntities = () => (state) => state.basket.entities;

export const getBasketLoadingStatus = () => (state) => state.basket.isLoading;

export default basketReducer;
