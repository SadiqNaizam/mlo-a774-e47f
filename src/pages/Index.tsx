import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/TaskManagement/PageHeader';
import TaskList from '../components/TaskManagement/TaskList';

/**
 * IndexPage serves as the main entry point for the To-Do List application.
 * It composes the overall page structure by using the MainAppLayout,
 * populating the header with the PageHeader component and the main content
 * area with the TaskList component.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout
      headerContent={<PageHeader />}
    >
      <TaskList />
    </MainAppLayout>
  );
};

export default IndexPage;
