import React from 'react';
import {Todolist, TodolistPropsType} from './Todolist';
import {todolistDataType} from '../../App';

export type todolistsType = {
    filteredtodolistsData: Array<todolistDataType>
    deleteTask: (tdlId: number, taskId: number) => void
}

export const Todolists = (props: todolistsType) => {

    const propsTodolistData = props.filteredtodolistsData

    const todolists = propsTodolistData.map((el, ind) => {
        return (
            <Todolist todolistId={el.todolistId} deleteTask={props.deleteTask} key={ind} title={el.title}
                      tasks={el.tasks}/>
        )
    })
    return (
        <>
            {todolists}
        </>
    );
};

