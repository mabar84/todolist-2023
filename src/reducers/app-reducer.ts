import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'loading' as RequestStatusType,
        error: null as null | string
    },
    reducers: {
        setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error
        }
    }
})
export const appActions = slice.actions
export const appReducer = slice.reducer

///////////////   thunksCreators

///////////////   types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
