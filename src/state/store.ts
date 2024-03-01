import { appSLice } from "features/app/model/appSLice";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/model/authSlice";
import { tasksReducer } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsReducer } from "features/TodolistsList/model/todolists/todolistsSlice";

export const store = configureStore({
  reducer: {
    app: appSLice,
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
  },
});
export type AppRootStateType = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store;
