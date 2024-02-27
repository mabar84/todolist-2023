import { TasksDomainType, tasksReducer, tasksThunks } from "components/TodolistsList/model/tasks/tasksSlice";
import { todolistsThunks } from "components/TodolistsList/model/todolists/todolistsSlice";
import { TaskStatuses } from "components/TodolistsList/api/todolists.api";

let startState: TasksDomainType;
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: 0,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: "2",
        title: "JS",
        status: 2,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: "3",
        title: "React",
        status: 0,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: 0,
        description: "",
        todoListId: "todolistId2",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: "2",
        title: "milk",
        status: 2,
        description: "",
        todoListId: "todolistId2",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: "3",
        title: "tea",
        status: 0,
        description: "",
        todoListId: "todolistId2",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
    ],
  };
});
test("correct task should be deleted from correct array", () => {
  const action = {
    type: tasksThunks.removeTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taksId: "2",
    },
  };
  const endState = tasksReducer(startState, action);
  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: 0,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: "2",
        title: "JS",
        status: 2,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: "3",
        title: "React",
        status: 0,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: 0,
        description: "",
        todoListId: "todolistId2",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: "3",
        title: "tea",
        status: 0,
        description: "",
        todoListId: "todolistId2",
        order: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        entityStatus: "idle",
      },
    ],
  });
});
test("correct task should be added to correct array", () => {
  const newTask = {
    id: "4",
    title: "juice",
    status: 0,
    description: "",
    todoListId: "todolistId2",
    order: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    addedDate: "",
    entityStatus: "idle",
  };
  const action = {
    type: tasksThunks.addTask.fulfilled.type,
    payload: {
      task: newTask,
    },
  };
  const endState = tasksReducer(startState, action);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juice");
  expect(endState["todolistId2"][0].status).toBe(0);
});
test("status of specified task should be changed", () => {
  const endState = tasksReducer(startState, {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: "2",
      domainModel: { status: TaskStatuses.New },
    },
  });
  expect(endState["todolistId2"][1].status).toBe(0);
  expect(endState["todolistId2"][1].title).toBe("milk");
});
test("title of task should be changed", () => {
  const endState = tasksReducer(startState, {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId1",
      taskId: "3",
      domainModel: { title: "Vue" },
    },
  });
  expect(endState["todolistId1"][2].title).toBe("Vue");
});
test("property with todolistId should be deleted", () => {
  const action = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: { id: "todolistId2" },
  };
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
