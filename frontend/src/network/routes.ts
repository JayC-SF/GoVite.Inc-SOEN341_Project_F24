export const AuthRoutes = {
    isLoggedIn: "/api/isloggedin",
    logout: "/api/logout",
    login: "/api/login",
    signup:"/api/sign-up"
} as const

export const StudentsRoutes = {
    students: "/api/students",
} as const

export const UsersRoutes = { 
    userinfo: "/api/userinfo"
}

export const CourseRoutes = {
    courseInfo: "/api/courses/courseinfo"
}

export const RatingsRoutes = {
    submitRating: "/api/submitRating"
}

export const GroupsRoutes = {
    addgroup: "/api/addgroup"
}
