import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Header from './Header';

function CreateTodo() {
  const title = useRef("");
  const description = useRef("");
  const navigate = useNavigate();
  const handleButtonClick = async()=>{
    console.log("Title: ",title.current.value);
    console.log("Description: ",description.current.value);
    try {
    const result = await  axios.post('http://localhost:3000/todo',{
        title:title.current.value,
        description: description.current.value
      })
     // console.log(result);
     navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <>
    <Header/>
    <div className='h-screen  w-full flex items-start mt-12 justify-center'>
    <form onSubmit={(e)=>{
      e.preventDefault()
      e.target.reset()
      }} className='flex gap-4 flex-col w-[80%] md:w-1/3 mx-auto '>
      <input ref={title} className='bg-gray-200 rounded-md outline-none p-2' type='text' placeholder='Enter Title' />
      <textarea ref={description} className='bg-gray-200 rounded-md resize-none outline-none p-2 ' rows={5}  type='text' placeholder='Enter Description'/>
      <button onClick={handleButtonClick} className='bg-black text-white font-semibold w-[150px] p-2 rounded-md mx-auto'>Add a Todo</button>
    </form>

    </div>
    </>
  )
}

export default CreateTodo
