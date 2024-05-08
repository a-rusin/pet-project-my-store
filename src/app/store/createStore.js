import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import categoriesReducer from "./categories";
import basketReducer from "./basket";
import favouritesReducer from "./favourites";
import authReducer from "./auth";
import commentsReducer from "./comments";
import contactsReducer from "./contacts";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  basket: basketReducer,
  favourites: favouritesReducer,
  auth: authReducer,
  comments: commentsReducer,
  contacts: contactsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
