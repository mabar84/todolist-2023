import React from 'react';
import {styled} from 'styled-components';
import {Task} from './Task';
import {TaskType} from '../../reducers/tasks-reducer';
import {TaskStatuses} from '../../api/todolist-api';

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
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