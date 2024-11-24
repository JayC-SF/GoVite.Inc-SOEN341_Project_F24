import { useParams } from "react-router-dom";
import UserInfoContext from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";

export function UserProfilePage() {
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const { email } = useParams();
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        {/* page content here */}
        {email}
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}