import { todolistAPI, TodolistType } from "features/TodolistsList/api/todolists.api";
import React, { useEffect, useState } from "react";
import { tasksAPI } from "features/TodolistsList/api/tasks.api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<TodolistType[]>([]);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => setState(res.data));
  }, []);
  return (
    <>
      {state.map((tl) => (
        <div key={tl.id}>
          id: <span>{tl.id}</span> | title: <span>{tl.title}</span>
        </div>
      ))}
      {/*{JSON.stringify(state)}*/}
    </>
  );
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const title = "YOYOYOYOOYO";
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data);
    });
  }, []);
  return (
    <>
      id: <span>{state && state.data.item.id}</span> | title: <span>{state && state.data.item.title}</span>
    </>
  );
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>();
  useEffect(() => {
    const id = "99ad12a3-8508-40b6-be2e-cb6bceaafcf0";
    todolistAPI.deleteTodolist(id).then((res) => {
      setState(res.data);
    });
  }, []);
  return <>{JSON.stringify(state)}</>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>([]);
  useEffect(() => {
    const id = "a573d754-17f2-4462-9e15-48a5b4a79cc5";
    const title = "1234567890";
    todolistAPI.updateTodolist(id, title).then((res) => setState(res.data));
  }, []);
  return <>{JSON.stringify(state)}</>;
};
export const GetTasks = () => {
  const [state, setState] = useState<TodolistType[]>([]);
  useEffect(() => {
    const id = "4eba99d5-b0c7-4531-ab60-e02daebbaac0";
    tasksAPI.getTasks(id).then((res) => setState(res.data));
  }, []);
  return <>{JSON.stringify(state)}</>;
};
export const CreateTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const id = "a573d754-17f2-4462-9e15-48a5b4a79cc5";
    const title = "bread";
    tasksAPI.createTask(id, title).then((res) => setState(res.data));
  }, []);
  return <>{JSON.stringify(state)}</>;
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "a573d754-17f2-4462-9e15-48a5b4a79cc5";
    const taskId = "93d6e4a6-fe80-4266-87f6-80c19cc0e57d";
    tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
  }, []);
  return <>{JSON.stringify(state)}</>;
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "a573d754-17f2-4462-9e15-48a5b4a79cc5";
    const taskId = "08e3e32e-7102-401f-b0dc-79619c7dc1ee";
    const title = "BLABLABLA";
    const model = {
      title: title,
      deadline: "",
      description: "",
      status: 0,
      priority: 0,
      startDate: "",
    };
    tasksAPI.updateTask(todolistId, taskId, model).then((res) => setState(res.data));
  }, []);
  return <>{JSON.stringify(state)}</>;
};
