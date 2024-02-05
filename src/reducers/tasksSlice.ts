import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from 'api/todolist-api'
import {Dispatch} from 'redux'
import {handleNetworkAppError, handleServerAppError} from 'utils/error-utils';
import {appActions, RequestStatusType} from "reducers/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksDomainType,
    reducers: {
        setTasks: (state, action: PayloadAction<{ id: string, tasks: TaskType[] }>) => {
            state[action.payload.id] = action.payload.tasks.map((t) => ({...t, entityStatus: 'idle'}))
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },
    },
    selectors: {
        tasks: sliceState => sliceState.tasks
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksSelectors = slice.selectors


const initialState: TasksDomainType = {}

export const _tasksReducer = (state: TasksDomainType = initialState, action: any): TasksDomainType => {
    switch (action.type) {
        // case 'ADD-TODOLIST':
        //     return {...state, [action.todolist.id]: []}
        // case 'SET-TODOLISTS': {
        //     const stateCopy = {...state}
        //     action.todolists.forEach((tl) => {
        //         stateCopy[tl.id] = []
        //     })
        //     return stateCopy
        // }
        // case 'REMOVE-TODOLIST': {
        //     const stateCopy = {...state}
        //     delete stateCopy[action.id]
        //     return stateCopy
        // }
        case 'UPDATE-TASK':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, ...action.payload.model} : t)
            }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId
                        ? {...t, entityStatus: action.entityStatus} : t)
            }
        default:
            return state
    }
}
export type TasksActionsType =
// | ReturnType<typeof addTaskAC>
// | ReturnType<typeof removeTaskAC>
// | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

/////////////////   actionsCreators
// export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK' as const, payload: {task}})
// export const removeTaskAC = (todolistId: string, taskId: string) =>
//     ({type: 'REMOVE-TASK' as const, payload: {todolistId, taskId}})
// const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
//     ({type: 'SET-TASKS' as const, payload: {todolistId, tasks}})
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK' as const, payload: {todolistId, taskId, model}})
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS' as const, todolistId, taskId, entityStatus})
///////////////   thunksCreators
export const getTasksTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todolistAPI.getTasks(id)
        .then(res => {
            dispatch(tasksActions.setTasks({id, tasks: res.data.items}))
            dispatch(appActions.setStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.removeTask({todolistId, taskId}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
            handleNetworkAppError(error, dispatch)
        })
}
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
// export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const task = getState().tasks[todolistId].find((t:any) => t.id === taskId)
//         if (task) {
//             const APImodel: UpdateAPITaskModelType = {
//                 title: task.title,
//                 deadline: task.deadline,
//                 description: task.description,
//                 status: task.status,
//                 priority: task.priority,
//                 startDate: task.startDate,
//                 ...domainModel
//             }
//             dispatch(appActions.setStatus({status: 'loading'}))
//             todolistAPI.updateTask(todolistId, taskId, APImodel)
//                 .then(res => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(updateTaskAC(todolistId, taskId, domainModel))
//                         dispatch(appActions.setStatus({status: 'succeeded'}))
//                     } else {
//                         handleServerAppError(res.data, dispatch)
//                     }
//                 })
//                 .catch((error) => {
//                     handleNetworkAppError(error, dispatch)
//                 })
//         }
//     }

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