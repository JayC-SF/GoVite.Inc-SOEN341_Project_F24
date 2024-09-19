import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignInPage from './pages/sign-in/SignInPage'

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/sign-in",
        element: <SignInPage/>
    }
])