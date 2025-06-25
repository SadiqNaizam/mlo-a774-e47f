import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TaskItem from './TaskItem';
import type { Task } from '@/pages/index';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
  onEditTask: (id: number, newText: string) => void;
  className?: string;
}

/**
 * TaskList component serves as a container for displaying a list of tasks.
 * It uses a Card component to simulate a notepad and renders a dynamic list of TaskItem components.
 * It also includes a form to add new tasks.
 */
const TaskList: React.FC<TaskListProps> = ({ 
  tasks,
  onAddTask,
  onDeleteTask,
  onToggleTask,
  onEditTask,
  className 
}) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className={cn('w-full', className)}>
      <Card className="bg-card shadow-lg rounded-lg">
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleAddSubmit} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Add a new to-do..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Add Task</Button>
          </form>
          <div className="flex flex-col">
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onToggle={onToggleTask}
                onEdit={onEditTask}
                // Remove the bottom border from the very last item for a cleaner look
                className={cn(index === tasks.length - 1 && 'border-b-0')}
              />
            ))}
             {tasks.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No tasks yet. Add one above!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;