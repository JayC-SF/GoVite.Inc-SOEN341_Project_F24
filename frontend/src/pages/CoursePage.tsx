import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CourseInfoResponse, GetCourseInfo } from "../network/services/courseService"
import UserInfoContext from "../contexts/userinfo"
import SidebarPageTemplate from "../templates/SidebarPageTemplate"
import { useRequireAuthenticated } from "../hooks/auth"
import { useUserInfo } from "../hooks/useUserInfo"
import { TeacherCourseGroups } from "../modules/TeacherCourseGroups"
import { StudentCourseGroups } from "../modules/StudentCourseGroups"

export default function CoursePage() {
    const { courseid } = useParams()
      const displayContent = useRequireAuthenticated()

    const [courseInfo, setCourseInfo] = useState<CourseInfoResponse>()
    const userInfo = useUserInfo()

    const refreshGroups = () => {
        // send post request to add a new group

        GetCourseInfo(courseid || "").then((res) => {
            setCourseInfo(res)
        })
    }
    
    useEffect(() => {
        refreshGroups()
    }, [])
    // if the user is not defined render nothing and wait for user to be defined
    return (
        <UserInfoContext.Provider value={userInfo}>
        <SidebarPageTemplate hidden={!displayContent}>
            <div className="p-5">
                {/* have different code for teachers and students */}
            <h1 className="text-4xl">
                {courseInfo?.course?.coursename}
            </h1>
            {userInfo?.role =="teacher" && <TeacherCourseGroups courseInfo={courseInfo} refreshGroups={refreshGroups}/>}
            {userInfo?.role =="student" && <StudentCourseGroups courseInfo={courseInfo} />}
            </div>
        </SidebarPageTemplate>
    </UserInfoContext.Provider>
    )
}