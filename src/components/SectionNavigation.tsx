'use client';

import { useActiveSection, useSmoothScroll } from '@/lib/hooks';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface SectionNavigationProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
  className?: string;
  highlightActive?: boolean;
  onNavigate?: (sectionId: string) => void;
  vertical?: boolean;
}

/**
 * A component that displays navigation links for scrolling between sections
 * and highlights the currently active section
 */
export default function SectionNavigation({ 
  sections, 
  className = '', 
  highlightActive = true,
  vertical = true,
  onNavigate
}: SectionNavigationProps) {
  const { createScrollHandler } = useSmoothScroll();
  const sectionIds = sections.map(section => section.id);
  const activeSection = useActiveSection(sectionIds);
  
  return (
    <nav className={clsx(
      vertical ? 'flex flex-col space-y-2' : 'flex flex-row space-x-4',
      className
    )}>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={clsx(
            'px-3 py-2 text-sm transition-all duration-300 hover:text-theme-accent-color relative',
            activeSection === section.id && highlightActive ? 
              'font-medium text-theme-accent-color' : 
              'text-theme-text-color'
          )}
          onClick={(e) => {
            const handler = createScrollHandler(section.id);
            handler(e);
            if (onNavigate) {
              onNavigate(section.id);
            }
          }}
        >
          {section.title}
          {activeSection === section.id && highlightActive && (
            <span 
              className="absolute bottom-0 left-0 h-0.5 bg-theme-accent-color transition-all duration-300"
              style={{ width: '100%', opacity: 0.8 }}
            />
          )}
        </a>
      ))}
    </nav>
  );
}
