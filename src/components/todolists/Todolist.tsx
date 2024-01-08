import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    TaskStatuses,
    TaskType,
    updateTaskTitleAC
} from '../../reducers/tasks-reducer';
import {Tasks} from './Tasks';
import {AddItem} from '../add-item/AddItem';
import {EditableSpan} from '../editable-span/EditableSpan';
import {FilterButtons} from '../filter-buttons/FilterButtons';
import {FilterType} from '../../reducers/todolists-reducer';


export type TodolistPropsType = {
    id: string
    title: string
    removeTodolist: (todolistId: string) => void
    filter: FilterType
    updateTodolistTitle: (todolistId: string, title: string) => void
};


export const Todolist = (props: TodolistPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

    const [filter, setFilter] = useState<FilterType>(props.filter)

    const deleteTodolist = () => props.removeTodolist(props.id)
    const updateTodolistTitle = (title: string) => props.updateTodolistTitle(props.id, title)

    const addTask = (title: string) => dispatch(addTaskAC(props.id, title))
    const deleteTask = (taskId: string) => dispatch(removeTaskAC(props.id, taskId))
    const updateTaskTitle = (taskId: string, title: string) => dispatch(updateTaskTitleAC(props.id, taskId, title))
    const changeTaskStatus = (taskId: string, status: TaskStatuses) => dispatch(changeTaskStatusAC(props.id, taskId, status))

    const filterTasks = () => {
        return filter === 'active'
            ? tasks.filter((t) => !t.status)
            : filter === 'completed'
                ? tasks.filter((t) => t.status)
                : tasks;
    };
    const filteredTasks = filterTasks();

    return (
        <div>
            <h3>
                <EditableSpan updateItemTitle={updateTodolistTitle} title={props.title}/>
                <button onClick={deleteTodolist}>Del</button>
            </h3>
            <AddItem callBack={addTask}/>
            <Tasks tasks={filteredTasks} removeTask={deleteTask}
                   updateTaskTitle={updateTaskTitle} changeTaskStatus={changeTaskStatus}/>
            <FilterButtons setFilter={setFilter} filter={filter}/>
        </div>
    );
};

