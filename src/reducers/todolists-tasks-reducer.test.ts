//  test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {};
//     const startTodolistsState: Array<TodolistType> = [];
//
//     const action = addTodolistAC("new todolist");
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.todolistId);
//     expect(idFromTodolists).toBe(action.todolistId);
// });

import {TasksType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {removeTodolistAC} from './todolists-reducer';

// test('property with todolistId should be deleted', () => {
//     const startState: TasksType = {
//         "todolistId1": [
//             {taskId: "1", title: "CSS", isDone: false },
//             {taskId: "2", title: "JS", isDone: true },
//             {taskId: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             {taskId: "1", title: "bread", isDone: false },
//             {taskId: "2", title: "milk", isDone: true },
//             {taskId: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const action = removeTodolistAC("todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
// });