import React from 'react';
import {styled} from 'styled-components';
import {TodolistTaskType} from './Todolist';
import {Task} from './Task';

type TasksPropsType = {
    tasks: TodolistTaskType[]
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Tasks = (props: TasksPropsType) => {
    return (
        <StyledTasks>
            {props.tasks.map((el) =>
                <Task key={el.taskId} changeTaskStatus={props.changeTaskStatus} task={el}
                      removeTask={props.removeTask}/>
            )}
        </StyledTasks>
    );
};

const StyledTasks = styled.div``