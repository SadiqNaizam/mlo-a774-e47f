import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import TaskItem from './TaskItem';

interface TaskListProps {
  className?: string;
}

/**
 * TaskList component serves as a container for displaying a list of tasks.
 * It uses a Card component to simulate a notepad and renders a predefined number of TaskItem components.
 */
const TaskList: React.FC<TaskListProps> = ({ className }) => {
  // Define a static number of task placeholders to render
  const taskCount = 5;

  return (
    <div className={cn('w-full', className)}>
      <Card className="bg-card shadow-lg rounded-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col">
            {Array.from({ length: taskCount }, (_, i) => i + 1).map((taskNumber, index) => (
              <TaskItem
                key={taskNumber}
                number={taskNumber}
                // Remove the bottom border from the very last item for a cleaner look
                className={cn(index === taskCount - 1 && 'border-b-0')}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;
