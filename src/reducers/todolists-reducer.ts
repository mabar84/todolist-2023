import {todolistAPI, TodolistType} from '../api/todolist-api'
import {AppActionsType, AppThunk} from '../state/store'
import {Dispatch} from 'redux'

const initialState: TodolistDomainType[] = [
    // {id: todolistId1, title: 'What to do', filter: 'all'},
    // {id: todolistId2, title: 'What to learn', filter: 'all'},
]
export const todolistsReducer =
    (state: TodolistDomainType[] = initialState, action: AppActionsType): TodolistDomainType[] => {
        switch (action.type) {
            case 'SET-TODOLISTS':
                return action.todolists.map(tl => ({...tl, filter: 'all'}))
            case 'ADD-TODOLIST':
                return [{...action.todolist, filter: 'all'}, ...state]
            case 'REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.id)
            case 'CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            case 'CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
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

/////////////////   thunkCreators
export const getTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e: any) {
        throw new Error(e)
    }
}
export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch<TodolistsActionsType>) =>
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistsActionsType>) =>
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistsActionsType>) =>
    todolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })

/////////////////   types
export type TodolistsActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}