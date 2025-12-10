// src/router.jsx (Final)

import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Mainlayouts from '../Layouts/Mainlayouts';
import Home from '../Pages/Home';
import BrowseTasks from '../Pages/BrowseTask';
import AddTask from '../Pages/AddTask';
import MyPostedTask from '../Pages/MyPostedTask';
import TaskDetails from '../Pages/TaskDetails';
import Auth from '../Auth/Auth';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PrivateRoute from '../Provider/PrivateRoute'; 

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayouts />, 
        children: [
            {
                index: true,
                element: <Home />,
            },
            // /browse-tasks সুরক্ষিত করা হয়েছে। লগ আউট থাকলে PrivateRoute এটি /auth/register এ রিডাইরেক্ট করবে।
            {
                path: "browse-tasks",
                element: <PrivateRoute><BrowseTasks /></PrivateRoute>,
            },
            // এই রুটগুলি সুরক্ষিত। লগ আউট থাকলে PrivateRoute এটি /auth/login এ রিডাইরেক্ট করবে।
            {
                path: "add-task", 
                element: <PrivateRoute><AddTask /></PrivateRoute>,
            },
            {
                path: "my-tasks",
                element: <PrivateRoute><MyPostedTask /></PrivateRoute>,
            },
            {
                path: "task/:id",
                element: <PrivateRoute><TaskDetails /></PrivateRoute>,
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