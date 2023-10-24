import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {Tasks} from './Tasks';

export type TodolistPropsType = {
    title: string
    tasks: TodolistTaskType[]
    deleteTask: (taskId: string) => void
    addTask: (newTaskTitle: string) => void
    setFilter: (filterValue: FilterType) => void
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

    const [taskTitle, setTaskTitle] = useState<string>('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text" value={taskTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
            />
            <button onClick={addTask}>+</button>
            <Tasks tasks={props.tasks} removeTask={props.deleteTask}/>
            <FilterButtons setFilter={props.setFilter}/>
        </div>
    );
};
