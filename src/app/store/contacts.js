import { createSlice } from "@reduxjs/toolkit";
import settingsService from "../services/settings.service";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    isLoading: true,
    entity: null,
    error: null,
  },
  reducers: {
    contactsRequested: (state, action) => {
      state.isLoading = true;
    },
    contactsRecived: (state, action) => {
      state.isLoading = false;
      state.entity = action.payload;
    },
    contactsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { contactsRequested, contactsRecived, contactsFailed } = contactsSlice.actions;

const { reducer: contactsReducer } = contactsSlice;

export const loadContacts = () => async (dispatch) => {
  try {
    dispatch(contactsRequested());
    const data = await settingsService.get();
    dispatch(contactsRecived(data[0]));
  } catch (error) {
    dispatch(contactsFailed(error));
  }
};

export const getContacts = () => (state) => state.contacts.entity;
export const getContactsLoadingStatus = () => (state) => state.contacts.isLoading;

export default contactsReducer;
