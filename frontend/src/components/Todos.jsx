import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import axios from "axios";
import {Link} from 'react-router-dom'
import Header from "./Header";
import { IoIosAddCircle } from "react-icons/io";


function Todos() {
  const [todos, setTodos] = useState([]);
  const [onClick, setOnClick] = useState(false);

  useEffect(() => {
    const callTodos = async () => {
      const response = await axios.get("http://localhost:3000/api/todo/todos",{
        headers:{
          'Content-Type': 'application/json',
          'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjI3ZmY0MGVkM2UwNjA2YTc1YjkyYSIsImlhdCI6MTcyNzE2ODUwMH0.9CPqa7s35agWKPsduEETBn5rSpFNWPS6nasgGvQBlqw'
        }
      });
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
          <button className=" text-white p-1 rounded-md ">
            <Link to="/create-todo" ><IoIosAddCircle className="text-gray-600 text-4xl" />
</Link>
          </button>
          <h1 className="text-lg text-gray-500">No todos...</h1>
        </div>
        </>
      );
    } else {
      return (
        <>
        <Header/>
        <div className="p-12 flex flex-col gap-2">
        <button className=" text-white p-1 rounded-md ">
            <Link to="/create-todo" ><IoIosAddCircle className="text-gray-600 text-4xl" />
</Link>
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
