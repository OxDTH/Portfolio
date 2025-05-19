'use client';

import { useCallback, useEffect, useState } from 'react';

interface SectionInfo {
  id: string;
  element: HTMLElement;
  offsetTop: number;
  offsetBottom: number;
}

/**
 * Hook to detect which section is currently active in the viewport
 * @param sectionIds Array of section IDs to track
 * @param options Configuration options
 * @returns The currently active section ID
 */
export function useActiveSection(
  sectionIds: string[],
  options = {
    threshold: 0.4, // How much of section should be visible to be active
    rootMargin: '0px', // Margin around the root
    updateInterval: 100, // Update active section every X ms when scrolling
  }
) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionInfo[]>([]);
  
  // Initialize sections
  useEffect(() => {
    const getSections = () => {
      return sectionIds
        .map(id => {
          const element = document.getElementById(id);
          if (!element) return null;
          
          const rect = element.getBoundingClientRect();
          return {
            id,
            element,
            offsetTop: rect.top + window.scrollY,
            offsetBottom: rect.bottom + window.scrollY,
          };
        })
        .filter((section): section is SectionInfo => section !== null);
    };
    
    // Initial calculation
    setSections(getSections());
    
    // Recalculate on window resize
    const handleResize = () => {
      setSections(getSections());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sectionIds]);
  
  // Update active section on scroll
  useEffect(() => {
    if (sections.length === 0) return;
    
    let timeoutId: ReturnType<typeof setTimeout>;
    let lastScrollY = window.scrollY;
    
    const determineActiveSection = useCallback(() => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = options.threshold * windowHeight;
      
      // Find the current active section
      for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = section.offsetBottom;
        const viewportMiddle = currentScrollY + windowHeight / 2;
        
        // Check if section is in viewport
        if (
          (sectionTop <= viewportMiddle && sectionBottom >= viewportMiddle) ||
          (currentScrollY <= sectionTop && currentScrollY + windowHeight >= sectionTop + threshold)
        ) {
          setActiveSection(section.id);
          return;
        }
      }
      
      // If no section is active, set to null
      setActiveSection(null);
    }, [sections]);
    
    const onScroll = () => {
      // Skip if the scroll distance is very small
      if (Math.abs(window.scrollY - lastScrollY) < 5) return;
      lastScrollY = window.scrollY;
      
      // Clear previous timeout
      clearTimeout(timeoutId);
      
      // Set new timeout for performance reasons
      timeoutId = setTimeout(determineActiveSection, options.updateInterval);
    };
    
    // Run once to determine the initial active section
    determineActiveSection();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [sections, options.threshold, options.updateInterval]);
  
  return activeSection;
}
