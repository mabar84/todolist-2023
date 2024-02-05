import {todolistAPI, TodolistType} from 'api/todolist-api'
import {Dispatch} from 'redux'
import {handleNetworkAppError, handleServerAppError} from 'utils/error-utils';
import {appActions, RequestStatusType} from "reducers/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'todolists',
    initialState: {
        todolists: [] as TodolistDomainType[]
    },
    reducers: {
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            state.todolists = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.todolists.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
            if (index > -1) {
                state.todolists.splice(index, 1)
            }
        },
        changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
            if (index > -1) {
                state.todolists[index].title = action.payload.title
            }
        },
        // changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
        //     const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
        //     if (index > -1) {
        //         state.todolists[index].filter = action.payload.filter
        //     }
        // },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
            if (index > -1) {
                state.todolists[index].entityStatus = action.payload.entityStatus
            }
        },
    },
    selectors: {
        todolists: sliceState => sliceState.todolists
    }
})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsSelectors = slice.selectors

/////////////////   thunkCreators
export const getTodolistsTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(todolistsActions.setTodolists({todolists: res.data}))
        dispatch(appActions.setStatus({status: 'succeeded'}))
    } catch (error: any) {
        throw new Error(error)
    }
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    // dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTodolistTC = (id: string) =>
    (dispatch: Dispatch) => {
        dispatch(appActions.setStatus({status: 'loading'}))
        dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: 'loading'}))
        todolistAPI.deleteTodolist(id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.removeTodolist({id}))
                    dispatch(appActions.setStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: 'idle'}))
                }
            })
            .catch((error) => {
                dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: 'idle'}))
                handleNetworkAppError(error, dispatch)
            })
    }
export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(todolistsActions.changeTodolistTitle({id, title}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
/////////////////   types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}