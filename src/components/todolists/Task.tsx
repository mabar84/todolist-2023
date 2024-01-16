import React, {ChangeEvent} from 'react';
import {styled} from 'styled-components';
import {EditableSpan} from '../editable-span/EditableSpan';
import {TaskStatuses, TaskType} from '../../api/todolist-api';

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    updateTaskTitle: (taskId: string, title: string) => void
}

export const Task = (props: TaskPropsType) => {
    const onClickButtonHandler = () => {
        props.removeTask(props.task.id)
    }
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? 2 : 0)
    }
    const updateTaskTitle = (title: string) => {
        props.updateTaskTitle(props.task.id, title)
    }

    return (
        <StyledTask className={props.task.status ? 'isDone' : ''}>
            <input type={'checkbox'} checked={!!props.task.status} onChange={onChangeCheckboxHandler}/>
            <EditableSpan updateItemTitle={updateTaskTitle} title={props.task.title}/>
            <button onClick={onClickButtonHandler}>Del</button>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  &.isDone {
    opacity: 0.5;

  }
`