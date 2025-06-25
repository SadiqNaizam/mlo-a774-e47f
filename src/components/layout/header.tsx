import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * A flexible header layout component that provides a container for header content.
 * It uses flexbox for alignment and is styled based on the application's layout requirements.
 */
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        'relative flex h-auto w-full items-center justify-start px-4 py-2',
        className
      )}
    >
      {children}
    </header>
  );
};

export default Header;
