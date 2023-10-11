import React from 'react';
import {Todolists} from "./components/todolists/Todolists";

const state = [{
    title: "What to do",
    tasks: [
        {taskId: 1, title: "Read", isDone: true},
        {taskId: 2, title: "Sleep", isDone: true}
    ]
},
    {
        title: "What to learn",
        tasks: [
            {taskId: 1, title: "HTML&CSS", isDone: false},
            {taskId: 2, title: "JS", isDone: true}
        ]
    }

]

export const App = () => {
    return (
        <div className="App" style={{display: 'flex', gap: '20px', padding: '10px'}}>
            <Todolists todolistsData={state}/>
        </div>
    );
}

