import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/sign-up/SignUpPage";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);
