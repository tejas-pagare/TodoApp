import React from 'react'

function Header() {
  return (
    <div className='py-2 px-6 flex justify-between items-center '>
      <h1 className='text-black text-2xl  font-bold'>
        myTodos
      </h1>
      <button className='px-2 bg-gray-800 py-1 rounded-md text-white '>
        Sign Out
      </button>
    </div>
  )
}

export default Header
