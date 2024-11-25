import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfoContext, { UserInfo } from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import { StudentCourseGroups } from "../../modules/StudentCourseGroups";
import { TeacherCourseGroups } from "../../modules/TeacherCourseGroups";
import {
  CourseInfoResponse,
  GetCourseInfo,
} from "../../network/services/courseService";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { GetUserInfo } from "../../network/services/commonService";
import { CourseInstructorInfo } from "../../modules/CourseInstructorInfo";

export default function CoursePage() {
  const { courseid } = useParams();
  const displayContent = useRequireAuthenticated();

  const [courseInfo, setCourseInfo] = useState<CourseInfoResponse>();
  const [teacherInfo, setTeacherInfo] = useState<UserInfo>()
  const userInfo = useUserInfo();

  const refreshGroups = () => {
    // send post request to add a new group
    GetCourseInfo(courseid || "").then((courseInfo => {
      setCourseInfo(courseInfo)
      GetUserInfo(courseInfo.course.teacher).then(setTeacherInfo)
    }));
  };

  useEffect(() => {
    refreshGroups();
  }, []);
  // if the user is not defined render nothing and wait for user to be defined
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        <div className="bg-[#9B394B] p-3 min-h-full">
          <div className="bg-[#FCF4F5] rounded-2xl p-6 min-h-full">
            <div className="module rounded-2xl shadow-md p-4 flex items-center">
              <div className="pl-8 flex-1">
                <h1 className="text-2xl font-bold text-white">
                  {courseInfo?.course?.coursecode}-
                  {courseInfo?.course?.coursename}
                </h1>
                <p className="text-sm text-gray-200 ml-2 mt-3">
                  {courseInfo?.course?.coursedescription}
                </p>
              </div>
              <img
                src="/src/assets/books.png"
                alt="Welcome"
                className="pr-12 w-[250px] h-40 object-contain"
              />
            </div>
            <div className="module mt-5 rounded-2xl shadow-md p-4 flex items-center">
              <div className="pl-8 flex-1 text-white">
                {teacherInfo && <CourseInstructorInfo {...teacherInfo} />}
                {userInfo?.role == "teacher" && (
                  <TeacherCourseGroups
                    courseInfo={courseInfo}
                    refreshGroups={refreshGroups}
                  />
                )}
                {userInfo?.role == "student" && (
                  <StudentCourseGroups courseInfo={courseInfo} />
                )}
              </div>
            </div>
            {userInfo?.role == "teacher" && (
              <div className="flex gap-4 mt-5 ml-2">
                <button className="bg-[#9B394B] text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
                  <a href={`/courses/${courseid}/summary`}>
                    Summary of results
                  </a>
                </button>
                <button className="bg-[#9B394B] text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
                  <a href={`/courses/${courseid}/details`}>
                    Details of results
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}
