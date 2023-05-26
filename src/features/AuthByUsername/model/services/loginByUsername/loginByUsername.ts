import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, userActions } from "entities/User";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localstorage";
import { getErrorMessage } from "shared/lib/hooks";

interface LoginByUserNameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUserNameProps,
  { rejectValue: string }
>(
  "loginForm/loginByUsername",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      if (!response.data) {
        throw new Error("empty data");
      }
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);
