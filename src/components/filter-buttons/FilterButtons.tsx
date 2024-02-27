import React from "react";
import { styled } from "styled-components";
import { Button } from "./Button";
import { FilterType } from "components/TodolistsList/model/todolists/todolistsSlice";

export type FilterButtonsPropsType = {
  setFilter: (f: FilterType) => void;
  filter: FilterType;
};

export const FilterButtons = (props: FilterButtonsPropsType) => {
  return (
    <StyledFilterButtons>
      <Button setFilter={props.setFilter} filter={props.filter} buttonName={"all"} value={"all"} />
      <Button setFilter={props.setFilter} filter={props.filter} buttonName={"active"} value={"active"} />
      <Button setFilter={props.setFilter} filter={props.filter} buttonName={"completed"} value={"completed"} />
    </StyledFilterButtons>
  );
};

const StyledFilterButtons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 5px;
`;
