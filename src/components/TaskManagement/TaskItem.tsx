import React from 'react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  number: number;
  className?: string;
}

/**
 * TaskItem represents a single row in the to-do list.
 * It displays a number and a line, simulating a lined-paper format for user input.
 */
const TaskItem: React.FC<TaskItemProps> = ({ number, className }) => {
  return (
    <div className={cn('flex w-full items-center gap-4 border-b border-muted py-4', className)}>
      <span className="text-2xl font-bold text-foreground">{number}.</span>
      {/* This div acts as a placeholder for the task content area */}
      <div className="flex-grow" /> 
    </div>
  );
};

export default TaskItem;
