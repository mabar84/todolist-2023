import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './App.module.scss'
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import {Typography} from '@mui/material';
import {appSelectors} from "reducers/app-reducer";
import {ErrorSnackbar} from "components/ErrorSnackbar/ErrorSnackbar";
import {addTodolistTC, getTodolistsTC, todolistsSelectors} from "reducers/todolistsSlice";
import {AddItem} from "components/add-item/AddItem";
import {Todolist} from "components/todolists/Todolist";

export const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const todolists = useSelector(todolistsSelectors.todolists)
    const status = useSelector(appSelectors.status)
    const addTodolist = (title: string) => dispatch(addTodolistTC(title))

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
            <AddItem callBack={addTodolist}/>
            <div className={s.todolists}>
                {todolists.map(tl => <Todolist key={tl.id} todolist={tl}/>)}
            </div>
        </div>
    );
};
