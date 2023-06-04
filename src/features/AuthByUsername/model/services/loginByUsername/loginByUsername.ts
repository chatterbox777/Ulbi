import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
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
  ThunkConfig<string>
>(
  "loginForm/loginByUsername",
  async (authData, { dispatch, rejectWithValue, extra }) => {
    try {
      const response = await extra.api.post<User>("/login", authData);
      if (!response.data) {
        throw new Error("empty data");
      }
      localStorage.setItem(
        USER_LOCAL_STORAGE_KEY,
        JSON.stringify(response.data)
      );
      dispatch(userActions.setAuthData(response.data));
      extra.navigate("/about");

      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);
