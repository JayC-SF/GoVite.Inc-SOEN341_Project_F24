import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'

export default function App() {

  return (
    <React.StrictMode>
        <RouterProvider router={AppRoutes} />
    </React.StrictMode>
  )
}
