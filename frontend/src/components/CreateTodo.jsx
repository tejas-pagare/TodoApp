import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Header from './Header';
import OpenAi from './OpenAi';

function CreateTodo() {
  const title = useRef("");
  const description = useRef("");
  const navigate = useNavigate();
  const handleButtonClick = async()=>{
    // console.log("Title: ",title.current.value);
    // console.log("Description: ",description.current.value);
    try {
    const result = await  axios.post('http://localhost:3000/api/todo/create',{
        title:title.current.value,
        description: description.current.value
      },{
        headers:{
          'Content-Type': 'application/json',
          'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjI3ZmY0MGVkM2UwNjA2YTc1YjkyYSIsImlhdCI6MTcyNzE2ODUwMH0.9CPqa7s35agWKPsduEETBn5rSpFNWPS6nasgGvQBlqw'
        }
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
    <div className='flex flex-col '>

    <div className='h-[1/2]  w-full flex items-start mt-12 justify-center'>
    <form onSubmit={(e)=>{
      e.preventDefault()
      e.target.reset()
      }} className='flex gap-4 flex-col w-[80%] sm:w-1/2 mx-auto '>
      <input ref={title} className='bg-gray-100 rounded-md outline-none p-2' type='text' placeholder='Enter Title' />
      <textarea ref={description} className='bg-gray-100 rounded-md resize-none outline-none p-2 ' rows={5}  type='text' placeholder='Enter Description'/>
      <button onClick={handleButtonClick} className='bg-black text-white font-semibold w-[150px] p-2 rounded-md mx-auto'>Add a Todo</button>
    </form>
    </div>
      <OpenAi/>
    </div>
    </>
  )
}

export default CreateTodo
