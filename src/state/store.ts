import {TasksActionsType, tasksReducer} from '../reducers/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../reducers/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const useAppDispatch = useDispatch < AppDispatchType >

//@ts-ignore
window.store = store