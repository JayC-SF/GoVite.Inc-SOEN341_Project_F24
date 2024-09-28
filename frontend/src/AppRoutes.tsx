import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import TeacherSignUp from "./pages/sign-up/TeacherSignUp";
import StudentSignUp from "./pages/sign-up/StudentSignUp";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-up/student",
    element: <StudentSignUp />,
  },
  {
    path: "/sign-up/teacher",
    element: <TeacherSignUp />,
  },
]);
