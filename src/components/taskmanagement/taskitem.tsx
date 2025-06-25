import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2 } from 'lucide-react';
import type { Task } from '@/pages/index';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  className?: string;
}

/**
 * TaskItem represents a single, interactive row in the to-do list.
 * It displays task text, a completion checkbox, and controls for editing and deleting.
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText);
      setIsEditing(false);
    } else {
      // If user clears the input, revert to original text
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  }

  return (
    <div className={cn('flex w-full items-center gap-2 sm:gap-4 border-b border-muted py-3', className)}>
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={`Mark task "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      
      {isEditing ? (
        <Input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-grow h-9"
        />
      ) : (
        <label 
          htmlFor={`task-${task.id}`}
          className={cn(
            "flex-grow text-lg cursor-pointer",
            task.completed ? "text-muted-foreground line-through" : "text-foreground"
          )}
        >
          {task.text}
        </label>
      )}

      <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="icon" onClick={handleEditClick} disabled={isEditing || task.completed} aria-label="Edit task">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)} className="text-destructive hover:text-destructive" aria-label="Delete task">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;