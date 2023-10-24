import React, {useState} from 'react';
import {
    FilterType,
    Todolist,
    todolistDataType,
    TodolistTaskType,
} from './components/todolists/Todolist';
import {v1} from 'uuid';

const todolistData: todolistDataType = {
    title: 'What to do',
    tasks: [
        {taskId: v1(), title: 'Read', isDone: true},
        {taskId: v1(), title: 'Sleep', isDone: false},
        {taskId: v1(), title: 'Eat', isDone: false},
        {taskId: v1(), title: 'Code', isDone: true},
        {taskId: v1(), title: 'Toilet', isDone: false},
    ],
};

export const App = () => {
    const [tasks, setTasks] = useState<Array<TodolistTaskType>>(
        todolistData.tasks,
    );
    const [filter, setFilter] = useState<FilterType>('all');

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((t) => t.taskId !== id));
    };
    const addTask = (newTaskTitle: string) => {
        setTasks([{taskId: v1(), title: newTaskTitle, isDone: false}, ...tasks]);
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
                addTask={addTask}
            />
        </div>
    );
};
