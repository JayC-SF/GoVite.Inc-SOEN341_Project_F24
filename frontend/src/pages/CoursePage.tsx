import { ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CourseInfoResponse, GetCourseInfo, Group } from "../network/services/courseService"
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

    const onAddGroup = (group: Group) => {
        // send post request to add a new group

        GetCourseInfo(courseid || "").then((res) => {
            setCourseInfo(res)
            console.log(res)
        })
    }
    
    useEffect(() => {
        GetCourseInfo(courseid || "").then(setCourseInfo)
    }, [])

    let content: ReactNode
    if (userInfo?.role == "student") {
        content = <StudentCourseGroups courseInfo={courseInfo} />
    } else if (userInfo?.role == "teacher") {
        content = <TeacherCourseGroups courseInfo={courseInfo} onAddGroup={onAddGroup}/>
    }
    // if the user is not defined render nothing and wait for user to be defined
    return (
        <UserInfoContext.Provider value={userInfo}>
        <SidebarPageTemplate hidden={!displayContent}>
            {/* have different code for teachers and students */}
            {content}
        </SidebarPageTemplate>
    </UserInfoContext.Provider>
    )
}