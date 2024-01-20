import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {setAppError, setAppStatus} from '../reducers/app-reducer';

// export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {

    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
        dispatch(setAppError('here'))
    } else {
        dispatch(setAppError('Some error occured'))
    }
    dispatch(setAppStatus('failed'))
}


export const handleNetworkAppError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppStatus('failed'))
    dispatch(setAppError(error.message))
}