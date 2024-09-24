import axios from "axios";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";

function TodoCard({ todo ,setOnClick}) {
  const navigate = useNavigate();
  
  const onClickHandler = async () => {
    if (todo.completed) {
      return alert("You have complted the task");
    }
    try {
      
      const result = await axios.put("http://localhost:3000/api/todo/completed", {
        id: todo._id,
      },{
        headers:{
          'Content-Type': 'application/json',
          'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjI3ZmY0MGVkM2UwNjA2YTc1YjkyYSIsImlhdCI6MTcyNzE2ODUwMH0.9CPqa7s35agWKPsduEETBn5rSpFNWPS6nasgGvQBlqw'
        }
      });
      setOnClick((prev)=>!prev)
    } catch (error) {
      console.log(error);
    }
   // console.log(result);
  };

  const deleteButtonhandler = async () => {
    try {
      const result = await axios.delete("http://localhost:3000/api/todo/delete", {
       data:{ id: todo._id,}
      },{
        headers:{
          'Content-Type': 'application/json',
          'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjI3ZmY0MGVkM2UwNjA2YTc1YjkyYSIsImlhdCI6MTcyNzE2ODUwMH0.9CPqa7s35agWKPsduEETBn5rSpFNWPS6nasgGvQBlqw'
        }
      });
     // console.log(result.data);
      setOnClick((prev)=>!prev)
    } catch (error) {
      alert('failed to delete')
      console.log(error);
    }
  };


  const onClickHandlerForEdit = ()=>{
    
    navigate('/todo/edit',{state:{todo}})
  }

  return (
    <div className="bg-gray-100 text-black w-[80%]  md:w-1/3 p-4 rounded-lg flex flex-col gap-2 ">
      <h1 className="font-bold text-xl">{todo.title}</h1>
      <p className="text-gray-600 text-sm tracking-tighter">{todo.description}</p>
      <div className="flex justify-between items-center">

      <div className="flex gap-4 items-center justify-start">
        {
          todo.completed ?  <SiTicktick className="text-xl text-green-500" /> : (<>
          <button
          onClick={onClickHandler}
          className="text-white bg-gray-800 rounded-md p-1 mt-2 text-sm"
        >
           Mark as Done
        </button>
          </>) 

        }
        {/* <button
          onClick={onClickHandler}
          className="text-white bg-gray-800 rounded-md p-1 mt-2 text-sm"
        >
          {todo.completed ? "Completed" : "Mark as Done"}
        </button> */}

        <MdDeleteForever
          className="text-2xl text-red-500 cursor-pointer  mt-2"
          onClick={deleteButtonhandler}
        />
      </div>

      <p
      onClick={
       onClickHandlerForEdit
      }
      className="text-sm text-gray-500 cursor-pointer">Edit</p>
      </div>
    </div>
  );
}

export default TodoCard;
