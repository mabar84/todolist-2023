import {tasksActions, TasksDomainType, tasksReducer} from 'reducers/tasksSlice'
import {todolistsActions} from "reducers/todolistsSlice";
import {TaskStatuses} from "api/todolist-api";

let startState: TasksDomainType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: 0,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: '2', title: 'JS', status: 2,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: '3', title: 'React', status: 0,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: 0,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: '2', title: 'milk', status: 2,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: '3', title: 'tea', status: 0,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            }
        ]
    }
})
// test('correct task should be deleted from correct array', () => {
//     const endState = tasksReducer(startState, tasksThunks.removeTask.fulfilled({
//         todolistId: 'todolistId2',
//         taksId: '2'
//     }) )
//     // const endState = tasksReducer(startState, tasksActions.removeTask({todolistId: 'todolistId2', taskId: '2'}))
//     expect(endState).toEqual({
//         'todolistId1': [
//             {
//                 id: '1', title: 'CSS', status: 0,
//                 description: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 priority: 0,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 entityStatus: 'idle'
//             },
//             {
//                 id: '2', title: 'JS', status: 2,
//                 description: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 priority: 0,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 entityStatus: 'idle'
//             },
//             {
//                 id: '3', title: 'React', status: 0,
//                 description: '',
//                 todoListId: 'todolistId1',
//                 order: 0,
//                 priority: 0,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 entityStatus: 'idle'
//             }
//         ],
//         'todolistId2': [
//             {
//                 id: '1', title: 'bread', status: 0,
//                 description: '',
//                 todoListId: 'todolistId2',
//                 order: 0,
//                 priority: 0,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 entityStatus: 'idle'
//             },
//             {
//                 id: '3', title: 'tea', status: 0,
//                 description: '',
//                 todoListId: 'todolistId2',
//                 order: 0,
//                 priority: 0,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 entityStatus: 'idle'
//             }
//         ]
//     })
// })
test('correct task should be added to correct array', () => {
    const newTask = {
        id: '4',
        title: 'juice',
        status: 0,
        description: '',
        todoListId: 'todolistId2',
        order: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        addedDate: '',
        entityStatus: 'idle'
    }
    const endState = tasksReducer(startState, tasksActions.addTask({task: newTask}))
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(0)
})
test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState,
        tasksActions.updateTask({
            todolistId: 'todolistId2',
            taskId: '2',
            model: {status: TaskStatuses.New}
        }))
    expect(endState['todolistId2'][1].status).toBe(0)
    expect(endState['todolistId2'][1].title).toBe('milk')
})
test('title of task should be changed', () => {
    const endState = tasksReducer(startState, tasksActions.updateTask({
        todolistId: 'todolistId1',
        taskId: '3',
        model: {title: 'Vue'}
    }))
    expect(endState['todolistId1'][2].title).toBe('Vue')
})
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, todolistsActions.removeTodolist({id: 'todolistId2'}))
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})