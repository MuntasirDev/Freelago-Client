import React from 'react';
import { createBrowserRouter } from "react-router";
import Mainlayouts from '../Layouts/Mainlayouts';
import Home from '../Pages/Home';
import BrowseTasks from '../Pages/BrowseTask';
import AddTask from '../Pages/AddTask';
import MyPostedTask from '../Pages/MyPostedTask';

export const router = createBrowserRouter([
  {
    path: "/",
   element: <Mainlayouts></Mainlayouts>,
   children: [

    {
index: true,
      element: <Home />,
    },
    {
      path: "browse-tasks",
      element: <BrowseTasks></BrowseTasks>
    },
    {
      path:"/add-task",
      element: <AddTask></AddTask>
    },{
      path:"/my-tasks",
      element: <MyPostedTask></MyPostedTask>
    }
      

   ]
  },
]);
