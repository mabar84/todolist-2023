import {TasksType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: 'Read', isDone: true},
        {id: v1(), title: 'Sleep', isDone: false},
        {id: v1(), title: 'Eat', isDone: false},
        {id: v1(), title: 'Code', isDone: true},
        {id: v1(), title: 'Toilet', isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ],
}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todolistId]:
                    [{id: v1(), title: action.payload.title, isDone: false},
                        ...state[action.payload.todolistId]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'UPDATE-TASK-TITLE': {
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title} : t)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, isDone: action.payload.isDone} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

type TasksActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>

export const addTaskAC = (todolistId: string, title: string) =>
    ({type: 'ADD-TASK', payload: {todolistId, title}} as const)

export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const)

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) =>
    ({type: 'UPDATE-TASK-TITLE', payload: {todolistId, taskId, title}} as const)

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) =>
    ({type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const)
