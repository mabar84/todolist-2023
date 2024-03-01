import { instance } from "common/api/instance";
import { BaseResponseType, TaskType, UpdateAPITaskModelType } from "features/TodolistsList/api/todolists.api";

export const tasksAPI = {
  getTasks: (id: string) => instance.get(`todo-lists/${id}/tasks`),
  createTask: (id: string, title: string) =>
    instance.post<
      BaseResponseType<{
        item: TaskType;
      }>
    >(`todo-lists/${id}/tasks`, { title }),
  deleteTask: (todolistId: string, taskId: string) => instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`),
  updateTask: (todolistId: string, taskId: string, model: UpdateAPITaskModelType) =>
    instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model),
};
