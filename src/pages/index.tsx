import React, { useState } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/TaskManagement/PageHeader';
import TaskList from '../components/TaskManagement/TaskList';
import { FingerprintAuth } from '@/components/auth/fingerprintauth';
import { FaceAuth } from '@/components/auth/faceauth';

/**
 * IndexPage serves as the main entry point for the To-Do List application.
 * It composes the overall page structure by using the MainAppLayout,
 * populating the header with the PageHeader component and the main content
 * area with the TaskList component.
 * It's protected by a simulated two-step authentication screen (fingerprint and face).
 */

type AuthStep = 'fingerprint' | 'face' | 'authenticated';

const IndexPage: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>('fingerprint');

  if (authStep === 'fingerprint') {
    return <FingerprintAuth onAuthenticated={() => setAuthStep('face')} />;
  }

  if (authStep === 'face') {
    return <FaceAuth onAuthenticated={() => setAuthStep('authenticated')} />;
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