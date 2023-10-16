import React from 'react';
import {Todolist, TodolistType} from "./Todolist";

export type todolistsType = {
    todolistsData: TodolistType[]
}


export const Todolists = (props: todolistsType) => {

    const todolists = props.todolistsData.map((el, ind) => {
        return (
            <Todolist key={ind} title={el.title} tasks={el.tasks}/>
        )
    })

    return (
        <>
            {todolists}
        </>
    );
};

