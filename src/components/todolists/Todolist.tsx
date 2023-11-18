import React, {useState} from 'react';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {Tasks} from './Tasks';
import {TaskType} from '../../App';
import {AddItem} from '../add-item/AddItem';

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTodolist: (todolistId: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: string
};

export type todolistDataType = {
    title: string
    tasks: TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed';

export const Todolist = (props: TodolistPropsType) => {
    const [filter, setFilter] = useState<FilterType>('all')

    const deleteTodolist = () => props.removeTodolist(props.id)
    const addTask = (title: string) => props.addTask(props.id, title)
    const deleteTask = (taskId: string) => props.deleteTask(props.id, taskId)
    const changeTaskStatus = (taskId: string, isDone: boolean) => props.changeTaskStatus(props.id, taskId, isDone)

    const filterTasks = () => {
        return filter === 'active'
            ? props.tasks.filter((t) => !t.isDone)
            : filter === 'completed'
                ? props.tasks.filter((t) => t.isDone)
                : props.tasks;
    };
    let filteredTasks = filterTasks();

    return (
        <div>
            <h3>{props.title}
                <button onClick={deleteTodolist}>Del</button>
            </h3>

            <AddItem callBack={addTask}/>

            <Tasks changeTaskStatus={changeTaskStatus} tasks={filteredTasks} removeTask={deleteTask}/>
            <FilterButtons setFilter={setFilter} filter={props.filter}/>
        </div>
    );
};

