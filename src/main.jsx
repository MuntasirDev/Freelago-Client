import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// ⭐ ফিক্স: react-router-dom প্যাকেজ থেকে RouterProvider আমদানি করা হলো ⭐
import { RouterProvider } from "react-router-dom"; 

import { router } from './Router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      {/* RouterProvider কে Self-closing ট্যাগ হিসেবে ব্যবহার করা হলো */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)