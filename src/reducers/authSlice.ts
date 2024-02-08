import {Dispatch} from 'redux'
import {appActions} from "reducers/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "api/todolist-api";
import {handleNetworkAppError, handleServerAppError} from "utils/error-utils";

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isInitialized: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    },
    selectors: {
        isLoggedIn: sliceState => sliceState.isLoggedIn,
        isInitialized: sliceState => sliceState.isInitialized
    }
})
export const authReducer = slice.reducer
export const authActions = slice.actions
export const authSelectors = slice.selectors

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {

    authAPI.me().then(res => {
        dispatch(authActions.setIsInitialized({isInitialized: true}))
        if (res.data.resultCode === 0) {
            // dispatch(appActions.setStatus({status: 'succeeded'}))
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(appActions.setStatus({status: 'succeeded'}))
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}

