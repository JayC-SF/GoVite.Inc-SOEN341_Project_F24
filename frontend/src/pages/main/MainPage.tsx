//This main page is used to test on implementing main page including dashboard, team, project, etc
import React from 'react';
import { useRequireAuthenticated } from '../../hooks/auth';
import SidebarPageTemplate from '../../templates/SidebarPageTemplate';
import UserInfoContext from '../../contexts/userinfo';
import { useUserInfo } from '../../hooks/useUserInfo';

const Main: React.FC = () => {
  // add hook requiring authentication from the user.
  const displayContent = useRequireAuthenticated()
  const userInfo = useUserInfo()

  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        {userInfo && <p>Hi! {userInfo?.firstname} {userInfo?.lastname} your email is {userInfo?.email} and your role is {userInfo?.role}</p>}
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
};

export default Main;
