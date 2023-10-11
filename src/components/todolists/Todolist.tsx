import React from "react";

// type TodolistsPropsType = {
//     todolitsData: TodolistType[]
// }

export type TodolistType = {
    title: string
    tasks: TodolistTaskType[]
}

type TodolistTaskType =
    {
        taskId: number
        title: string
        isDone: boolean
    }

export const Todolist = (props: TodolistType) => {

    const tasks = props.tasks.map((el) => {
        return (
            <li key={el.taskId}>
                <input type={"checkbox"} checked={el.isDone}/>
                <span>{el.title}</span>
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