'use client';

import { useEffect, useRef } from 'react';

/**
 * A hook to detect clicks outside of the referenced element
 * @param callback Function to call when a click outside is detected
 * @returns ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}
