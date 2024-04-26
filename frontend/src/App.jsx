import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from  './components/Home';
import './App.css'
import axios from 'axios'
import { Students } from './components/Students';
import { AddStudent } from './components/AddStudent';
import { Attendance } from './components/Attendance';
import { Profile } from './components/Profile';




function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Home/>,
      
    },
    {
      path:"Students",
      element:<Students/>
    },
    {
      path:'/AddStudent',
      element:<AddStudent/>
    },
    {
      path: "/Attendance",
      element:<Attendance/>
    },
    {
      path: "/Profile",
      element: <Profile/>
    }
  ]);

  return (
    <>
    
     <RouterProvider router={router} />
    </>
  )
}



export default App
