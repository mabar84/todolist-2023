import React from "react";
import { styled } from "styled-components";
import { FilterType } from "features/TodolistsList/model/todolists/todolistsSlice";

export type ButtonPropsType = {
  buttonName: string;
  value: FilterType;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const Button = (props: ButtonPropsType) => {
  let isActive = props.value === props.filter;
  const filterTasks = () => {
    props.setFilter(props.value);
  };
  return (
    <StyledButton onClick={filterTasks} className={isActive ? "active" : ""}>
      {props.buttonName}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  min-width: 70px;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid orange;
  text-transform: uppercase;
  cursor: pointer;

  &.active {
    background: orange;
  }
`;
