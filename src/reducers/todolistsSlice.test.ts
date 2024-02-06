import {v1} from 'uuid';
import {TodolistDomainType, todolistsActions, todolistsReducer} from 'reducers/todolistsSlice';

let todolistId1: string
let todolistId2: string

let startState: {
    todolists: TodolistDomainType[]
}
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        todolists: [
            {
                id: todolistId1, title: 'What to learn', entityStatus: 'idle', filter: 'all',
                addedDate: '',
                order: 0
            },
            {
                id: todolistId2, title: 'What to buy', entityStatus: 'idle', filter: 'all',
                addedDate: '',
                order: 0
            }
        ]
    }
})
test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, todolistsActions.removeTodolist({id: todolistId1}))
    expect(endState.todolists.length).toBe(1)
    expect(endState.todolists[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, todolistsActions.addTodolist({
        todolist: {
            title: newTodolistTitle,
            id: 'someId',
            order: 0,
            addedDate: ''
        }
    }))
    expect(endState.todolists.length).toBe(3)
    expect(endState.todolists[0].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, todolistsActions.changeTodolistTitle({
        id: todolistId2,
        title: newTodolistTitle
    }))
    expect(endState.todolists[0].title).toBe('What to learn')
    expect(endState.todolists[1].title).toBe(newTodolistTitle)
})
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterType = 'completed'
//     const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))
//     expect(endState.todolists[0].filter).toBe('all')
//     expect(endState.todolists[1].filter).toBe(newFilter)
// })