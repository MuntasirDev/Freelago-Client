// src/router.jsx

import React from 'react';
import { createBrowserRouter } from "react-router-dom";

// Layout and Page Imports
import Mainlayouts from '../Layouts/Mainlayouts';
import Home from '../Pages/Home';
import BrowseTasks from '../Pages/BrowseTask';
import AddTask from '../Pages/AddTask';
import MyPostedTask from '../Pages/MyPostedTask';
import TaskDetails from '../Pages/TaskDetails';

// Auth Imports
import Auth from '../Auth/Auth';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PrivateRoute from '../Provider/PrivateRoute'; 
import { initialTasks } from '../Components/JobCard'; 

// --- Loader Functions ---

// 1. Loader for all tasks (BrowseTasks)
const browseTasksLoader = async () => {
    const API_URL = 'http://localhost:3000/tasks';
    
    try {
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
            console.warn(`API call failed with status ${response.status}. Serving mock tasks.`);
            return initialTasks; 
        }
        
        const tasks = await response.json();
        
        // MongoDB _id to React 'id' mapping for all tasks
        const mappedTasks = tasks.map(task => ({
            ...task,
            id: task._id || task.id // নিশ্চিত করছি যে id ব্যবহার করা হচ্ছে
        }));
        
        // Check if the database is empty
        if (!mappedTasks || mappedTasks.length === 0) {
            console.log("No tasks found in DB. Serving mock tasks.");
            return initialTasks; 
        }
        
        return mappedTasks; // Mapped data return
        
    } catch (error) {
        console.error("Browse Tasks Loader Network Error. Serving mock tasks:", error);
        return initialTasks; // Return mock data for network/connection errors
    }
}


// 2. Loader for single task (TaskDetails) - এই অংশটি ফিক্স করা হয়েছে
const taskDetailsLoader = async ({ params }) => {
    // URL থেকে টাস্ক আইডি গ্রহণ
    const taskId = params.id; 
    const API_URL = `http://localhost:3000/tasks/${taskId}`;
    
    try {
        // নির্দিষ্ট টাস্কের জন্য API কল
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            console.warn(`API call failed with status ${response.status} for task ID: ${taskId}.`);
            
            // API ব্যর্থ হলে mock data থেকে খোঁজা
            const mockTask = initialTasks.find(task => task.id === taskId);
            return mockTask || null; 
        }
        
        const task = await response.json();
        
        // যদি ডাটাবেস থেকে টাস্কটি না পাওয়া যায়
        if (!task || Object.keys(task).length === 0) {
             console.log(`Task not found in DB for ID: ${taskId}.`);
             return null;
        }

        // ⭐ সমাধান: MongoDB _id কে TaskDetails-এর জন্য 'id' হিসেবে ম্যাপ করা হলো ⭐
        // এটি নিশ্চিত করবে যে task.id (TaskDetails.jsx এ ব্যবহৃত) সঠিক মান পাবে।
        if (task._id) {
            task.id = task._id;
        }

        return task; // একটি একক টাস্ক অবজেক্ট রিটার্ন করবে, যেখানে এখন 'id' প্রপার্টি আছে
        
    } catch (error) {
        console.error(`Task Details Loader Network Error for ID ${taskId}. Returning null:`, error);
        // যদি নেটওয়ার্ক সমস্যা হয়, তবে মক ডেটা থেকেও খুঁজে দেখা যেতে পারে (যদি আপনি চান)
        const mockTask = initialTasks.find(t => t.id === taskId);
        return mockTask || null;
    }
}

// --- Main Router Configuration ---
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayouts />, 
        children: [
            {
                index: true,
                element: <Home />,
            },
            
            // Task Browsing Route (Uses Loader)
            {
                path: "browse-tasks",
                element: <PrivateRoute><BrowseTasks /></PrivateRoute>,
                loader: browseTasksLoader, 
            },
            
            // Task Management Routes
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
                loader: taskDetailsLoader, // Loader attached
            },
        ],
    },
    
    // Authentication Routes
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