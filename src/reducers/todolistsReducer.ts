import {TodolistType} from '../App';

export const todolistsReducer = (state: TodolistType[], action: TodolistsActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [{id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title} : tl)
        }
        default:
            return state
    }
}

type TodolistsActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof updateTodolistTitleAC>

export const addTodolistAC = (newTodolistId: string, title: string) => ({
    type: 'ADD-TODOLIST',
    payload: {
        newTodolistId,
        title
    }
} as const)

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId
    }
} as const)

export const updateTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'UPDATE-TODOLIST-TITLE',
    payload: {
        todolistId,
        title
    }
} as const)