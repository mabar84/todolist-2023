import { TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateAPITaskModelType } from "api/todolist-api";
import { handleNetworkAppError, handleServerAppError } from "utils/error-utils";
import { appActions, RequestStatusType } from "reducers/appSLice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRootStateType } from "state/store";
import { todolistsActions } from "reducers/todolistsSlice";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksDomainType,
  reducers: {
    // updateTask: (
    //   state,
    //   action: PayloadAction<{
    //     todolistId: string;
    //     taskId: string;
    //     model: UpdateDomainTaskModelType;
    //   }>,
    // ) => {
    //   const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
    //   if (index > -1) {
    //     state[action.payload.todolistId][index] = {
    //       ...state[action.payload.todolistId][index],
    //       ...action.payload.model,
    //     };
    //   }
    // },
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
            ...action.payload.model,
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
      .addCase(todolistsActions.removeTodolist, (state, action) => {
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
      const res = await todolistAPI.getTasks(todolistId);
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
      const res = await todolistAPI.deleteTask(arg.todolistId, arg.taksId);
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
      const res = await todolistAPI.createTask(arg.todolistId, arg.title);
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
  { todolistId: string; taskId: string; model: UpdateDomainTaskModelType },
  // { todolistId: string; taskId: string; model: UpdateAPITaskModelType },
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

    const res = await todolistAPI.updateTask(arg.todolistId, arg.taskId, APImodel);

    if (res.data.resultCode === 0) {
      // dispatch(tasksActions.updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, model: arg.domainModel }));
      dispatch(appActions.setStatus({ status: "succeeded" }));
      // return { todolistId: arg.todolistId, taskId: arg.taskId, model: arg.domainModel };
      // return { ...res.data.item };
      return { todolistId: arg.todolistId, taskId: arg.taskId, model: arg.domainModel };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error: any) {
    handleNetworkAppError(error, dispatch);
    return rejectWithValue(null);
  }
});

// export const updateTaskTC =
//   (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
//   (dispatch: Dispatch, getState: () => AppRootStateType) => {
//     const task = getState().tasks[todolistId].find((t: any) => t.id === taskId);
//     if (task) {
//       const APImodel: UpdateAPITaskModelType = {
//         title: task.title,
//         deadline: task.deadline,
//         description: task.description,
//         status: task.status,
//         priority: task.priority,
//         startDate: task.startDate,
//         ...domainModel,
//       };
//       dispatch(appActions.setStatus({ status: "loading" }));
//       todolistAPI
//         .updateTask(todolistId, taskId, APImodel)
//         .then((res) => {
//           if (res.data.resultCode === 0) {
//             dispatch(tasksActions.updateTask({ todolistId, taskId, model: domainModel }));
//             dispatch(appActions.setStatus({ status: "succeeded" }));
//           } else {
//             handleServerAppError(res.data, dispatch);
//           }
//         })
//         .catch((error) => {
//           handleNetworkAppError(error, dispatch);
//         });
//     }
//   };
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
