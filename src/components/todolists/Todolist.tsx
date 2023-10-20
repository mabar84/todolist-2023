import React from 'react';

export type TodolistPropsType = {
    title: string
    tasks: TodolistTaskType[]
    deleteTask: (taskId: number) => void
    setFilter: (f: string) => void
}

export type todolistDataType = {
    title: string
    tasks: TodolistTaskType[]
}

export type TodolistTaskType =
    {
        taskId: number
        title: string
        isDone: boolean
    }

export type FilterType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistPropsType) => {
    const tasks = props.tasks.map((el) => {

        const removeTask = () => {
            props.deleteTask(el.taskId)
        }

        return (
            <li key={el.taskId}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={removeTask}>Del</button>
            </li>
        )
    })

    const filterTasks = (e: React.MouseEvent<HTMLElement>) => {
        props.setFilter(e.currentTarget.getAttribute('data-name') || 'All')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>+</button>
            {tasks}

            <button onClick={filterTasks} data-name={'All'}>ALL</button>
            <button onClick={filterTasks} data-name={'Active'}>ACTIVE</button>
            <button onClick={filterTasks} data-name={'Completed'}>COMPLETED</button>

        </div>
    )
}