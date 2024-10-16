//This main page is used to test on implementing main page including dashboard, team, project, etc
import React from 'react';
import { useRequireAuthenticated} from '../../hooks/auth';
import SidebarPageTemplate from '../../templates/SidebarPageTemplate';

const Main: React.FC = () => {
  // add hook requiring authentication from the user.
  const displayContent = useRequireAuthenticated()
  return (
    <SidebarPageTemplate hidden={!displayContent}>
      hello dashboard
    </SidebarPageTemplate>
  );
};

export default Main;
