import React, {ChangeEvent} from 'react';
import {styled} from 'styled-components';
import {EditableSpan} from '../editable-span/EditableSpan';
import {removeTaskTC, TaskDomainType, updateTaskTC} from '../../reducers/tasks-reducer';
import {useAppDispatch} from '../../state/store';
import s from './Todolist.module.scss';

type TaskPropsType = {
    task: TaskDomainType
}

export const Task: React.FC<TaskPropsType> = ({task}) => {
    const dispatch = useAppDispatch()
    const deleteTask = () => dispatch(removeTaskTC(task.todoListId, task.id))
    const updateTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 2 : 0
        dispatch(updateTaskTC(task.todoListId, task.id, {status}))
    }
    const updateTaskTitle = (title: string) => dispatch(updateTaskTC(task.todoListId, task.id, {title}))
    const taskClassName = s.task + (task.status ? ' ' + s.isDone : '') + (task.entityStatus === 'loading' ? ' ' + s.disabled : '')
    // const taskClassName = s.task

    return (
        <StyledTask className={taskClassName}>
            <div>
                <input type={'checkbox'} checked={!!task.status} onChange={updateTaskStatus}/>
                <EditableSpan updateItemTitle={updateTaskTitle} title={task.title}/>
            </div>
            <button onClick={deleteTask}>Del</button>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  &.isDone {
    opacity: 0.5;
  }
`