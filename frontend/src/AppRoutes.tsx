import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import TeacherSignUp from "./pages/sign-up/TeacherSignUp";
import StudentSignUp from "./pages/sign-up/StudentSignUp";
import Login from "./pages/login/Login";
import Main from "./pages/main/MainPage";
import CoursePage from "./pages/CoursePage";
import GroupPage from "./pages/home/GroupPage";

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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Main/>
  },
  {
    path: "/courses/:courseid",
    element: <CoursePage/>
  },
  {
    path: "/groups/:groupid",
    element: <GroupPage/>
  }
]);
