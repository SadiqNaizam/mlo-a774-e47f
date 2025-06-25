import React, { useState } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/TaskManagement/PageHeader';
import TaskList from '../components/TaskManagement/TaskList';
import { FingerprintAuth } from '@/components/auth/fingerprintauth';
import { FaceAuth } from '@/components/auth/faceauth';

/**
 * Represents a single to-do task.
 */
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

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
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Finish MLO project report', completed: false },
    { id: 2, text: 'Buy groceries for the week', completed: false },
    { id: 3, text: 'Schedule dentist appointment', completed: true },
  ]);

  const handleAddTask = (text: string) => {
    if (text.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTaskComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleEditTask = (id: number, newText: string) => {
     if (newText.trim() === '') return;
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };


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
      <TaskList 
        tasks={tasks}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTaskComplete}
        onEditTask={handleEditTask}
      />
    </MainAppLayout>
  );
};

export default IndexPage;