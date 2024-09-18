import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'

/**
 * Entry point of the web application.
 */
export default function App() {
  // Use react router to send the user to the right page based on the current route
  return (
    <React.StrictMode>
        <RouterProvider router={AppRoutes} />
    </React.StrictMode>
  )
}
