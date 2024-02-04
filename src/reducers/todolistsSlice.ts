import {todolistAPI, TodolistType} from 'api/todolist-api'
import {AppThunk} from 'state/store'
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
            // return action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
            state.todolists.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            // return action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
            const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
            if (index > -1) {
                state.todolists.splice(index, 1)
            }
        },

//                 return state.filter(tl => tl.id !== action.id)
    }

})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

// export const _todolistsReducer =
//     (state: TodolistDomainType[] = initialState, action: AppActionsType): TodolistDomainType[] => {
//         switch (action.type) {
//             case 'SET-TODOLISTS':
//                 return action.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
//             case 'ADD-TODOLIST':
//                 return [{...action.todolist, entityStatus: 'idle', filter: 'all'}, ...state]
//             case 'REMOVE-TODOLIST':
//                 return state.filter(tl => tl.id !== action.id)
//             case 'CHANGE-TODOLIST-TITLE':
//                 return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//             case 'CHANGE-TODOLIST-FILTER':
//                 return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//             case 'CHANGE-TODOLIST-ENTITY-STATUS':
//                 return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
//             default:
//                 return state
//         }
//     }

/////////////////   actionCreators
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE' as const, id, title})
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
    ({type: 'CHANGE-TODOLIST-FILTER' as const, id, filter})
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS' as const, id, entityStatus})

/////////////////   thunkCreators
export const getTodolistsTC = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(todolistsActions.setTodolists({todolists: res.data}))
        dispatch(appActions.setStatus({status: 'succeeded'}))
    } catch (error: any) {
        throw new Error(error)
    }
}
export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch) => {
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
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        todolistAPI.deleteTodolist(id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.removeTodolist({id}))
                    dispatch(appActions.setStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTodolistEntityStatusAC(id, 'idle'))
                }
            })
            .catch((error) => {
                dispatch(changeTodolistEntityStatusAC(id, 'idle'))
                handleNetworkAppError(error, dispatch)
            })
    }
export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))

    todolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
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
export type TodolistsActionsType =
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}