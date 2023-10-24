import React from 'react';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {Tasks} from './Tasks';

export type TodolistPropsType = {
    title: string
    tasks: TodolistTaskType[]
    deleteTask: (taskId: string) => void
    setFilter: (f: FilterType) => void
};

export type todolistDataType = {
    title: string
    tasks: TodolistTaskType[]
}
export type TodolistTaskType = {
    taskId: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed';

export const Todolist = (props: TodolistPropsType) => {
    const addTask = () => {

    }
    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>+</button>
            <Tasks tasks={props.tasks} deleteTask={props.deleteTask}/>
            <FilterButtons setFilter={props.setFilter}/>
        </div>
    );
};
