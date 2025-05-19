'use client';

import { useSmoothScroll } from '@/lib/hooks';
import { ReactNode } from 'react';

interface SmoothScrollLinkProps {
  to: string;
  className?: string;
  children: ReactNode;
  offset?: number;
}

/**
 * A component that provides smooth scrolling to an element when clicked
 */
export default function SmoothScrollLink({ to, className = '', children, offset = 0 }: SmoothScrollLinkProps) {
  const { createScrollHandler } = useSmoothScroll();
  
  return (
    <a 
      href={`#${to}`}
      className={className}
      onClick={createScrollHandler(to, offset)}
    >
      {children}
    </a>
  );
}
