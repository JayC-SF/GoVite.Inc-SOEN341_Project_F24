import { useParams } from "react-router-dom";
import UserInfoContext, { UserInfo } from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { useEffect, useState } from "react";
import { GetUserInfo } from "../../network/services/commonService";

export function UserProfilePage() {
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const { email } = useParams();
  const [userProfile, setUserProfile] = useState<UserInfo>()
  useEffect(() => { 
    GetUserInfo(email || "").then(setUserProfile)
  }, [])
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        {/* page content here */}
        {JSON.stringify(userProfile, null, 2)}
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}