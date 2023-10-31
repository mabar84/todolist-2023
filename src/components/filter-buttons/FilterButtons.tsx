import React from 'react';
import {styled} from 'styled-components';
import {FilterType} from '../todolists/Todolist';
import {Button} from './Button';

export type FilterButtonsPropsType = {
    setFilter: (f: FilterType) => void
    filter: string
};

export const FilterButtons = (props: FilterButtonsPropsType) => {
    return (
        <StyledFilterButtons>
            <Button setFilter={props.setFilter} buttonName={'all'} filter={'all'} isActive={props.filter === 'all'}/>
            <Button setFilter={props.setFilter} buttonName={'active'} filter={'active'}
                    isActive={props.filter === 'active'}/>
            <Button setFilter={props.setFilter} buttonName={'completed'} filter={'completed'}
                    isActive={props.filter === 'completed'}/>
        </StyledFilterButtons>
    );
};

const StyledFilterButtons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 5px;
`