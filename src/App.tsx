import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {
    addTodolistAC,
    removeTodolistAC,
    changeTodolistTitleAC,
    TodolistDomainType
} from './reducers/todolists-reducer';
import {Todolist} from './components/todolists/Todolist';
import {AddItem} from './components/add-item/AddItem';

export const App = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const addTodolist = (title: string) => dispatch(addTodolistAC(title))
    const removeTodolist = (todolistId: string) => dispatch(removeTodolistAC(todolistId))
    const updateTodolistTitle = (todolistId: string, title: string) => dispatch(changeTodolistTitleAC(todolistId, title))

    return (
        <div className="App" style={{display: 'flex', gap: '20px', padding: '10px'}}>
            <AddItem callBack={addTodolist}/>
            {todolists.map(tl => {
                return (<Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    removeTodolist={removeTodolist}
                    updateTodolistTitle={updateTodolistTitle}
                    filter={tl.filter}
                />)
            })}
        </div>
    );
};
