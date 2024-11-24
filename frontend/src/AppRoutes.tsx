import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import TeacherSignUp from "./pages/sign-up/TeacherSignUp";
import StudentSignUp from "./pages/sign-up/StudentSignUp";
import Login from "./pages/login/Login";
import Main from "./pages/main/MainPage";
import GroupPage from "./pages/home/GroupPage";
import RatePage from "./pages/RatePage";
import { CourseDetailsPage } from "./pages/course/CourseDetailsPage";
import { CourseSummaryPage } from "./pages/course/CourseSummaryPage";
import CoursePage from "./pages/course/CoursePage";
import { UserProfilePage } from "./pages/userProfile/UserProfilePage";

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
    path: "/courses/:courseid/details",
    element: <CourseDetailsPage/>
  },
  {
    path: "/courses/:courseid/summary",
    element: <CourseSummaryPage/>
  },
  {
    path: "/groups/:groupid",
    element: <GroupPage/>
  },
  {
    path: "/ratings/:groupid/:email/new",
    element: <RatePage/>
  },
  {
    path: "/profile/:email",
    element: <UserProfilePage/>
  }
]);
