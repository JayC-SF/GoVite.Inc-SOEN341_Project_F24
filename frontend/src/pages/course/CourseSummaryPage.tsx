import { useParams } from "react-router-dom";
import UserInfoContext from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { CourseGroupTable } from "./CourseGroupTable";
import { useState, useEffect } from "react";
import { DownloadCSVButton } from "../../components/DownloadCSVButton";

export function CourseSummaryPage() {
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [isTableRendered, setIsTableRendered] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Access the courses array and find the course with the matching courseid
        const course = (Array.isArray(data.courses) ? data.courses : [])
          .find((course: { courseid: string | undefined; }) => course.courseid === courseid);

        // Set the coursecode or null if no match was found
        setCourseCode(course ? course.coursecode : null);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const { courseid } = useParams();

  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        <div className="bg-[#9B394B] p-3 min-h-full">
          <div className="bg-[#FCF4F5] rounded-2xl p-6 min-h-full">
            <div className="flex flex-col module rounded-2xl shadow-md p-4">
              <h1 className="text-2xl font-bold text-white">
                Summary View of {courseCode}
              </h1>
              <CourseGroupTable courseid={courseid || ""} 
              onTableRendered={() => setIsTableRendered(true)}/>
              {isTableRendered && <DownloadCSVButton courseid={courseid || ""} />}
            </div>
          </div>
        </div>
        {/* page content here */}
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}
