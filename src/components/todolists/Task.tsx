import React, {ChangeEvent} from 'react';
import {styled} from 'styled-components';
import {EditableSpan} from '../editable-span/EditableSpan';
import {TaskType} from '../../api/todolist-api';
import {removeTaskTC, updateTaskTC} from '../../reducers/tasks-reducer';
import {useAppDispatch} from '../../state/store';

type TaskPropsType = {
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = ({task}) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => dispatch(removeTaskTC(task.todoListId, task.id))
    const updateTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 2 : 0
        dispatch(updateTaskTC(task.todoListId, task.id, {status}))
    }
    const updateTaskTitle = (title: string) => dispatch(updateTaskTC(task.todoListId, task.id, {title}))

    return (
        <StyledTask className={task.status ? 'isDone' : ''}>
            <input type={'checkbox'} checked={!!task.status} onChange={updateTaskStatus}/>
            <EditableSpan updateItemTitle={updateTaskTitle} title={task.title}/>
            <button onClick={deleteTask}>Del</button>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  &.isDone {
    opacity: 0.5;
  }
`