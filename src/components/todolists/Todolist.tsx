import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../state/store';
import {addTaskTC, getTasksTC, removeTaskTC, updateTaskTC,} from '../../reducers/tasks-reducer';
import {Tasks} from './Tasks';
import {AddItem} from '../add-item/AddItem';
import {EditableSpan} from '../editable-span/EditableSpan';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {
    FilterType,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from '../../reducers/todolists-reducer';
import s from './Todolist.module.scss'
import {TaskStatuses, TaskType} from '../../api/todolist-api';

export type TodolistPropsType = {
    todolist: TodolistDomainType
};

export const Todolist = (props: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.todolist.id))
    }, [])

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolist.id])

    const [filter, setFilter] = useState<FilterType>(props.todolist.filter)

    const deleteTodolist = () => dispatch(removeTodolistTC(props.todolist.id))
    const deleteTask = (taskId: string) => dispatch(removeTaskTC(props.todolist.id, taskId))

    const updateTodolistTitle = (title: string) => dispatch(updateTodolistTitleTC(props.todolist.id, title))

    const addTask = (title: string) => dispatch(addTaskTC(props.todolist.id, title))
    const updateTaskTitle = (taskId: string, title: string) =>
        dispatch(updateTaskTC(props.todolist.id, taskId, {title}))
    const changeTaskStatus = (taskId: string, status: TaskStatuses) =>
        dispatch(updateTaskTC(props.todolist.id, taskId, {status}))
    const filterTasks = () => {
        return filter === 'active'
            ? tasks.filter((t) => !t.status)
            : filter === 'completed'
                ? tasks.filter((t) => t.status)
                : tasks;
    };
    const filteredTasks = filterTasks();
    const todolistClassName = s.todolist + (props.todolist.entityStatus === 'loading' ? ' ' + s.disabled : '')

    return (
        <div className={todolistClassName}>
            <h3>
                <EditableSpan updateItemTitle={updateTodolistTitle} title={props.todolist.title}/>
                <button onClick={deleteTodolist}>Del</button>
            </h3>
            <AddItem callBack={addTask}/>
            <Tasks tasks={filteredTasks} removeTask={deleteTask}
                   updateTaskTitle={updateTaskTitle} changeTaskStatus={changeTaskStatus}/>
            <FilterButtons setFilter={setFilter} filter={filter}/>
        </div>
    );
};

