export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}
/////////////////   actionsCreators
export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS' as const, status
})
///////////////   thunksCreators

///////////////   types
export type AppReducerActionsType = ReturnType<typeof setAppStatus>
