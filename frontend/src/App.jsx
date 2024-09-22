import React from 'react'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'
import Header from './components/Header'
import {createBrowserRouter,RouterProvider,Router} from 'react-router-dom'
 
function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/create-todo',
      element:<CreateTodo/>
    },{
      path:'/',
      element:<Todos/>
    }
  ])
  return (
    <RouterProvider router={appRouter}/>


  )
}

export default App
