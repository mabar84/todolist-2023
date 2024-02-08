import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './App.module.scss'
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import {appSelectors} from "reducers/app-reducer";
import {ErrorSnackbar} from "components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import TodolistList from "components/todolists/TodolistList";
import {Login} from "components/login/Login";
import {authSelectors, initializeAppTC} from "reducers/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

export const App = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector(authSelectors.isInitialized)
    const status = useSelector(appSelectors.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className={s.App}>
            <ErrorSnackbar/>
            <AppBar position={'static'} style={{marginBottom: '10px'}}>
                <Toolbar>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Login
                    </Typography>
                </Toolbar>
                <div style={{height: '4px'}}>
                    {status === 'loading' && <LinearProgress color={'secondary'}/>}
                </div>
            </AppBar>
            <Routes>
                <Route path='' element={<TodolistList/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='404' element={<h1>404</h1>}/>
                <Route path='*' element={<Navigate to={'404'}/>}/>
            </Routes>
        </div>
    );
};
