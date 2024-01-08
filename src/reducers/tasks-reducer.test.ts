import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, TasksType, updateTaskTitleAC} from './tasks-reducer'
import {removeTodolistAC} from './todolists-reducer';

let startState: TasksType

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
                addedDate: ''
            },
            {
                id: '2', title: 'JS', status: 2,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3', title: 'React', status: 0,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
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
                addedDate: ''
            },
            {
                id: '2', title: 'milk', status: 2,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3', title: 'tea', status: 0,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: 0,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2', title: 'JS', status: 2,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3', title: 'React', status: 0,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
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
                addedDate: ''
            },
            {
                id: '3', title: 'tea', status: 0,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC('todolistId2', 'juice'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', 0))

    expect(endState['todolistId2'][1].status).toBe(0)
    expect(endState['todolistId2'][1].title).toBe('milk')
})

test('title of task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskTitleAC('todolistId1', '3', 'Vue'))

    expect(endState['todolistId1'][2].title).toBe('Vue')
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
