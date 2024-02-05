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
    },
    selectors: {
        // todolists: sliceState => sliceState.todolists,
        status: sliceState => sliceState.status,
        error: sliceState => sliceState.error,
    }
})
export const appActions = slice.actions
export const appReducer = slice.reducer
export const appSelectors = slice.selectors

///////////////   thunksCreators

///////////////   types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
