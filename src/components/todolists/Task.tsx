import React, {ChangeEvent} from 'react';
import {styled} from 'styled-components';
import {TaskType} from '../../App';
import {EditableSpan} from '../editable-span/EditableSpan';

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    updateTaskTitle: (taskId: string, title: string) => void
}

export const Task = (props: TaskPropsType) => {
    const onClickButtonHandler = () => {
        props.removeTask(props.task.taskId)
    }
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.taskId, e.currentTarget.checked)
    }
    const updateTaskTitle = (title: string) => {
        props.updateTaskTitle(props.task.taskId, title)
    }

    return (
        <StyledTask className={props.task.isDone ? 'completed' : ''}>
            <input type={'checkbox'} checked={props.task.isDone} onChange={onChangeCheckboxHandler}/>
            <EditableSpan updateItemTitle={updateTaskTitle} title={props.task.title}/>
            <button onClick={onClickButtonHandler}>Del</button>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  &.completed {
    opacity: 0.5;

  }
`