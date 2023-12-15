import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from '../reducers/tasks-reducer';
import {todolistsReducer} from '../reducers/todolists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store