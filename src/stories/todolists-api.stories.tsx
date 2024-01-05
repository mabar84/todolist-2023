import React, {useEffect, useState} from 'react'
import {todolistAPI, TodolistType} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>([])
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist().then(res => setState(res.data))
    }, [])
    return <>
        {state.map(tl => <div key={tl.id}>
            id: <span>{tl.id}</span> |
            title: <span>{tl.title}</span>
        </div>)}
        {/*{JSON.stringify(state)}*/}
    </>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'YOYOYOYOOYO'
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <>
        id: <span>{state && state.data.item.id}</span> |
        title: <span>{state && state.data.item.title}</span>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        const id = '99ad12a3-8508-40b6-be2e-cb6bceaafcf0'
        todolistAPI.deleteTodolist(id).then(res => {
            setState(res.data)
        })

    }, [])
    return <>{JSON.stringify(state)}</>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>([])
    useEffect(() => {
        const id = 'a573d754-17f2-4462-9e15-48a5b4a79cc5'
        const title = '1234567890'
        todolistAPI.updateTodolist(id, title)
            .then(res => setState(res.data))
    }, [])
    return <>{JSON.stringify(state)}</>
}

