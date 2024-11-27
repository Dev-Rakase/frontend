import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../libs/config";

export const fetchUserAction = createAsyncThunk("user/me", async () => {
  const { data } = await API.get("/user/me");
  return data;
});
