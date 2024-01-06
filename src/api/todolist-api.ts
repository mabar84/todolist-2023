import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0088ae57-e9fa-4964-b79a-099d88c982c5'
    }
})
export const todolistAPI = {
    getTodolists: () => instance.get<TodolistType[]>('todo-lists'),
    createTodolist: (title: string) =>
        instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title}),
    deleteTodolist: (id: string) => instance.delete<ResponseType>(`todo-lists/${id}`),
    updateTodolist: (id: string, title: string) =>
        instance.put<ResponseType>(`todo-lists/${id}`, {title}),

    getTasks: (id: string) => instance.get(`todo-lists/${id}/tasks`),
    createTask: (id: string, title: string) =>
        instance.post<ResponseType>(`todo-lists/${id}/tasks`, {title}),
    deleteTask: (todolistId: string, taskId: string) =>
        instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`),
    updateTask: (todolistId: string, taskId: string, title: string) =>
        instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title}),
}
export type TodolistType = {
    id: string;
    title: string;
    addedDate: Date;
    order: number;
}
export type ResponseType<T = {}> = {
    data: T
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}


/////////////////////
type ResponseTaskType = {
    id: string;
    title: string;
    todoListId: string;
    order: number;
    status: number;
    priority: number;
    addedDate: string;
}