import React, {useState} from 'react';
import {
    FilterType,
    Todolist,
} from './components/todolists/Todolist';
import {v1} from 'uuid';
import {AddItem} from './components/add-item/AddItem';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

let todolistId1 = v1()
let todolistId2 = v1()

export type TasksType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const [tasks, setTasks] = useState<TasksType>({
            [todolistId1]: [
                {taskId: v1(), title: 'Read', isDone: true},
                {taskId: v1(), title: 'Sleep', isDone: false},
                {taskId: v1(), title: 'Eat', isDone: false},
                {taskId: v1(), title: 'Code', isDone: true},
                {taskId: v1(), title: 'Toilet', isDone: false},
            ],
            [todolistId2]: [
                {taskId: v1(), title: 'HTML', isDone: true},
                {taskId: v1(), title: 'CSS', isDone: true},
                {taskId: v1(), title: 'React', isDone: false},
            ],
        }
    );

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to do', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'completed'},
    ])

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)})
    };
    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{taskId: v1(), title, isDone: false}, ...tasks[todolistId]]})
    };

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, isDone} : t)})
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        setTodolists([{id: newTodolistId, title, filter: 'all'}, ...todolists])
        setTasks({[newTodolistId]: [], ...tasks})
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, title} : t)})
    }

    return (
        <div
            className="App"
            style={{display: 'flex', gap: '20px', padding: '10px'}}
        >
            <AddItem callBack={addTodolist}/>
            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        tasks={tasks[tl.id]}
                        title={tl.title}
                        removeTodolist={removeTodolist}
                        deleteTask={deleteTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        updateTodolistTitle={updateTodolistTitle}
                        updateTaskTitle={updateTaskTitle}
                    />
                )
            })}

        </div>
    );
};
