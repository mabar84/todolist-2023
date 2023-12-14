import React, {useReducer} from 'react';
import {
    FilterType,
    Todolist,
} from './components/todolists/Todolist';
import {v1} from 'uuid';
import {AddItem} from './components/add-item/AddItem';
import {
    addTaskAC, changeTaskStatusAC,
    removeTaskAC, tasksReducer, updateTaskTitleAC
} from './reducers/tasks-reducer';
import {addTodolistAC, removeTodolistAC, todolistsReducer, changeTodolistTitleAC} from './reducers/todolists-reducer';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
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
                {id: v1(), title: 'Read', isDone: true},
                {id: v1(), title: 'Sleep', isDone: false},
                {id: v1(), title: 'Eat', isDone: false},
                {id: v1(), title: 'Code', isDone: true},
                {id: v1(), title: 'Toilet', isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
            ],
        }
    );

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to do', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'},
    ])

    console.log('todolists', todolists)
    console.log('tasks', tasks)

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    };

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todolistId, taskId))
    };

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(updateTaskTitleAC(todolistId, taskId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)

        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, title))
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
