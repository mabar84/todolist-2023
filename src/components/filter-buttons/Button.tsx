import React from 'react';
import {FilterType} from '../todolists/Todolist';
import {styled} from 'styled-components';

export type ButtonPropsType = {
    buttonName: string
    filter: FilterType
    setFilter: (filter: FilterType) => void;
    isActive: boolean
}

export const Button = (props: ButtonPropsType) => {
    const filterTasks = () => {
        props.setFilter(props.filter || 'all');
    };
    return (
        <StyledButton onClick={filterTasks} className={props.isActive ? 'active' : ''}>
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
`