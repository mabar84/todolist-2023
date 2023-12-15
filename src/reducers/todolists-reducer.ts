import {TodolistType} from '../App';
import {v1} from 'uuid';
import {FilterType} from '../components/todolists/Todolist';
import {todolistId1, todolistId2} from './tasks-reducer';

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to do', filter: 'all'},
    {id: todolistId2, title: 'What to learn', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [...state, {id: action.id, title: action.title, filter: 'all'}]
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

type TodolistsActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST' as const,
    id: v1(),
    title
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