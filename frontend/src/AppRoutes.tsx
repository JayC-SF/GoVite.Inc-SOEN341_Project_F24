import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/sign-up/SignUpPage";

import Dashboard from "./pages/home/Dashboard";
import Main from "./pages/home/MainPage";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/main",
    element: <Main/>
  }
]);
