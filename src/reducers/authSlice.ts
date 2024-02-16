import {Dispatch} from 'redux'
import {appActions} from "reducers/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "api/todolist-api";
import {handleNetworkAppError, handleServerAppError} from "utils/error-utils";
import {todolistsActions} from "reducers/todolistsSlice";

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
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
    selectors: {
        isLoggedIn: sliceState => sliceState.isLoggedIn,
        isInitialized: sliceState => sliceState.isInitialized
    }
})


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

const login = createAsyncThunk<any, any>(`${slice.name}/login`, async (data, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: 'loading'}))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            debugger
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e: any) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(null)
    }
})

const logout = createAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: 'loading'}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: 'succeeded'}))
            dispatch(todolistsActions.setTodolists({todolists: []}))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e: any) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(null)
    }
})
// export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     authAPI.login(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(appActions.setStatus({status: 'succeeded'}))
//                 dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
//
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleNetworkAppError(error, dispatch)
//         })
// }


// export const logoutTC = () => (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     authAPI.logout()
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
//                 dispatch(appActions.setStatus({status: 'succeeded'}))
//                 dispatch(todolistsActions.setTodolists({todolists: []}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleNetworkAppError(error, dispatch)
//         })
// }


export const authReducer = slice.reducer
export const authActions = slice.actions
export const authSelectors = slice.selectors
export const authThunks = {login, logout}