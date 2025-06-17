import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './Router/Router.jsx'
import AuthProvider from './AuthProvider/AuthContext/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  
 <HelmetProvider>
   <AuthProvider>
        <Toaster position="top-center" />
      <RouterProvider router={Router}></RouterProvider>
  </AuthProvider>
 </HelmetProvider>
 
)
