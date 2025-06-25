import React, { useState, useEffect } from 'react';
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

  const [tasks, setTasks] = useState<Task[]>(() => {
    // Lazy initializer to load tasks from localStorage on first render
    if (typeof window === 'undefined') {
      // Return default tasks if not in a browser environment
      return [
        { id: 1, text: 'Finish MLO project report', completed: false },
        { id: 2, text: 'Buy groceries for the week', completed: false },
        { id: 3, text: 'Schedule dentist appointment', completed: true },
      ];
    }
    try {
      const savedTasks = window.localStorage.getItem('tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
    }
    // Fallback to default tasks
    return [
      { id: 1, text: 'Finish MLO project report', completed: false },
      { id: 2, text: 'Buy groceries for the week', completed: false },
      { id: 3, text: 'Schedule dentist appointment', completed: true },
    ];
  });

  // Effect to save tasks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage', error);
      }
    }
  }, [tasks]);


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