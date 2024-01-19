export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
/////////////////   actionsCreators
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS' as const, status})
export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR' as const, error})
///////////////   thunksCreators

///////////////   types
export type AppReducerActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
