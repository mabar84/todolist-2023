import { appActions } from "reducers/appSLice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleNetworkAppError, handleServerAppError } from "utils/error-utils";
import { todolistsActions } from "components/TodolistsList/model/todolists/todolistsSlice";
import { authAPI, LoginParamsType } from "components/TodolistsList/api/todolists.api";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: {
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
  selectors: {
    isLoggedIn: (sliceState) => sliceState.isLoggedIn,
    isInitialized: (sliceState) => sliceState.isInitialized,
  },
});
// thunks
const initializeApp = createAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authAPI.me();
      if (res.data.resultCode === 0) {
        return { isLoggedIn: true };
      } else {
        return rejectWithValue(null);
      }
    } catch (e: any) {
      handleNetworkAppError(e, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(authActions.setIsInitialized({ isInitialized: true }));
    }
  },
);
const login = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setStatus({ status: "loading" }));
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e: any) {
      handleNetworkAppError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);
const logout = createAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setStatus({ status: "loading" }));
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus({ status: "succeeded" }));
      dispatch(todolistsActions.setTodolists({ todolists: [] }));
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e: any) {
    handleNetworkAppError(e, dispatch);
    return rejectWithValue(null);
  }
});
export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authSelectors = slice.selectors;
export const authThunks = { login, logout, initializeApp };
