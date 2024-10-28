//This main page is used to test on implementing main page including dashboard, team, project, etc
import React from 'react';
import { useRequireAuthenticated } from '../../hooks/auth';
import SidebarPageTemplate from '../../templates/SidebarPageTemplate';
import UserInfoContext from '../../contexts/userinfo';
import { useUserInfo } from '../../hooks/useUserInfo';
import GroupsModule from '../../modules/GroupsModule';

const Main: React.FC = () => {
  // add hook requiring authentication from the user.
  const displayContent = useRequireAuthenticated()
  const userInfo = useUserInfo()

  return (
    <UserInfoContext.Provider value={userInfo}>
        <SidebarPageTemplate hidden={!displayContent}>
            {userInfo && (
                <div className="p-6 space-y-6">
                    <GroupsModule />
                </div>
            )}
        </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
};

export default Main