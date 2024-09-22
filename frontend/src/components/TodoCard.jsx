import axios from "axios";
import React from "react";
import { MdDeleteForever } from "react-icons/md";

function TodoCard({ todo ,setOnClick}) {
  const onClickHandler = async () => {
    if (todo.completed) {
      return alert("You have complted the task");
    }
    try {
      
      const result = await axios.put("http://localhost:3000/completed", {
        id: todo._id,
      });
      setOnClick((prev)=>!prev)
    } catch (error) {
      console.log(error);
    }
   // console.log(result);
  };

  const deleteButtonhandler = async () => {
    try {
      const result = await axios.delete("http://localhost:3000/delete", {
       data:{ id: todo._id,}
      });
     // console.log(result.data);
      setOnClick((prev)=>!prev)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 text-black w-[80%]  md:w-1/3 p-4 rounded-lg">
      <h1 className="font-bold text-xl">{todo.title}</h1>
      <p className="text-gray-600 text-sm">{todo.description}</p>
      <div className="flex gap-4 items-center justify-start">
        <button
          onClick={onClickHandler}
          className="text-white bg-black rounded-md p-1 mt-2"
        >
          {todo.completed ? "Completed" : "Mark as Done"}
        </button>

        <MdDeleteForever
          className="text-2xl text-red-500 cursor-pointer  mt-2"
          onClick={deleteButtonhandler}
        />
      </div>
    </div>
  );
}

export default TodoCard;
