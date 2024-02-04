import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from "state/store";
import {appActions} from "reducers/app-reducer";

export const ErrorSnackbar = () => {
    const dispatch = useDispatch()

    const error = useSelector<AppRootStateType, null | string>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        // if (reason === 'clickaway') return
        dispatch(appActions.setError({error: null}))
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
}