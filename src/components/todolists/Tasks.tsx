import React from 'react';
import {styled} from 'styled-components';
import {TaskType} from '../../api/todolist-api';
import {Task} from './Task';

type TasksPropsType = {
    tasks: TaskType[]
}

export const Tasks = (props: TasksPropsType) => {
    return (
        <StyledTasks>
            {props.tasks.map((el) => <Task key={el.id} task={el}/>)}
        </StyledTasks>
    );
};

const StyledTasks = styled.div``