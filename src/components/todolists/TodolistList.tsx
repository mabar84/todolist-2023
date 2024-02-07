import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodolistTC, todolistsSelectors} from "reducers/todolistsSlice";
import {Todolist} from "components/todolists/Todolist";
import s from "App.module.scss";
import {AddItem} from "components/add-item/AddItem";

const TodolistList = () => {
    const todolists = useSelector(todolistsSelectors.todolists)
    const dispatch = useDispatch()
    const addTodolist = (title: string) => dispatch(addTodolistTC(title))
    return (
        <div>
            <AddItem callBack={addTodolist}/>
            <div className={s.todolists}>
                {todolists.map(tl => <Todolist key={tl.id} todolist={tl}/>)}

            </div>
        </div>
    );
};
export default TodolistList;