import React, {useReducer} from 'react';
import {
    FilterType,
    Todolist,
} from './components/todolists/Todolist';
import {v1} from 'uuid';
import {AddItem} from './components/add-item/AddItem';
import {
    addEmptyArrayOfTaskAC,
    addTaskAC,
    changeTaskStatusAC, removeArrayOfTaskAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from './reducers/tasksReducer';
import {addTodolistAC, removeTodolistAC, todolistsReducer, updateTodolistTitleAC} from './reducers/todolistsReducer';

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
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to do', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'completed'},
    ])

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
        // setTasks({...tasks, [todolistId]: [{taskId: v1(), title, isDone: false}, ...tasks[todolistId]]})
    };

    const removeTask = (todolistId: string, taskId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)})
        dispatchTasks(removeTaskAC(todolistId, taskId))
    };

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(updateTaskTitleAC(todolistId, taskId, title))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, title} : t)})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, isDone} : t)})
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        dispatchTodolists(addTodolistAC(newTodolistId, title))
        // setTodolists([{id: newTodolistId, title, filter: 'all'}, ...todolists])
        // setTasks({[newTodolistId]: [], ...tasks})
        dispatchTasks(addEmptyArrayOfTaskAC(newTodolistId))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasks(removeArrayOfTaskAC(todolistId))
        // setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
        dispatchTodolists(updateTodolistTitleAC(todolistId, title))
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
                        deleteTask={removeTask}
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
