import React from 'react';
import {styled} from 'styled-components';
import {TodolistTaskType} from './Todolist';

type TasksPropsType = {
    tasks: TodolistTaskType[]
    deleteTask: (taskId: string) => void;
}

export const Tasks = (props: TasksPropsType) => {
    const tasks = props.tasks.map((el) => {
        const removeTask = () => {
            props.deleteTask(el.taskId);
        };
        return (
            <li key={el.taskId}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={removeTask}>Del</button>
            </li>
        );
    });
    return (
        <StyledTasks>
            {tasks}
        </StyledTasks>
    );
};

const StyledTasks = styled.div``