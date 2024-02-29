import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Todolist.module.scss";
import { AppRootStateType } from "state/store";
import {
  FilterType,
  TodolistDomainType,
  todolistsThunks,
} from "components/TodolistsList/model/todolists/todolistsSlice";
import { TaskDomainType, tasksThunks } from "components/TodolistsList/model/tasks/tasksSlice";
import { EditableSpan } from "components/editable-span/EditableSpan";
import { AddItem } from "components/add-item/AddItem";
import { Tasks } from "components/TodolistsList/Tasks";
import { FilterButtons } from "components/filter-buttons/FilterButtons";

export type Props = {
  todolist: TodolistDomainType;
};
export const Todolist = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TaskDomainType[]>((state) => state.tasks[id]);

  useEffect(() => {
    dispatch(tasksThunks.getTasks(id));
  }, []);

  const [filter, setFilter] = useState<FilterType>(todolist.filter);
  const deleteTodolist = () => {
    // dispatch(removeTodolistTC(id));
    dispatch(todolistsThunks.removeTodolist(id));
  };
  const updateTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.updateTodolistTitle({ id, title }));
  };
  const addTask = (title: string) => {
    dispatch(tasksThunks.addTask({ todolistId: id, title }));
  };
  const todolistClassName = s.todolist + (entityStatus === "loading" ? " " + s.disabled : "");
  const filterTasks = () => {
    return filter === "active"
      ? tasks.filter((t) => !t.status)
      : filter === "completed"
        ? tasks.filter((t) => t.status)
        : tasks;
  };
  const filteredTasks = filterTasks();

  return (
    <div className={todolistClassName}>
      <h3>
        <EditableSpan updateItemTitle={updateTodolistTitle} title={title} />
        <button onClick={deleteTodolist}>Del</button>
      </h3>
      <AddItem callBack={addTask} />
      <Tasks tasks={filteredTasks} />
      <FilterButtons setFilter={setFilter} filter={filter} />
    </div>
  );
};
