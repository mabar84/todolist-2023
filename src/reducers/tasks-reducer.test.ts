import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {TasksType} from '../App';
import {addTodolistAC} from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
    const startState: TasksType = {
        "todolistId1": [
            {taskId: "1", title: "CSS", isDone: false},
            {taskId: "2", title: "JS", isDone: true},
            {taskId: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {taskId: "1", title: "bread", isDone: false},
            {taskId: "2", title: "milk", isDone: true},
            {taskId: "3", title: "tea", isDone: false}
        ]
    };

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todolistId1": [
            {taskId: "1", title: "CSS", isDone: false},
            {taskId: "2", title: "JS", isDone: true},
            {taskId: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {taskId: "1", title: "bread", isDone: false},
            {taskId: "3", title: "tea", isDone: false}
        ]
    });
});


test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        'todolistId1': [
            {taskId: '1', title: 'CSS', isDone: false},
            {taskId: '2', title: 'JS', isDone: true},
            {taskId: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {taskId: '1', title: 'bread', isDone: false},
            {taskId: '2', title: 'milk', isDone: true},
            {taskId: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].taskId).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

// test('status of specified task should be changed', () => {
//     const startState: TasksType = {
//         'todolistId1': [
//             {taskId: '1', title: 'CSS', isDone: false},
//             {taskId: '2', title: 'JS', isDone: true},
//             {taskId: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {taskId: '1', title: 'bread', isDone: false},
//             {taskId: '2', title: 'milk', isDone: true},
//             {taskId: '3', title: 'tea', isDone: false}
//         ]
//     }
//
//     const action = changeTaskStatusAC('2', false, 'todolistId2')
//     const endState = tasksReducer(startState, action)
//     expect(endState['todolistId2'][2].isDone).toBe(false)
// })
// test('title of task should be changed', () => {
//     const startState: TasksType = {
//         'todolistId1': [
//             {taskId: '1', title: 'CSS', isDone: false},
//             {taskId: '2', title: 'JS', isDone: true},
//             {taskId: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {taskId: '1', title: 'bread', isDone: false},
//             {taskId: '2', title: 'milk', isDone: true},
//             {taskId: '3', title: 'tea', isDone: false}
//         ]
//     }
//
//     const action = changeTaskTitleAC('todolistId2','2', 'kefir' )
//     const endState = tasksReducer(startState, action)
//     expect(endState['todolistId2'][1].title).toBe('kefir')
// })

// test('new array should be added when new todolist is added', () => {
//     const startState: TasksType = {
//         'todolistId1': [
//             {taskId: '1', title: 'CSS', isDone: false},
//             {taskId: '2', title: 'JS', isDone: true},
//             {taskId: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {taskId: '1', title: 'bread', isDone: false},
//             {taskId: '2', title: 'milk', isDone: true},
//             {taskId: '3', title: 'tea', isDone: false}
//         ]
//     }
//
//     const action = addTodolistAC('new todolist')
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })


// test('property with todolistId should be deleted', () => {
//     const startState: TasksType = {
//         'todolistId1': [
//             {taskId: '1', title: 'CSS', isDone: false},
//             {taskId: '2', title: 'JS', isDone: true},
//             {taskId: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {taskId: '1', title: 'bread', isDone: false},
//             {taskId: '2', title: 'milk', isDone: true},
//             {taskId: '3', title: 'tea', isDone: false}
//         ]
//     }
//
//     const action = removeTodolistAC('todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).not.toBeDefined()
// })
