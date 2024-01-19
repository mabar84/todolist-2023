import {TasksActionsType, tasksReducer} from '../reducers/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../reducers/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer, AppReducerActionsType} from '../reducers/app-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistsActionsType | TasksActionsType | AppReducerActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export const useAppDispatch = useDispatch <AppDispatchType>;


//@ts-ignore
window.store = store