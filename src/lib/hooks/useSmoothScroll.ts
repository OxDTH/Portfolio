'use client';

import { useCallback } from 'react';

/**
 * A React hook that provides smooth scrolling functionality
 * @returns An object with methods for smooth scrolling
 */
export const useSmoothScroll = () => {
  /**
   * Internal implementation to scroll to an element
   */
  const scrollElementIntoView = useCallback((elementId: string, offset = 0, duration = 800) => {
    // Find target element
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    // Get position of target element
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    
    // Scroll to position
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      return;
    }
    
    // Fallback animation
    let startTime: number | null = null;
    
    const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };
    
    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const nextPosition = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, nextPosition);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, []);
  
  /**
   * Scroll to an element by its ID
   * @param elementId - ID of element to scroll to (without the #)
   * @param offset - Optional offset in pixels
   */
  const scrollToId = useCallback((elementId: string, offset = 0) => {
    scrollElementIntoView(elementId, offset);
  }, [scrollElementIntoView]);

  /**
   * Create a click handler that scrolls to an element
   * @param elementId - ID of element to scroll to (without the #)
   * @param offset - Optional offset in pixels
   */
  const createScrollHandler = useCallback(
    (elementId: string, offset = 0) => (e: React.MouseEvent) => {
      e.preventDefault();
      scrollElementIntoView(elementId, offset);
    },
    [scrollElementIntoView]
  );
  
  /**
   * Scroll to a specific Y position on the page
   * @param yPosition - The Y coordinate to scroll to
   * @param duration - Animation duration in milliseconds
   */
  const scrollToPosition = useCallback((yPosition: number, duration = 800) => {
    const startPosition = window.scrollY;
    const distance = yPosition - startPosition;
    
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
      });
      return;
    }
    
    // Fallback animation for browsers without native smooth scrolling
    let startTime: number | null = null;
    
    const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    const animateScroll = (currentTime: number): void => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const nextPosition = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, nextPosition);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, []);

  return {
    scrollToId,
    createScrollHandler,
    scrollToPosition
  };
};
