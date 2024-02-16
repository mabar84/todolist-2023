import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateAPITaskModelType} from 'api/todolist-api'
import {Dispatch} from 'redux'
import {handleNetworkAppError, handleServerAppError} from 'utils/error-utils';
import {appActions, RequestStatusType} from "reducers/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "state/store";
import {todolistsActions} from "reducers/todolistsSlice";

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksDomainType,
    reducers: {
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        // removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
        //     const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         state[action.payload.todolistId].splice(index, 1)
        //     }
        // },
        updateTask: (state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            model: UpdateDomainTaskModelType
        }>) => {
            const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.model}
            }
        },
        changeTaskEntityStatus: (state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            entityStatus: RequestStatusType
        }>) => {
            const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks.map((t) => ({...t, entityStatus: 'idle'}))
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taksId)
                if (index > -1) {
                    state[action.payload.todolistId].splice(index, 1)
                }
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
    },
    selectors: {
        tasks: sliceState => sliceState.tasks
    }
})


///////////////   thunksCreators
const getTasks = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string>
(`${slice.name}/getTasks`, async (todolistId: string, {dispatch, rejectWithValue}) => {
    try {
        dispatch(appActions.setStatus({status: 'loading'}))
        const res = await todolistAPI.getTasks(todolistId)
        dispatch(appActions.setStatus({status: 'succeeded'}))
        return {todolistId, tasks: res.data.items}
    } catch (error: any) {
        handleNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
const removeTask = createAsyncThunk(`${slice.name}/removeTask`, async (arg: {
    todolistId: string,
    taksId: string
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: 'loading'}))
        dispatch(tasksActions.changeTaskEntityStatus({
            todolistId: arg.todolistId,
            taskId: arg.taksId,
            entityStatus: 'loading'
        }))
        const res = await todolistAPI.deleteTask(arg.todolistId, arg.taksId)
        if (res.data.resultCode === 0) {
            // dispatch(tasksActions.removeTask({todolistId, taskId}))
            dispatch(appActions.setStatus({status: 'succeeded'}))
            return {todolistId: arg.todolistId, taksId: arg.taksId}
        } else {
            dispatch(tasksActions.changeTaskEntityStatus({
                todolistId: arg.todolistId,
                taskId: arg.taksId,
                entityStatus: 'idle'
            }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})

// export const removeTaskTC2 = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'loading'}))
//     todolistAPI.deleteTask(todolistId, taskId)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(tasksActions.removeTask({todolistId, taskId}))
//                 dispatch(appActions.setStatus({status: 'succeeded'}))
//             } else {
//                 dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'idle'}))
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'idle'}))
//             handleNetworkAppError(error, dispatch)
//         })
// }
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    dispatch(appActions.setStatus({status: 'loading'}))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.addTask({task: res.data.data.item}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find((t: any) => t.id === taskId)
        if (task) {
            const APImodel: UpdateAPITaskModelType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                ...domainModel
            }
            dispatch(appActions.setStatus({status: 'loading'}))
            todolistAPI.updateTask(todolistId, taskId, APImodel)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(tasksActions.updateTask({todolistId, taskId, model: domainModel}))
                        dispatch(appActions.setStatus({status: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    handleNetworkAppError(error, dispatch)
                })
        }
    }
///////////////   types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksDomainType = {
    [key: string]: TaskDomainType[]
}

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {getTasks, removeTask}
export const tasksSelectors = slice.selectors