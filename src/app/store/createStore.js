import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import categoriesReducer from "./categories";
import basketReducer from "./basket";
import favouritesReducer from "./favourites";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  basket: basketReducer,
  favourites: favouritesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
