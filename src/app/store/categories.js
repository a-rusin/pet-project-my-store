import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: [],
    isLoading: true,
  },
});

const { reducer: categoriesReducer } = categoriesSlice;

export default categoriesReducer;
