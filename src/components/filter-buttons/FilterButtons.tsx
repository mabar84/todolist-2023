import React from 'react';
import {styled} from 'styled-components';
import {FilterType} from '../todolists/Todolist';
import {Button} from './Button';

export type FilterButtonsPropsType = {
    setFilter: (f: FilterType) => void
};

export const FilterButtons = (props: FilterButtonsPropsType) => {

    return (
        <StyledFilterButtons>
            <Button setFilter={props.setFilter} name={'all'} filter={'all'}/>
            <Button setFilter={props.setFilter} name={'active'} filter={'active'}/>
            <Button setFilter={props.setFilter} name={'completed'} filter={'completed'}/>
        </StyledFilterButtons>
    );
};

const StyledFilterButtons = styled.div`
  display: flex;
  gap: 5px;
`