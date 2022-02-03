import React from 'react';
import Task from "./Task";

function TodoList({list, listId, onCompleteTask, onDeleteTask, onEditTask}) {
    return (
        <ul>
            {list.map((obj, id)=>{
                return (
                    <Task key={`${id}__${obj.description}`} id={obj.id} listId={listId} onEdit={onEditTask} onComplete={onCompleteTask} onDelete={onDeleteTask} {...obj}/>
                )
            })}
        </ul>
    );
}

export default TodoList;