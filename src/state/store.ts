import {combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {TasksActionsType, tasksReducer} from "reducers/tasks-reducer";
import {TodolistsActionsType, todolistsReducer} from "reducers/todolists-reducer";
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


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export const useAppDispatch = useDispatch <AppDispatchType>;


//@ts-ignore
window.store = store