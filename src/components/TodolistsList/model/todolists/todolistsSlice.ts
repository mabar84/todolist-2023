import { Dispatch } from "redux";
import { handleNetworkAppError, handleServerAppError } from "utils/error-utils";
import { appActions, RequestStatusType } from "reducers/appSLice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI, TodolistType } from "components/TodolistsList/api/todolists.api";

const slice = createSlice({
  name: "todolists",
  initialState: {
    todolists: [] as TodolistDomainType[],
  },
  reducers: {
    // setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
    //     state.todolists = action.payload.todolists.map((tl) => ({...tl, entityStatus: "idle", filter: "all"}));
    // },
    // addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
    //   state.todolists.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    // },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.todolists.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state.todolists[index].title = action.payload.title;
      }
    },
    // changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
    //     const index = state.TodolistsList.findIndex((tl) => tl.id === action.payload.id)
    //     if (index > -1) {
    //         state.TodolistsList[index].filter = action.payload.filter
    //     }
    // },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const index = state.todolists.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state.todolists[index].entityStatus = action.payload.entityStatus;
      }
    },
    clearTodolists: () => {
      return { todolists: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((tl) => tl.id === action.payload.id);
        if (index > -1) {
          state.todolists.splice(index, 1);
        }
      })
      .addCase(getTodolists.fulfilled, (state, action) => {
        state.todolists = action.payload.todolists.map((tl) => ({ ...tl, entityStatus: "idle", filter: "all" }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.todolists.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
      });
  },
  selectors: {
    todolists: (sliceState) => sliceState.todolists,
  },
});

/////////////////   thunkCreators
const getTodolists = createAsyncThunk<
  {
    todolists: TodolistType[];
  },
  undefined
>(`${slice.name}/getTodolists`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setStatus({ status: "loading" }));
    const res = await todolistAPI.getTodolists();
    dispatch(appActions.setStatus({ status: "succeeded" }));
    return { todolists: res.data };
  } catch (e) {
    return rejectWithValue(null);
  }
});
const addTodolist = createAsyncThunk<
  {
    todolist: TodolistType;
  },
  string
>(`${slice.name}/addTodolist`, async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setStatus({ status: "loading" }));
    const res = await todolistAPI.createTodolist(title);
    if (res.data.resultCode === 0) {
      // dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
      dispatch(appActions.setStatus({ status: "succeeded" }));
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    return rejectWithValue(null);
  }
});

// export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
//   dispatch(appActions.setStatus({ status: "loading" }));
//   todolistAPI
//     .createTodolist(title)
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
//         dispatch(appActions.setStatus({ status: "succeeded" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleNetworkAppError(error, dispatch);
//     });
// };

const removeTodolist = createAsyncThunk<{ id: string }, string>(
  `${slice.name}/removeTodolist`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setStatus({ status: "loading" }));
      dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }));
      const res = await todolistAPI.deleteTodolist(id);
      if (res.data.resultCode === 0) {
        // dispatch(todolistsActions.removeTodolist({ id }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
        return { id };
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "idle" }));
        return rejectWithValue(null);
      }
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);
export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  todolistAPI
    .updateTodolist(id, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(todolistsActions.changeTodolistTitle({ id, title }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleNetworkAppError(error, dispatch);
    });
};
/////////////////   types
export type FilterType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { removeTodolist, getTodolists, addTodolist };
export const todolistsSelectors = slice.selectors;
