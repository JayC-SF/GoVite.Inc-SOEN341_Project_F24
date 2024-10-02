import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import Dashboard from './pages/home/Dashboard'
import Main from './pages/home/MainPage'

/**
 * Entry point of the web application.
 */
export default function App() {
  // Use react router to send the user to the right page based on the current route
  return (
    <React.StrictMode>
        <RouterProvider router={AppRoutes} />
    </React.StrictMode>

    //Add this one for working with main page purposes.
    // <Main/>
  )
}
