import React, {useState} from 'react';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {Tasks} from './Tasks';
import {TaskType} from '../../App';
import {AddItem} from '../add-item/AddItem';
import {EditableSpan} from '../editable-span/EditableSpan';

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTodolist: (todolistId: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: string
    updateTodolistTitle: (todolistId: string, title: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
};

export type todolistDataType = {
    title: string
    tasks: TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed';

export const Todolist = (props: TodolistPropsType) => {
    const [filter, setFilter] = useState<FilterType>('all')

    const deleteTodolist = () => props.removeTodolist(props.id)
    const addTask = (title: string) => props.addTask(props.id, title)
    const deleteTask = (taskId: string) => props.deleteTask(props.id, taskId)
    const changeTaskStatus = (taskId: string, isDone: boolean) => props.changeTaskStatus(props.id, taskId, isDone)

    const filterTasks = () => {
        return filter === 'active'
            ? props.tasks.filter((t) => !t.isDone)
            : filter === 'completed'
                ? props.tasks.filter((t) => t.isDone)
                : props.tasks;
    };
    let filteredTasks = filterTasks();

    const updateTodolistTitle = (title: string) => {
        props.updateTodolistTitle(props.id, title)
    }
    const updateTaskTitle = (taskId: string, title: string) => {
        props.updateTaskTitle(props.id, taskId, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan updateItemTitle={updateTodolistTitle} title={props.title}/>
                <button onClick={deleteTodolist}>Del</button>
            </h3>

            <AddItem callBack={addTask}/>

            <Tasks updateTaskTitle={updateTaskTitle} changeTaskStatus={changeTaskStatus} tasks={filteredTasks}
                   removeTask={deleteTask}/>
            <FilterButtons setFilter={setFilter} filter={props.filter}/>
        </div>
    );
};

