/**
 * NOTE: This file is kept for backward compatibility.
 * The main smooth scrolling implementation has been moved to useSmoothScroll.ts
 * to avoid circular dependencies. This file provides basic exports for
 * existing code that may still depend on it.
 */

/**
 * Easing function for natural-feeling scroll
 */
const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
};

/**
 * Smoothly scrolls to a specific position
 * @param targetY - Y position to scroll to
 * @param duration - Duration of scroll animation in ms
 */
export const scrollToPosition = (targetY: number, duration = 800): void => {
  const startPosition = window.pageYOffset;
  const distance = targetY - startPosition;
  
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
    return;
  }
  
  let startTime: number | null = null;

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
};

/**
 * Smoothly scrolls to an element
 * @param targetId - The ID of the element to scroll to (without #)
 * @param offset - Optional vertical offset in pixels
 * @param duration - Duration of scroll animation in ms (default 800ms)
 */
export const scrollToElement = (targetId: string, offset = 0, duration = 800): void => {
  // Find target element
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  // Get position of target element
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  
  // Scroll to the position
  scrollToPosition(targetPosition, duration);
};
