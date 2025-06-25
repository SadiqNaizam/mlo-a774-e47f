import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  className?: string;
}

/**
 * PageHeader component displays the main title for the To-Do List page.
 * It features a large, bold, centered title with an underline to match the design aesthetic.
 */
const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-8', className)}>
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground uppercase">
          TO DO LIST
        </h1>
        <div className="mt-2 h-1 w-40 mx-auto bg-foreground" />
      </div>
    </header>
  );
};

export default PageHeader;
