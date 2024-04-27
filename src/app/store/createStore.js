import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import categoriesReducer from "./categories";
import basketReducer from "./basket";
import favouritesReducer from "./favourites";
import authReducer from "./auth";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  basket: basketReducer,
  favourites: favouritesReducer,
  auth: authReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
