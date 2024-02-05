import React from 'react';
import {styled} from 'styled-components';
import {Task} from './Task';
import {TaskDomainType} from 'reducers/tasksSlice';

type TasksPropsType = {
    tasks: TaskDomainType[]
}

export const Tasks = (props: TasksPropsType) => {
    return (
        <StyledTasks>
            {props.tasks.map((el) => <Task key={el.id} task={el}/>)}
        </StyledTasks>
    );
};

const StyledTasks = styled.div``