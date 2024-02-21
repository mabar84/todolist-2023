import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  updateItemTitle: (title: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateItemTitle(title);
  };

  return editMode ? (
    <input onBlur={deactivateEditMode} onChange={onChangeInputHandler} autoFocus value={title} />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
