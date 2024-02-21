import { tasksReducer } from "reducers/tasksSlice";
import { todolistsReducer } from "reducers/todolistsSlice";
import { appSLice } from "reducers/appSLice";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "reducers/authSlice";

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
