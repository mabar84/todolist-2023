import React from 'react';
import {FilterButtons} from '../filter-buttons/FilterButtons';

export type TodolistPropsType = {
    title: string;
    tasks: TodolistTaskType[];
    deleteTask: (taskId: string) => void;
    setFilter: (f: FilterType) => void;
};

export type todolistDataType = {
    title: string;
    tasks: TodolistTaskType[];
};

export type TodolistTaskType = {
    taskId: string;
    title: string;
    isDone: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';

export const Todolist = (props: TodolistPropsType) => {

    const tasks = props.tasks.map((el) => {
        const removeTask = () => {
            props.deleteTask(el.taskId);
        };

        return (
            <li key={el.taskId}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={removeTask}>Del</button>
            </li>
        );
    });

    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>+</button>
            {tasks}

            <FilterButtons setFilter={props.setFilter}/>
        </div>
    );
};
