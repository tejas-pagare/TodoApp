import React from 'react'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'
import Header from './components/Header'
import {createBrowserRouter,RouterProvider,Router} from 'react-router-dom'
import EditTodo from './components/EditTodo'
import RegisterationPage from './components/RegisterationPage'
 
function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/create-todo',
      element:<CreateTodo/>
    },{
      path:'/',
      element:<Todos/>
    },{
      path:'/todo/edit',
      element:<EditTodo/>
    },
    {
      path:"/register",
      element:<RegisterationPage/>
    }
  ])
  return (
    <RouterProvider router={appRouter}/>


  )
}

export default App
