import axios from "axios";

export const getTasks = ()=>(dispatch)=>{
    axios.get("http://localhost:3001/lists?_embed=tasks").then(({data})=>{
        dispatch(setTasks(data))
    })
}

export const setTasks = (items) =>({
    type:"SET_TASKS",
    payload:items
})

export const addTask = (items, listId)=>({
    type:"ADD_TASK",
    payload:items,listId
})
