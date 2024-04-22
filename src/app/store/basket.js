import { createSlice } from "@reduxjs/toolkit";

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
  },
});

const { basketOpen, basketClose } = basketSlice.actions;

export const openBasket = () => (dispatch) => {
  dispatch(basketOpen());
};

export const closeBasket = () => (dispatch) => {
  dispatch(basketClose());
};

const { reducer: basketReducer } = basketSlice;

export const getBasketStatus = () => (state) => state.basket.isOpen;

export default basketReducer;
