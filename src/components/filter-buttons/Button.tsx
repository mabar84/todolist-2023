import React from 'react';
import {FilterType} from '../todolists/Todolist';
import {styled} from 'styled-components';

export type ButtonPropsType = {
    name: string
    filter: FilterType
    setFilter: (f: FilterType) => void;
}

export const Button = (props: ButtonPropsType) => {
    const filterTasks = () => {
        props.setFilter(props.filter);
    };
    return (
        <StyledButton onClick={filterTasks}>
            {props.name}
        </StyledButton>
    );
};

const StyledButton = styled.button`


`