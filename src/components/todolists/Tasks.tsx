import React from 'react';
import {styled} from 'styled-components';
import {Task} from './Task';
import {TaskType} from '../../App';

type TasksPropsType = {
    tasks: TaskType[]
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