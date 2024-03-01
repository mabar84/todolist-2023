///////////////   api
import { instance } from "common/api/instance";
import { ResultCodeType } from "features/TodolistsList/model/tasks/tasksSlice";

export const todolistAPI = {
  getTodolists: () => instance.get<TodolistType[]>("todo-lists"),
  createTodolist: (title: string) => instance.post<BaseResponseType<{ item: TodolistType }>>(`todo-lists`, { title }),
  deleteTodolist: (id: string) => instance.delete<BaseResponseType>(`todo-lists/${id}`),
  updateTodolist: (id: string, title: string) => instance.put<BaseResponseType>(`todo-lists/${id}`, { title }),
};

///////////////   types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};
export type BaseResponseType<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: string[];
  resultCode: ResultCodeType;
};
export type UpdateAPITaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type TasksType = {
  [key: string]: TaskType[];
};
export type TaskType = {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  addedDate: string;
};

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
