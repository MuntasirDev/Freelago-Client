import React from 'react';
import { createBrowserRouter } from "react-router-dom"; // Import from react-router-dom
import Mainlayouts from '../Layouts/Mainlayouts';
import Home from '../Pages/Home';
import BrowseTasks from '../Pages/BrowseTask';
import AddTask from '../Pages/AddTask';
import MyPostedTask from '../Pages/MyPostedTask';
import TaskDetails from '../Pages/TaskDetails';
import Auth from '../Auth/Auth';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayouts />, // Must be a JSX element
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "browse-tasks",
        element: <BrowseTasks />,
      },
      {
        // FIX: Removed leading '/'
        path: "add-task", 
        element: <AddTask />,
      },
      {
        path: "my-tasks",
        element: <MyPostedTask />,
      },
      {
        path: "task/:id",
        element: <TaskDetails />,
      },
    ],
  },
  
  
  {
    path: "/auth",
    element: <Auth />, 
    children: [
      {
        
        path: "login", 
        element: <Login />, 
      },
      {
       
        path: "register", 
        element: <Register />, 
      },
    ],
  },
]);