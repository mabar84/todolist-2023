import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {styled} from 'styled-components';

type AddItemPropsType = {
    callBack: (title: string) => void
}
export const AddItem: React.FC<AddItemPropsType> = ({callBack}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            callBack(title.trim())
            setTitle('')
        } else {
            setError('This field is required')
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <StyledWrapper>
            <input className={error ? 'error' : ''} type="text" value={title}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <p> {error} </p>}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;

  input {
    width: 100%;
    max-width: 300px;
  }

  input.error {
    outline: 1px solid red;
    border: 1px solid red;
  }

  p {
    min-height: 22px;
    margin: 0;
    color: red;
  }
`