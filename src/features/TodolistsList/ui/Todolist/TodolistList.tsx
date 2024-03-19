import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "App.module.scss";
import { AddItem } from "components/add-item/AddItem";
import { authSelectors } from "features/auth/model/authSlice";
import { Navigate } from "react-router-dom";
import { todolistsSelectors, todolistsThunks } from "features/TodolistsList/model/todolists/todolistsSlice";
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist";
import IconButton from "@mui/material/IconButton";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

      <InputTypeFile />

      <div className={s.todolists}>
        {todolists.map((tl) => (
          <Todolist key={tl.id} todolist={tl} />
        ))}
      </div>
    </div>
  );
};
export default TodolistList;

const InputTypeFile = () => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      console.log("file: ", file);
    }
  };
  //
  // return (
  //   <label>
  //     <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
  //     <IconButton component="span">
  //       <CloudUploadIcon />
  //     </IconButton>
  //   </label>
  // );

  // Альтернативный вариант
  return (
    <IconButton component="label">
      <CloudUploadIcon />
      <input accept={"image/webp"} type="file" multiple={true} onChange={uploadHandler} style={{ display: "none" }} />
    </IconButton>
  );
};
