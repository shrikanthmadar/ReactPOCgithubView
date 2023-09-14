import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "../repos/reposSlice";
import { repoApiSlice } from "../repo-api/repos-api-slice";

export const store = configureStore({
  reducer: {
    repos: repoReducer,
    [repoApiSlice.reducerPath]: repoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(repoApiSlice.middleware);
  },
});

export type appDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;
