import React, {useState} from 'react';
import {
    FilterType,
    Todolist,
    todolistDataType,
    TodolistTaskType,
} from './components/todolists/Todolist';

const todolistData: todolistDataType = {
    title: 'What to do',
    tasks: [
        {taskId: 1, title: 'Read', isDone: true},
        {taskId: 2, title: 'Sleep', isDone: false},
        {taskId: 3, title: 'Eat', isDone: false},
        {taskId: 4, title: 'Code', isDone: true},
        {taskId: 5, title: 'Toilet', isDone: false},
    ],
};

export const App = () => {
    const [tasks, setTasks] = useState<Array<TodolistTaskType>>(
        todolistData.tasks,
    );
    const [filter, setFilter] = useState<FilterType>('all');

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((t) => t.taskId !== id));
    };

    const filterTasks = () => {
        return filter === 'active'
            ? tasks.filter((t) => !t.isDone)
            : filter === 'completed'
                ? tasks.filter((t) => t.isDone)
                : tasks;
    };

    let filteredTasks = filterTasks();

    return (
        <div
            className="App"
            style={{display: 'flex', gap: '20px', padding: '10px'}}
        >
            <Todolist
                tasks={filteredTasks}
                title={todolistData['title']}
                deleteTask={deleteTask}
                setFilter={setFilter}
            />
        </div>
    );
};
