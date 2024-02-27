import { handleNetworkAppError, handleServerAppError } from "utils/error-utils";
import { appActions, RequestStatusType } from "reducers/appSLice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRootStateType } from "state/store";
import { todolistsActions, todolistsThunks } from "components/TodolistsList/model/todolists/todolistsSlice";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateAPITaskModelType,
} from "components/TodolistsList/api/todolists.api";
import { tasksAPI } from "components/TodolistsList/api/tasks.api";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksDomainType,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        entityStatus: RequestStatusType;
      }>,
    ) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((t) => ({ ...t, entityStatus: "idle" }));
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: "idle" });
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taksId);
        if (index > -1) {
          state[action.payload.todolistId].splice(index, 1);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) {
          state[action.payload.todolistId][index] = {
            ...state[action.payload.todolistId][index],
            ...action.payload.domainModel,
          };
        }
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
  selectors: {
    tasks: (sliceState) => sliceState.tasks,
  },
});
///////////////   thunksCreators
const getTasks = createAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
  `${slice.name}/getTasks`,
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setStatus({ status: "loading" }));
      const res = await tasksAPI.getTasks(todolistId);
      dispatch(appActions.setStatus({ status: "succeeded" }));
      return { todolistId, tasks: res.data.items };
    } catch (error: any) {
      handleNetworkAppError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);
const removeTask = createAsyncThunk<{ todolistId: string; taksId: string }, { todolistId: string; taksId: string }>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setStatus({ status: "loading" }));
      dispatch(
        tasksActions.changeTaskEntityStatus({
          todolistId: arg.todolistId,
          taskId: arg.taksId,
          entityStatus: "loading",
        }),
      );
      const res = await tasksAPI.deleteTask(arg.todolistId, arg.taksId);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "succeeded" }));
        return { todolistId: arg.todolistId, taksId: arg.taksId };
      } else {
        dispatch(
          tasksActions.changeTaskEntityStatus({
            todolistId: arg.todolistId,
            taskId: arg.taksId,
            entityStatus: "idle",
          }),
        );
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error: any) {
      handleNetworkAppError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);
const addTask = createAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setStatus({ status: "loading" }));
      dispatch(appActions.setStatus({ status: "loading" }));
      const res = await tasksAPI.createTask(arg.todolistId, arg.title);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "succeeded" }));
        return { task: res.data.data.item };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error: any) {
      handleNetworkAppError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);
const updateTask = createAsyncThunk<
  { todolistId: string; taskId: string; domainModel: UpdateDomainTaskModelType },
  { todolistId: string; taskId: string; domainModel: UpdateDomainTaskModelType }
>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  try {
    dispatch(appActions.setStatus({ status: "loading" }));
    const state = getState() as AppRootStateType;
    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);

    if (!task) {
      dispatch(appActions.setError({ error: "Task not found" }));
      return rejectWithValue(null);
    }

    const APImodel: UpdateAPITaskModelType = {
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      ...arg.domainModel,
    };

    const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, APImodel);

    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus({ status: "succeeded" }));
      return { todolistId: arg.todolistId, taskId: arg.taskId, domainModel: arg.domainModel };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error: any) {
    handleNetworkAppError(error, dispatch);
    return rejectWithValue(null);
  }
});
///////////////   types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType;
};
export type TasksDomainType = {
  [key: string]: TaskDomainType[];
};
// exports
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { getTasks, removeTask, addTask, updateTask };
export const tasksSelectors = slice.selectors;
