//This main page is used to test on implementing main page including dashboard, team, project, etc
import React from 'react';
import { Sidebar } from './Sidebar';
import Dashboard from './Dashboard';
import { useRequireAuthenticated} from '../../hooks/auth';

const Main: React.FC = () => {
  // add hook requiring authentication from the user.
  const displayContent = useRequireAuthenticated()
  return (
    displayContent &&
    <main className='grid gap-4 p-4 grid-cols-[200px,_1fr] bg-stone-100 text-stone-950 rounded-lg'>
      <Sidebar />
      <Dashboard />
    </main>

  );
};

export default Main;
