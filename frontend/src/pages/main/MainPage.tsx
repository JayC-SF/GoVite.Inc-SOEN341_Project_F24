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
          <div className="bg-[#9B394B] p-3 h-full">
            <div className='bg-[#FCF4F5] h-full rounded-2xl p-6'>
              <GroupsModule />
            </div>
          </div>
        </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
};

export default Main