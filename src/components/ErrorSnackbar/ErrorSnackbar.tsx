import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {AppRootStateType, useAppDispatch} from '../../state/store';
import {setAppError} from '../../reducers/app-reducer';
import {useSelector} from 'react-redux';

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()

    const error = useSelector<AppRootStateType, null | string>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        // if (reason === 'clickaway') return

        dispatch(setAppError(null))
    }
    return (
        <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: '100%'}}
            >
                {error}
            </Alert>
        </Snackbar>
    );
};

