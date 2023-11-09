import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {Tasks} from './Tasks';
import {styled} from 'styled-components';
import {TaskType} from '../../App';

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
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterType>('all')

    const addTask = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(props.id, taskTitle.trim())
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
    const deleteTodolist = () => {
        props.removeTodolist(props.id)
    }

    const deleteTask = (taskId: string) => {
        props.deleteTask(props.id, taskId)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.id, taskId, isDone)
    }

    const filterTasks = () => {
        return filter === 'active'
            ? props.tasks.filter((t) => !t.isDone)
            : filter === 'completed'
                ? props.tasks.filter((t) => t.isDone)
                : props.tasks;

    };
    let filteredTasks = filterTasks();

    console.log(filter)

    return (
        <StyledTodolist>
            <h3>{props.title}
                <button onClick={deleteTodolist}>Del</button>
            </h3>
            <input className={error ? 'error' : ''} type="text" value={taskTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
            />
            <button onClick={addTask}>+</button>
            <p> {error} </p>
            <Tasks changeTaskStatus={changeTaskStatus} tasks={filteredTasks} removeTask={deleteTask}/>
            <FilterButtons setFilter={setFilter} filter={props.filter}/>
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