import React, {ChangeEvent} from 'react';
import {styled} from 'styled-components';
import {TodolistTaskType} from './Todolist';

type TaskPropsType = {
    task: TodolistTaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Task = (props: TaskPropsType) => {
    const onClickButtonHandler = () => {
        props.removeTask(props.task.taskId)
    }
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.taskId, e.currentTarget.checked)
    }
    return (
        <StyledTask className={props.task.isDone ? 'completed' : ''}>
            <input type={'checkbox'} checked={props.task.isDone} onChange={onChangeCheckboxHandler}/>
            <span>{props.task.title}</span>
            <button onClick={onClickButtonHandler}>Del</button>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  &.completed {
    opacity: 0.5;

  }
`