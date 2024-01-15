import {todolistAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppActionsType} from '../state/store';

export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}
const initialState: TodolistDomainType[] = [
    // {id: todolistId1, title: 'What to do', filter: 'all'},
    // {id: todolistId2, title: 'What to learn', filter: 'all'},
]
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: AppActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state
    }
}
export type TodolistsActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

/////////////////   actionsCreators
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST' as const,
    todolist
})
export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST' as const,
    id
})
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE' as const,
    id,
    title
})
export const changeTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER' as const,
    id,
    filter
})
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS' as const, todolists
})

/////////////////   thunksCreators
export const getTodolistsTC = () => (dispatch: Dispatch<TodolistsActionsType>) =>
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistsActionsType>) =>
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