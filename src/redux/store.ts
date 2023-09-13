import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../redux/slices/authSlice";
import LoaderReducer from "../redux/slices/loaderSlice";
import UserReducer, { setToken } from "../redux/slices/userSlice";
import { api } from "../services/api";
import { StorageKeys } from "../types/shared";

const middleware = [api.middleware];

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  reducer: {
    user: UserReducer,
    loader: LoaderReducer,
    auth: AuthReducer,
    [api.reducerPath]: api.reducer,
  },
});

(async () => {
  try {
    const token = await localStorage.getItem(StorageKeys.token);
    if (token) store.dispatch(setToken(token));
  } catch (error) {
    console.error("Failed to retrieve token from storage:", error);
  }
})();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
