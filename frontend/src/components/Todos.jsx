import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import axios from "axios";
import {Link} from 'react-router-dom'
import Header from "./Header";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [onClick, setOnClick] = useState(false);

  useEffect(() => {
    const callTodos = async () => {
      const response = await axios.get("http://localhost:3000/todos");
      //console.log(response.data.data)
      setTodos(response.data.data);
      // .then(async(data)=>{
      //   const response = await data.json();

      // })
    };
    callTodos();
  }, [onClick]);
  console.log(todos.length);

  {
    if (todos.length === 0) {
      return (
        <>
        <Header/>
        <div className="p-12 flex flex-col gap-2 ">
          <h1>No todos</h1>
          <button className="bg-gray-600 text-white p-1 rounded-md w-[100px] ">
            <Link to="/create-todo" >Create Todo</Link>
          </button>
        </div>
        </>
      );
    } else {
      return (
        <>
        <Header/>
        <div className="p-12 flex flex-col gap-2">
        <button className="bg-gray-600 text-white p-1 rounded-md w-[100px] ">
            <Link to="/create-todo" >Create Todo</Link>
          </button>
        <div className="flex flex-wrap gap-2 w-full justify-center items-center">
          {todos.map((todo) => (
            <TodoCard todo={todo} setOnClick={setOnClick} key={todo._id} />
          ))}
        </div>
        
        </div>
        </>
      );
    }
  }
}

export default Todos;
