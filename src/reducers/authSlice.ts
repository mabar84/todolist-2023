import {Dispatch} from 'redux'
import {appActions} from "reducers/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "api/todolist-api";
import {handleNetworkAppError, handleServerAppError} from "utils/error-utils";

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    selectors: {
        isLoggedIn: sliceState => sliceState.isLoggedIn
    }
})
export const authReducer = slice.reducer
export const authActions = slice.actions
export const authSelectors = slice.selectors


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}

