import { useParams } from "react-router-dom";
import UserInfoContext from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { CourseGroupTable } from "./CourseGroupTable";
import { useEffect, useState } from "react";
import { CourseDetailsResponse, GetDetailedCourseInfo } from "../../network/services/courseService";

export function CourseSummaryPage() {
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const { courseid } = useParams();
  useEffect(() => {
    GetDetailedCourseInfo(courseid || "").then(setCourseDetails)
  }, [])
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        <div className="bg-[#9B394B] p-3 h-full">
          <div className="bg-[#FCF4F5] rounded-2xl p-6 h-full">
            <div className="flex flex-col module rounded-2xl shadow-md p-4">
              <h1 className="text-2xl font-bold text-white">
                Summary View of {courseid}
              </h1>
              <CourseGroupTable></CourseGroupTable>
            </div>
          </div>
        </div>
        {/* page content here */}
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}
