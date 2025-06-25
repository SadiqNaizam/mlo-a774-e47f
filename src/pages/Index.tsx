import React, { useState } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/TaskManagement/PageHeader';
import TaskList from '../components/TaskManagement/TaskList';
import { FingerprintAuth } from '@/components/auth/FingerprintAuth';

/**
 * IndexPage serves as the main entry point for the To-Do List application.
 * It composes the overall page structure by using the MainAppLayout,
 * populating the header with the PageHeader component and the main content
 * area with the TaskList component.
 * It's protected by a simulated fingerprint authentication screen.
 */
const IndexPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <FingerprintAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <MainAppLayout
      headerContent={<PageHeader />}
    >
      <TaskList />
    </MainAppLayout>
  );
};

export default IndexPage;