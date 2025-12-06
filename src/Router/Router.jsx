import React from 'react';
import { createBrowserRouter } from "react-router";
import Mainlayouts from '../Layouts/Mainlayouts';
import Home from '../Pages/Home';

export const router = createBrowserRouter([
  {
    path: "/",
   element: <Mainlayouts></Mainlayouts>,
   children: [

    {
index: true,
      element: <Home />,
    }
      

   ]
  },
]);
