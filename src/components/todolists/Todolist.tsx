import React from 'react';

export type TodolistPropsType = {
    todolistId: number
    title: string
    tasks: TodolistTaskType[]
    deleteTask: (tdlId: number, taskId: number) => void
}

export type TodolistTaskType =
    {
        taskId: number
        title: string
        isDone: boolean
    }

export const Todolist = (props: any) => {
    const propsTasks: TodolistTaskType[] = props.tasks

    const tasks = propsTasks.map((el) => {

        const onClickHandler = () => {
            props.deleteTask(props.todolistId, el.taskId)
        }

        return (
            <li key={el.taskId}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={onClickHandler}>Del</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>+</button>
            {tasks}
        </div>
    )
}