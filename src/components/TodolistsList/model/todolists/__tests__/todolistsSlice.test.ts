import { v1 } from "uuid";
import {
  TodolistDomainType,
  todolistsReducer,
  todolistsThunks,
} from "components/TodolistsList/model/todolists/todolistsSlice";

let todolistId1: string;
let todolistId2: string;

let startState: {
  todolists: TodolistDomainType[];
};
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = {
    todolists: [
      {
        id: todolistId1,
        title: "What to learn",
        entityStatus: "idle",
        filter: "all",
        addedDate: "",
        order: 0,
      },
      {
        id: todolistId2,
        title: "What to buy",
        entityStatus: "idle",
        filter: "all",
        addedDate: "",
        order: 0,
      },
    ],
  };
});
test("correct todolist should be removed", () => {
  const action = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: { id: todolistId1 },
  };
  const endState = todolistsReducer(startState, action);
  expect(endState.todolists.length).toBe(1);
  expect(endState.todolists[0].id).toBe(todolistId2);
});
test("correct todolist should be added", () => {
  let newTodolistTitle = "New Todolist";
  const action = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: {
        title: newTodolistTitle,
        id: "someId",
        order: 0,
        addedDate: "",
      },
    },
  };

  const endState = todolistsReducer(startState, action);
  expect(endState.todolists.length).toBe(3);
  expect(endState.todolists[0].title).toBe(newTodolistTitle);
});
test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";
  const action = {
    type: todolistsThunks.updateTodolistTitle.fulfilled.type,
    payload: {
      id: todolistId2,
      title: newTodolistTitle,
    },
  };
  const endState = todolistsReducer(startState, action);
  expect(endState.todolists[0].title).toBe("What to learn");
  expect(endState.todolists[1].title).toBe(newTodolistTitle);
});
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterType = 'completed'
//     const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))
//     expect(endState.TodolistsList[0].filter).toBe('all')
//     expect(endState.TodolistsList[1].filter).toBe(newFilter)
// })
