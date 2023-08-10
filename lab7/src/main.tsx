import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes';
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from './context/auth-context';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
      </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)
