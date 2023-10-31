import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {Tasks} from './Tasks';
import {styled} from 'styled-components';

export type TodolistPropsType = {
    title: string
    tasks: TodolistTaskType[]
    deleteTask: (taskId: string) => void
    addTask: (newTaskTitle: string) => void
    setFilter: (filterValue: FilterType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: string
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
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (taskTitle.trim() !== '') {
            console.log(342)
            props.addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('This field is required')
        }


    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)

        setTaskTitle(e.currentTarget.value)
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return (
        <StyledTodolist>
            <h3>{props.title}</h3>
            <input className={error ? 'error' : ''} type="text" value={taskTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
            />
            <button onClick={addTask}>+</button>
            <p> {error} </p>
            <Tasks changeTaskStatus={props.changeTaskStatus} tasks={props.tasks} removeTask={props.deleteTask}/>
            <FilterButtons setFilter={props.setFilter} filter={props.filter}/>
        </StyledTodolist>
    );
};

const StyledTodolist = styled.div`
  input.error {
    outline: 1px solid red;
    border: 1px solid red;
  }

  p {
    min-height: 22px;
    margin: 0;
    color: red;
  }

`