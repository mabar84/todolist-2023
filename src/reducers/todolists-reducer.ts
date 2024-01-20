import {todolistAPI, TodolistType} from '../api/todolist-api'
import {AppActionsType, AppThunk} from '../state/store'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatus} from './app-reducer';
import {handleNetworkAppError, handleServerAppError} from '../utils/error-utils';

const initialState: TodolistDomainType[] = [
    // {id: todolistId1, title: 'What to do', filter: 'all'},
    // {id: todolistId2, title: 'What to learn', filter: 'all'},
]
export const todolistsReducer =
    (state: TodolistDomainType[] = initialState, action: AppActionsType): TodolistDomainType[] => {
        switch (action.type) {
            case 'SET-TODOLISTS':
                return action.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
            case 'ADD-TODOLIST':
                return [{...action.todolist, entityStatus: 'idle', filter: 'all'}, ...state]
            case 'REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.id)
            case 'CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            case 'CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            case 'CHANGE-TODOLIST-ENTITY-STATUS':
                return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
            default:
                return state
        }
    }

/////////////////   actionCreators
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS' as const, todolists})
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST' as const, todolist})
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST' as const, id})
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE' as const, id, title})
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
    ({type: 'CHANGE-TODOLIST-FILTER' as const, id, filter})
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS' as const, id, entityStatus})

/////////////////   thunkCreators
export const getTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatus('succeeded'))
    } catch (error: any) {
        throw new Error(error)
    }
}
export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'))
                }
            })
            .catch((error) => {
                dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'))
                handleNetworkAppError(error, dispatch)
            })
    }
export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}

/////////////////   types
export type TodolistsActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}