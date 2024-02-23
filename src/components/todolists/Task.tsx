import React, { ChangeEvent } from "react";
import { styled } from "styled-components";
import s from "./Todolist.module.scss";
import { useDispatch } from "react-redux";
import { TaskDomainType, tasksThunks } from "reducers/tasksSlice";
import { EditableSpan } from "components/editable-span/EditableSpan";

type TaskPropsType = {
  task: TaskDomainType;
};

export const Task: React.FC<TaskPropsType> = ({ task }) => {
  const dispatch = useDispatch();
  const deleteTask = () => dispatch(tasksThunks.removeTask({ todolistId: task.todoListId, taksId: task.id }));
  const updateTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? 2 : 0;
    dispatch(tasksThunks.updateTask({ todolistId: task.todoListId, taskId: task.id, domainModel: { status } }));
  };
  const updateTaskTitle = (title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId: task.todoListId, taskId: task.id, domainModel: { title } }));

    // dispatch(updateTaskTC(task.todoListId, task.id, { title }));
  };

  const taskClassName =
    s.task + (task.status ? " " + s.isDone : "") + (task.entityStatus === "loading" ? " " + s.disabled : "");

  return (
    <StyledTask className={taskClassName}>
      <div>
        <input type={"checkbox"} checked={!!task.status} onChange={updateTaskStatus} />
        <EditableSpan updateItemTitle={updateTaskTitle} title={task.title} />
      </div>
      <button onClick={deleteTask}>Del</button>
    </StyledTask>
  );
};

const StyledTask = styled.li`
  &.isDone {
    opacity: 0.5;
  }
`;
