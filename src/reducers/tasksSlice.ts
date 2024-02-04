import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateAPITaskModelType} from 'api/todolist-api'
import {Dispatch} from 'redux'
import {AppActionsType, AppRootStateType} from 'state/store'
import {handleNetworkAppError, handleServerAppError} from 'utils/error-utils';
import {appActions, RequestStatusType} from "reducers/app-reducer";

const initialState: TasksDomainType = {
    // [todolistId1]: [
    //     {id: v1(), title: 'Read', status: 2},
    //     {id: v1(), title: 'Sleep', status: 0},
    //     {id: v1(), title: 'Eat', status: 0},
    //     {id: v1(), title: 'Code', status: 2},
    //     {id: v1(), title: 'Toilet', status: 0},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: 'HTML', status: 2},
    //     {id: v1(), title: 'CSS', status: 2},
    //     {id: v1(), title: 'React', status: 0},
    // ],
}

export const tasksReducer = (state: TasksDomainType = initialState, action: AppActionsType): TasksDomainType => {
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
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map((t: any) => ({...t, entityStatus: 'idle'}))
            }
        case 'ADD-TASK':
            return {
                ...state, [action.payload.task.todoListId]:
                    [{...action.payload.task, entityStatus: 'idle'}, ...state[action.payload.task.todoListId]]
            }
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
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
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

/////////////////   actionsCreators
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK' as const, payload: {task}})
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK' as const, payload: {todolistId, taskId}})
const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS' as const, payload: {todolistId, tasks}})
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK' as const, payload: {todolistId, taskId, model}})
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS' as const, todolistId, taskId, entityStatus})
///////////////   thunksCreators
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
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
                dispatch(removeTaskAC(todolistId, taskId))
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
                dispatch(addTaskAC(res.data.data.item))
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
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
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
                        dispatch(updateTaskAC(todolistId, taskId, domainModel))
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