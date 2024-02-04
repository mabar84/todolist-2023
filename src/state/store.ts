import {combineReducers} from 'redux';
import {tasksReducer} from "reducers/tasksSlice";
import {todolistsReducer} from "reducers/todolistsSlice";
import {appReducer} from "reducers/app-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
export const store = configureStore({reducer: rootReducer})
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store