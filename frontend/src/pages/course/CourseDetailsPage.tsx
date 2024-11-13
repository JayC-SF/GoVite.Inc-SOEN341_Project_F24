import { useParams } from "react-router-dom";
import UserInfoContext from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { CourseDetailsResponse, GetDetailedCourseInfo } from "../../network/services/courseService";
import { useEffect, useState } from "react";

export function CourseDetailsPage() {
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const { courseid } = useParams();
  const [courseDetails, setCourseDetails] = useState<CourseDetailsResponse>()
  useEffect(() => {
    GetDetailedCourseInfo(courseid || "").then(setCourseDetails)
  }, [])
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        {/* page content here */}
        {courseid}
        <pre>
          {JSON.stringify(courseDetails, null, 2)}
        </pre>
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}
