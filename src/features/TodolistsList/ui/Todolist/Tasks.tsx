import React from "react";
import { TaskDomainType } from "features/TodolistsList/model/tasks/tasksSlice";
import { Task } from "features/TodolistsList/ui/Todolist/Task";

type TasksPropsType = {
  tasks: TaskDomainType[];
};

export const Tasks = (props: TasksPropsType) => {
  return (
    <div>
      {props.tasks.map((el) => (
        <Task key={el.id} task={el} />
      ))}
    </div>
  );
};
