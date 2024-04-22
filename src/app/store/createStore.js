import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import categoriesReducer from "./categories";
import basketReducer from "./basket";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  basket: basketReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
