import React, {useState} from 'react';
import {Todolists} from './components/todolists/Todolists';
import {TodolistPropsType, TodolistTaskType} from './components/todolists/Todolist';

export type todolistDataType = {
    todolistId: number
    title: string
    tasks: Array<TodolistTaskType>
}

const todolistsData: Array<todolistDataType> = [
    {
        todolistId: 0,
        title: 'What to do',
        tasks: [
            {taskId: 1, title: 'Read', isDone: true},
            {taskId: 2, title: 'Sleep', isDone: false},
            {taskId: 3, title: 'Eat', isDone: false},
            {taskId: 4, title: 'Code', isDone: true},
            {taskId: 5, title: 'Toilet', isDone: false},
        ]
    },
    {
        todolistId: 1,
        title: 'What to learn',
        tasks: [
            {taskId: 1, title: 'HTML&CSS', isDone: true},
            {taskId: 2, title: 'JS', isDone: true},
            {taskId: 3, title: 'React', isDone: false}
        ]
    }
]


export const App = () => {

    const [filteredtodolistsData, setFilteredtodolistsData] = useState<Array<todolistDataType>>(todolistsData)


    const deleteTask = (todolistId: number, taskId: number) => {
        let arr = [...todolistsData]
        arr[todolistId].tasks = arr[todolistId].tasks.filter(t => t.taskId !== taskId)
        setFilteredtodolistsData(arr)


        //setFilteredtodolistsData([...todolistsData, todolistsData[todolistId].tasks.filter(t => t.taskId !== taskId)])
    }

    return (
        <div className="App" style={{display: 'flex', gap: '20px', padding: '10px'}}>
            <Todolists
                filteredtodolistsData={filteredtodolistsData}

                deleteTask={deleteTask}

            />
        </div>
    );
}

