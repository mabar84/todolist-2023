import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0088ae57-e9fa-4964-b79a-099d88c982c5'
    }
})

///////////////   api
export const todolistAPI = {
    getTodolists: () => instance.get<TodolistType[]>('todo-lists'),
    createTodolist: (title: string) =>
        instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title}),
    deleteTodolist: (id: string) => instance.delete<ResponseType>(`todo-lists/${id}`),
    updateTodolist: (id: string, title: string) =>
        instance.put<ResponseType>(`todo-lists/${id}`, {title}),
    getTasks: (id: string) => instance.get(`todo-lists/${id}/tasks`),
    createTask: (id: string, title: string) =>
        instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${id}/tasks`, {title}),
    deleteTask: (todolistId: string, taskId: string) =>
        instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`),
    updateTask: (todolistId: string, taskId: string, model: UpdateAPITaskModelType) =>
        instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model),
}

///////////////   types
export type ResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}
export type UpdateAPITaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
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
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}