import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function EditTodo() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  
  // Initialize the state with the values from the location state
  const [title, setTitle] = useState(state?.todo?.title || '');
  const [description, setDescription] = useState(state?.todo?.description || '');

  const onSaveHandler = async() => {
    console.log("Title: ", title);
    console.log("Description: ", description);

    try {
      const response = await axios.patch(`http://localhost:3000/api/todo/${state?.todo?._id}/edit`, {
        title: title,
        description: description
      },
      {
        headers: {
            'Content-Type': 'application/json',
            'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjI3ZmY0MGVkM2UwNjA2YTc1YjkyYSIsImlhdCI6MTcyNzE2ODUwMH0.9CPqa7s35agWKPsduEETBn5rSpFNWPS6nasgGvQBlqw'
        },
    }
    );
      
      console.log(response);
      console.log(response.data);
      navigate("/")
      
    } catch (error) {
      alert('error Try again');

    }
  }

  return (
    <div className='h-screen w-full flex items-start mt-24 justify-center'>
      <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-4 w-[80%] mx-auto '>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className='bg-gray-100 rounded-md p-2 w-[300px] sm:w-[500px] mx-auto outline-none ' 
          type="text" 
          name="title" 
          placeholder="Enter Todo Title" 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className='bg-gray-100 rounded-md p-2 resize-none w-[300px] sm:w-[500px] mx-auto outline-none' 
          rows={5} 
          type="text" 
          name="description" 
          placeholder="Enter Todo Description" 
        />
        <button
          onClick={onSaveHandler}
          className='bg-green-600 text-white w-[100px] mx-auto p-2 rounded-md' 
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditTodo;
