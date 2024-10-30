import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CourseInfoResponse, GetCourseInfo } from "../network/services/courseService"
import UserInfoContext from "../contexts/userinfo"
import SidebarPageTemplate from "../templates/SidebarPageTemplate"
import { useRequireAuthenticated } from "../hooks/auth"
import { useUserInfo } from "../hooks/useUserInfo"

export default function CoursePage() {
    const { courseid } = useParams()
      const displayContent = useRequireAuthenticated()

    const [courseInfo, setCourseInfo] = useState<CourseInfoResponse>()
    const userInfo = useUserInfo()
    console.log(courseid)
    useEffect(() => {
        GetCourseInfo(courseid || "").then(setCourseInfo)
    }, [])
    return (
        <UserInfoContext.Provider value={userInfo}>
        <SidebarPageTemplate hidden={!displayContent}>
            <pre>{JSON.stringify(courseInfo, null, 2)}</pre>
        </SidebarPageTemplate>
    </UserInfoContext.Provider>
    )
}