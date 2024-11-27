import { createSlice } from "@reduxjs/toolkit";
import { fetchUserAction } from "../actions/userAction";

interface IUser {
  loading: boolean;
  error: undefined | string;
  data: {
    bio: string | null;
    createdAt: string;
    email: string;
    id: string;
    name: string;
    updatedAt: string;
  } | null;
}

const initialState: IUser = {
  loading: false,
  error: undefined,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserAction.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });

    builder.addCase(fetchUserAction.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = undefined;
    });

    builder.addCase(fetchUserAction.rejected, (state, actions) => {
      state.loading = false;
      state.error = actions.error.message;
    });
  },
});

export const { actions: userAction, reducer: userReducer } = userSlice;
