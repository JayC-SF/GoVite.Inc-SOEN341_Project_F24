import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home/HomePage'

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <p>hi there login works</p>
    }
])