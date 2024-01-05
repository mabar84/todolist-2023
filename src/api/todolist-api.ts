import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0088ae57-e9fa-4964-b79a-099d88c982c5'
    }
})
export const todolistAPI = {
    getTodolist: () => instance.get<TodolistType[]>('todo-lists'),
    createTodolist: (title: string) =>
        instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title}),
    deleteTodolist: (id: string) => instance.delete<ResponseType>(`todo-lists/${id}`),
    updateTodolist: (id: string, title: string) =>
        instance.put<ResponseType>(`todo-lists/${id}`, {title}),
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

