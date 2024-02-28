import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todolistsSelectors, todolistsThunks } from "components/TodolistsList/model/todolists/todolistsSlice";
import { Todolist } from "components/TodolistsList/Todolist";
import s from "App.module.scss";
import { AddItem } from "components/add-item/AddItem";
import { authSelectors } from "reducers/authSlice";
import { Navigate } from "react-router-dom";

const TodolistList = () => {
  const todolists = useSelector(todolistsSelectors.todolists);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const dispatch = useDispatch();
  const addTodolist = (title: string) => {
    // dispatch(addTodolistTC(title));
    dispatch(todolistsThunks.addTodolist(title));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(todolistsThunks.getTodolists());
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <AddItem callBack={addTodolist} />
      <div className={s.todolists}>
        {todolists.map((tl) => (
          <Todolist key={tl.id} todolist={tl} />
        ))}
      </div>
    </div>
  );
};
export default TodolistList;
