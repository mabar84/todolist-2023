import React from 'react';
import {styled} from 'styled-components';
import {TodolistTaskType} from './Todolist';

type TaskPropsType = {
    task: TodolistTaskType
    removeTask: (taskId: string) => void
}

export const Task = (props: TaskPropsType) => {
    const onClickButtonHandler = () => {
        props.removeTask(props.task.taskId)
    }
    return (
        <StyledTask key={props.task.taskId}>
            <input type={'checkbox'} checked={props.task.isDone}/>
            <span>{props.task.title}</span>
            <button onClick={onClickButtonHandler}>Del</button>
        </StyledTask>
    );
};

const StyledTask = styled.li`
`