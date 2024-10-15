//This main page is used to test on implementing main page including dashboard, team, project, etc
import React from 'react';
import { useRequireAuthenticated} from '../../hooks/auth';
import SidebarPage from '../../templates/SidebarPage';

const Main: React.FC = () => {
  // add hook requiring authentication from the user.
  const displayContent = useRequireAuthenticated()
  return (
    <SidebarPage hidden={!displayContent}>
      hello dashboard
    </SidebarPage>
  );
};

export default Main;
