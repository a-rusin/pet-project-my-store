import { createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: true,
    entities: [],
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsRecived: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    commentsAdd: (state, action) => {
      state.isLoading = false;
      state.entities.push(action.payload);
    },
    commentsFailed: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer: commentsReducer } = commentsSlice;

const { commentsRequested, commentsRecived, commentsAdd, commentsFailed } = commentsSlice.actions;

export const addComment = (payload) => async (dispatch) => {
  try {
    dispatch(commentsRequested());
    const data = await commentsService.add(payload);
    dispatch(commentsAdd(data));
  } catch (error) {
    dispatch(commentsFailed());
  }
};

export const getComments = (productId) => async (dispatch) => {
  try {
    dispatch(commentsRequested());

    const data = await commentsService.get(productId);

    dispatch(commentsRecived(data));
  } catch (error) {
    dispatch(commentsFailed());
  }
};

export const getCommentsEntities = () => (state) => state.comments.entities;
export const getCommentLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
