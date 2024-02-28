import {
  TodolistDomainType,
  todolistsReducer,
  todolistsThunks,
} from "components/TodolistsList/model/todolists/todolistsSlice";
import { TasksDomainType, tasksReducer } from "components/TodolistsList/model/tasks/tasksSlice";

test("ids should be equals", () => {
  const startTasksState: TasksDomainType = {};
  const startTodolistsState: {
    todolists: TodolistDomainType[];
  } = { todolists: [] };

  // const action = todolistsActions.addTodolist({
  //   todolist: {
  //     title: "newTodolistTitle",
  //     id: "someId",
  //     order: 0,
  //     addedDate: "",
  //   },
  // });

  const action = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: {
        title: "newTodolistTitle",
        id: "someId",
        order: 0,
        addedDate: "",
      },
    },
  };

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState.todolists[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
