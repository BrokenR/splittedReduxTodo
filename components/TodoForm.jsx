import React from "react";
import axios from "axios";

function TodoForm({title, addTask, listId }) {
  const [input, setInput] = React.useState("");

  const onAddTask = ()=>{
    const obj = {"id":0,"description":input, "done":false, "listId":listId }
      if(input.trim()){
          axios.post('http://localhost:3001/tasks', obj).then(({data})=>{
              addTask(data, listId)
          })
          setInput('')
      }
  }

  return (
    <div className="form">
      <h1>{title}</h1>
      <input
          className='form__input'
        type="text"
        placeholder="Название"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="add_btn" onClick={onAddTask}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1V15"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 8H15"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default TodoForm;
