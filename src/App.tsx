import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from './reducers/todolists-reducer';
import {Todolist} from './components/todolists/Todolist';
import {AddItem} from './components/add-item/AddItem';
import s from './App.module.scss'

export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const addTodolist = (title: string) => dispatch(addTodolistTC(title))

    return (
        <div className={s.App}>
            <AddItem callBack={addTodolist}/>
            <div className={s.todolists}>
                {todolists.map(tl => {
                    return (<Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                    />)
                })}
            </div>
        </div>
    );
};
