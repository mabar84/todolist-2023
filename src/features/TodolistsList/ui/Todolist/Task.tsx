import React, { ChangeEvent } from "react";
import s from "features/TodolistsList/ui/Todolist/Todolist.module.scss";
import { useDispatch } from "react-redux";
import { EditableSpan } from "components/editable-span/EditableSpan";
import { TaskDomainType, tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice";

type Props = {
  task: TaskDomainType;
};
export const Task = ({ task }: Props) => {
  const dispatch = useDispatch();
  const deleteTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ todolistId: task.todoListId, taksId: task.id }));
  };
  const updateTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? 2 : 0;
    dispatch(tasksThunks.updateTask({ todolistId: task.todoListId, taskId: task.id, domainModel: { status } }));
  };
  const updateTitleHandler = (title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId: task.todoListId, taskId: task.id, domainModel: { title } }));
  };
  const taskClassName =
    s.task + (task.status ? " " + s.isDone : "") + (task.entityStatus === "loading" ? " " + s.disabled : "");

  return (
    <li key={task.id} className={taskClassName}>
      <div>
        <input type={"checkbox"} checked={!!task.status} onChange={updateTaskStatusHandler} />
        <EditableSpan updateItemTitle={updateTitleHandler} title={task.title} />
      </div>
      <button onClick={deleteTaskHandler}>Del</button>
    </li>
  );
};
