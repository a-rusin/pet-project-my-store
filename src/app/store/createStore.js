import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import categoriesReducer from "./categories";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
