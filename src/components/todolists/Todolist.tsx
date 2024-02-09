import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './Todolist.module.scss'
import {AppRootStateType} from "state/store";
import {FilterType, removeTodolistTC, TodolistDomainType, updateTodolistTitleTC} from "reducers/todolistsSlice";
import {addTaskTC, TaskDomainType, tasksThunks} from "reducers/tasksSlice";
import {EditableSpan} from "components/editable-span/EditableSpan";
import {AddItem} from "components/add-item/AddItem";
import {Tasks} from "components/todolists/Tasks";
import {FilterButtons} from "components/filter-buttons/FilterButtons";

export type TodolistPropsType = {
    todolist: TodolistDomainType
};

export const Todolist = (props: TodolistPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskDomainType[]>(state => state.tasks[props.todolist.id])

    useEffect(() => {
        dispatch(tasksThunks.getTasks(props.todolist.id))
    }, [])


    const [filter, setFilter] = useState<FilterType>(props.todolist.filter)

    const deleteTodolist = () => dispatch(removeTodolistTC(props.todolist.id))
    const updateTodolistTitle = (title: string) => dispatch(updateTodolistTitleTC(props.todolist.id, title))
    const addTask = (title: string) => dispatch(addTaskTC(props.todolist.id, title))
    const todolistClassName = s.todolist + (props.todolist.entityStatus === 'loading' ? ' ' + s.disabled : '')

    const filterTasks = () => {
        return filter === 'active'
            ? tasks.filter((t) => !t.status)
            : filter === 'completed'
                ? tasks.filter((t) => t.status)
                : tasks;
    };
    const filteredTasks = filterTasks();

    return (
        <div className={todolistClassName}>
            <h3>
                <EditableSpan updateItemTitle={updateTodolistTitle} title={props.todolist.title}/>
                <button onClick={deleteTodolist}>Del</button>
            </h3>
            <AddItem callBack={addTask}/>
            <Tasks tasks={filteredTasks}/>
            <FilterButtons setFilter={setFilter} filter={filter}/>
        </div>
    );
};

