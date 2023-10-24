import React from 'react';
import {FilterType} from '../todolists/Todolist';
import {styled} from 'styled-components';

export type ButtonPropsType = {
    name: string
    filter?: FilterType
    setFilter: (f: FilterType) => void;
}

export const Button = (props: ButtonPropsType) => {
    const filterTasks = () => {
        props.setFilter(props.filter || 'all');
    };
    return (
        <StyledButton onClick={filterTasks}>
            {props.name}
        </StyledButton>
    );
};

const StyledButton = styled.button`
  min-width: 70px;
  padding: 5px;
  background: orange;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid orangered;
  text-transform: uppercase;
  cursor: pointer;
`