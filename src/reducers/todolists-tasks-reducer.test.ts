import {TodolistDomainType, todolistsActions} from 'reducers/todolistsSlice';
import {TasksDomainType} from 'reducers/tasksSlice';

test('ids should be equals', () => {
    const startTasksState: TasksDomainType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = todolistsActions.addTodolist({
        todolist: {
            title: 'newTodolistTitle',
            id: 'someId',
            order: 0,
            addedDate: ''
        }
    })

    // const endTasksState = tasksReducer(startTasksState, action)
    // const endTodolistsState = todolistsReducer(startTodolistsState, action)
    //
    // const keys = Object.keys(endTasksState)
    // const idFromTasks = keys[0]
    // const idFromTodolists = endTodolistsState[0].id

    // expect(idFromTasks).toBe(action.todolist.id)
    // expect(idFromTodolists).toBe(action.todolist.id)
})
