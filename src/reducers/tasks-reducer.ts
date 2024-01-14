import {v1} from 'uuid';
import {todolistAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppActionsType} from '../state/store';

export type TasksType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: TasksType = {
    // [todolistId1]: [
    //     {id: v1(), title: 'Read', status: 2},
    //     {id: v1(), title: 'Sleep', status: 0},
    //     {id: v1(), title: 'Eat', status: 0},
    //     {id: v1(), title: 'Code', status: 2},
    //     {id: v1(), title: 'Toilet', status: 0},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: 'HTML', status: 2},
    //     {id: v1(), title: 'CSS', status: 2},
    //     {id: v1(), title: 'React', status: 0},
    // ],
}

export const tasksReducer = (state: TasksType = initialState, action: AppActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]:
                    [action.payload.task,
                        ...state[action.payload.task.todoListId]]
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
                        ? {...t, status: action.payload.status} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
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
export type TasksActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTasksAC>

/////////////////   actionsCreators
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK' as const, payload: {task}})
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK' as const, payload: {todolistId, taskId}})
export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) =>
    ({type: 'UPDATE-TASK-TITLE' as const, payload: {todolistId, taskId, title}})
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    ({type: 'CHANGE-TASK-STATUS' as const, payload: {todolistId, taskId, status}})
const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS' as const, payload: {todolistId, tasks}})
/////////////////   thunksCreators
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) =>
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) =>
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
export const addTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) =>
    todolistAPI.createTask(todolistId, taskId)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })