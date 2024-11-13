import { useParams } from "react-router-dom";
import UserInfoContext from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { CourseDetailedView } from "./CourseDetailedView";

export function CourseDetailsPage() {
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const { courseid } = useParams();

  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        <div className="bg-[#9B394B] p-3 min-h-full">
          <div className="bg-[#FCF4F5] rounded-2xl p-6 h-full">
            <div className="flex flex-col module rounded-2xl shadow-md p-4">
              <h1 className="text-2xl font-bold text-white">
                Detailed View of {courseid}
              </h1>
              <CourseDetailedView></CourseDetailedView>
            </div>
          </div>
        </div>
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}
