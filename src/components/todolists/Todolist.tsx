import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../state/store';
import {addTaskTC, getTasksTC, removeTaskTC, TaskType, updateTaskTC,} from '../../reducers/tasks-reducer';
import {Tasks} from './Tasks';
import {AddItem} from '../add-item/AddItem';
import {EditableSpan} from '../editable-span/EditableSpan';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {FilterType, removeTodolistTC, updateTodolistTitleTC} from '../../reducers/todolists-reducer';
import s from './Todolist.module.scss'
import {TaskStatuses} from '../../api/todolist-api';

export type TodolistPropsType = {
    id: string
    title: string
    filter: FilterType
};

export const Todolist = (props: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [])

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

    const [filter, setFilter] = useState<FilterType>(props.filter)

    const deleteTodolist = () => dispatch(removeTodolistTC(props.id))
    const deleteTask = (taskId: string) => dispatch(removeTaskTC(props.id, taskId))

    const updateTodolistTitle = (title: string) => dispatch(updateTodolistTitleTC(props.id, title))

    const addTask = (title: string) => dispatch(addTaskTC(props.id, title))
    const updateTaskTitle = (taskId: string, title: string) =>
        dispatch(updateTaskTC(props.id, taskId, {title}))
    const changeTaskStatus = (taskId: string, status: TaskStatuses) =>
        dispatch(updateTaskTC(props.id, taskId, {status}))
    const filterTasks = () => {
        return filter === 'active'
            ? tasks.filter((t) => !t.status)
            : filter === 'completed'
                ? tasks.filter((t) => t.status)
                : tasks;
    };
    const filteredTasks = filterTasks();

    return (
        <div className={s.todolist}>
            <h3>
                <EditableSpan updateItemTitle={updateTodolistTitle} title={props.title}/>
                <button onClick={deleteTodolist}>Del</button>
            </h3>
            <AddItem callBack={addTask}/>
            <Tasks tasks={filteredTasks} removeTask={deleteTask}
                   updateTaskTitle={updateTaskTitle} changeTaskStatus={changeTaskStatus}/>
            <FilterButtons setFilter={setFilter} filter={filter}/>
        </div>
    );
};

