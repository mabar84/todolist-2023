import React from 'react';
import {styled} from 'styled-components';
import {Task} from './Task';
import {TaskType} from '../../App';

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    updateTaskTitle: (taskId: string, title: string) => void
}

export const Tasks = (props: TasksPropsType) => {
    return (
        <StyledTasks>
            {props.tasks.map((el) =>
                <Task updateTaskTitle={props.updateTaskTitle} key={el.id} changeTaskStatus={props.changeTaskStatus}
                      task={el}
                      removeTask={props.removeTask}/>
            )}
        </StyledTasks>
    );
};

const StyledTasks = styled.div``