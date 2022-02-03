//MODULES
import React from "react";
//COMPONENTS
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
//STYLES
import "./styles/main.scss";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addTask, getTasks} from "./Redux/actions/tasks";

function App() {
  const list = useSelector(({tasks})=>tasks)
  const dispatch = useDispatch()
 React.useEffect(()=>{
   dispatch(getTasks())
 }, [])

  // const [list, setList] = React.useState([]);

  // React.useEffect(() => {
  //   async function getItems() {
  //     const items = await axios.get(
  //       "http://localhost:3001/lists?_embed=tasks"
  //     );
  //     // setList(items.data);
  //   };
  //   getItems();
  // }, []);
  // React.useEffect(()=>{
  //   axios.get("http://localhost:3001/lists?_embed=tasks").then(({data})=>{
  //     setList(data)
  //   })
  // }, [])

  const onAddTask = (obj, listId) => {
      dispatch(addTask(obj,listId))
  };

  const onCompleteTask = (listId,id, complete) => {
    const newList = list.items.map((obj) => {
      if (listId === obj.id) {
        obj.tasks=obj.tasks.map(item=>{
          if(id===item.id){
            item.done = complete;
          }
          return item
        })
        }
      return obj;
    });
    // setList(newList);
    axios.patch(`http://localhost:3001/tasks/${id}`, {done:complete})

  };
  const onDeleteTask = (listId, id) => {
    const newList = list.items.map(obj=>{
      if(obj.id===listId){
        obj.tasks = obj.tasks.filter(item=>item.id!==id)
      }
      return obj
    })
    // setList(newList)
    axios.delete('http://localhost:3001/tasks/'+id, {}).catch((e)=>{
      alert(e)
    })

    // const newList = list.filter((item) => {
    //   return item.id !== id || listId !== item.listId;
    // });
    // setList(newList);
    // axios.delete('http://localhost:3001/tasks/' + id)
  };
  const onEditTask = (text, listId, id) => {
    const newList = list.items.map((obj) => {
      if (listId===obj.id) {
        obj.tasks=obj.tasks.map(item=>{
          if(item.id===id&&item.tasks!==text){
            console.log(item.description)
            item.description=text
          }return item
        })

      }
      return obj;
    });
    // setList(newList);
    axios.patch(`http://localhost:3001/tasks/${id}`,{description:text})

  };

  return (
    <div className="wrapper">
      <div className="container">
        {list.items.map((item) => {
          return (
            <div className="bar" key={`${item.id}_${item.title}`}>
              <TodoForm
                title={item.title}
                addTask={onAddTask}
                listId={item.id}
              />
              <TodoList
                list={item.tasks}
                listId={item.id}
                onCompleteTask={onCompleteTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
