import {Dispatch} from 'redux';
import {ResponseType} from 'api/todolist-api';
import {appActions} from "reducers/app-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'Some error occured'}))
    }
    dispatch(appActions.setStatus({status: 'failed'}))
}
export const handleNetworkAppError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'failed'}))
    dispatch(appActions.setError({error: error.message}))
}