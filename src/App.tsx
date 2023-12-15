import React from 'react';
import {
    FilterType,
    Todolist,
} from './components/todolists/Todolist';
import {AddItem} from './components/add-item/AddItem';
import {
    addTaskAC, changeTaskStatusAC,
    removeTaskAC, updateTaskTitleAC
} from './reducers/tasks-reducer';
import {addTodolistAC, removeTodolistAC, changeTodolistTitleAC} from './reducers/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

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

export type TasksType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    };

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    };

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(todolistId, taskId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
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
