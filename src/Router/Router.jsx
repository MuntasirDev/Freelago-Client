// src/router.jsx

import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layout and Page Imports
import Mainlayouts from "../Layouts/Mainlayouts";
import Home from "../Pages/Home";
import BrowseTasks from "../Pages/BrowseTask";
import AddTask from "../Pages/AddTask";
import MyPostedTask from "../Pages/MyPostedTask";
import TaskDetails from "../Pages/TaskDetails";

// Auth Imports
import Auth from "../Auth/Auth";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import { initialTasks } from "../Components/JobCard";
import MyProfile from "../Pages/MyProfile";
import UpdateTask from "../Pages/UpdateTask";

const browseTasksLoader = async () => {
  const API_URL = "https://freelago-backend.vercel.app/tasks";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      console.warn(
        `API call failed with status ${response.status}. Serving mock tasks.`
      );
      return initialTasks;
    }

    const tasks = await response.json();

    const mappedTasks = tasks.map((task) => ({
      ...task,
      id: task._id || task.id,
    }));

    if (!mappedTasks || mappedTasks.length === 0) {
      console.log("No tasks found in DB. Serving mock tasks.");
      return initialTasks;
    }

    return mappedTasks;
  } catch (error) {
    console.error(
      "Browse Tasks Loader Network Error. Serving mock tasks:",
      error
    );
    return initialTasks;
  }
};

const taskDetailsLoader = async ({ params }) => {
  const taskId = params.id;
  const API_URL = `https://freelago-backend.vercel.app/tasks/${taskId}`;

  try {
 
    const response = await fetch(API_URL);

    if (!response.ok) {
      console.warn(
        `API call failed with status ${response.status} for task ID: ${taskId}.`
      );

      const mockTask = initialTasks.find((task) => task.id === taskId);
      return mockTask || null;
    }

    const task = await response.json();

    if (!task || Object.keys(task).length === 0) {
      console.log(`Task not found in DB for ID: ${taskId}.`);
      return null;
    }

    if (task._id) {
      task.id = task._id;
    }

    return task;
  } catch (error) {
    console.error(
      `Task Details Loader Network Error for ID ${taskId}. Returning null:`,
      error
    );

    const mockTask = initialTasks.find((t) => t.id === taskId);
    return mockTask || null;
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "browse-tasks",
        element: (
          <PrivateRoute>
            <BrowseTasks />
          </PrivateRoute>
        ),
        loader: browseTasksLoader,
      },

      {
        path: "add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <MyPostedTask />
          </PrivateRoute>
        ),
      },
      {
        path: "task/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
        loader: taskDetailsLoader,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateTask></UpdateTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
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
