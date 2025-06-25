import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  className?: string;
}

/**
 * MainAppLayout provides the core structure for the application pages.
 * It implements a Header-Body (HB) layout with a flexible header and a main content area.
 * The main content is centered horizontally within a max-width container that applies vertical spacing for its children.
 */
const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  headerContent,
  className,
}) => {
  return (
    <div className={cn('flex min-h-screen flex-col items-start', className)}>
      <Header>{headerContent}</Header>
      <main className="w-full flex-grow py-8">
        <div className="mx-auto w-full max-w-md px-4 flex flex-col gap-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
