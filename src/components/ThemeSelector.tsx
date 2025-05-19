'use client';

import { Theme, themeConfigs, themeSlice, useDispatch, useSelector, selectTheme } from '@/lib/redux';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import clsx from 'clsx';
import { useEffect } from 'react';

export default function ThemeSelector({ active }: ThemeSelectorProps) {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  
  const closeMenu = () => {
    dispatch(themeSlice.actions.closeThemeMenu());
  };

  const ref = useClickOutside<HTMLDivElement>(closeMenu);
  
  // Handle ESC key press
  useEffect(() => {
    if (!active) return;
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(themeSlice.actions.closeThemeMenu());
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [active, dispatch]);

  if (!active) return null;

  const handleThemeChange = (theme: Theme) => {
    // Apply theme change
    dispatch(themeSlice.actions.setTheme({ theme }));
    
    // Close menu with a slight delay for better UX
    setTimeout(() => {
      dispatch(themeSlice.actions.closeThemeMenu());
    }, 150);
    
    // Force refresh of body styles
    setTimeout(() => {
      document.body.style.backgroundColor = `var(--theme-bg-color)`;
      document.body.style.color = `var(--theme-text-color)`;
    }, 50);
  };
  
  return (
    <div 
      ref={ref}
      className="absolute z-50 left-full ml-2 bottom-8 border border-gray-700 shadow-lg w-64 rounded-md overflow-hidden"
      style={{ 
        backgroundColor: 'rgba(25, 25, 25, 0.98)', 
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1.5 px-3 border-b border-gray-700 text-sm font-medium flex items-center justify-between" 
           style={{ backgroundColor: '#252526' }}>
        <span className="text-white">Color Theme</span>
        <button 
          onClick={closeMenu}
          className="text-white opacity-70 hover:opacity-100"
          aria-label="Close theme selector"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
      <div className="max-h-60 overflow-y-auto py-1" style={{ backgroundColor: '#252526' }}>
        {Object.values(themeConfigs).map((theme) => (
          <div 
            key={theme.name}
            className={clsx(
              "flex items-center px-3 py-2 text-sm hover:bg-[#2a2d2e] cursor-pointer transition-colors",
              currentTheme === theme.name ? "bg-[#37373d]" : ""
            )}
            onClick={() => handleThemeChange(theme.name as Theme)}
          >
            <div 
              className="flex-shrink-0 mr-3 flex items-center"
            >
              <div 
                className="w-4 h-4 rounded-sm flex-shrink-0" 
                style={{ 
                  backgroundColor: theme.bgColor, 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' 
                }}
              />
              <div 
                className="w-1 h-4 ml-1 rounded-sm flex-shrink-0" 
                style={{ 
                  backgroundColor: theme.accentColor,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' 
                }}
              />
            </div>
            <span 
              className="font-medium text-white" 
              style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)' }}
            >
              {theme.displayName}
            </span>
            {currentTheme === theme.name && (
              <svg 
                className="ml-auto w-4 h-4 flex-shrink-0" 
                fill="none" 
                stroke="#38bdf8" 
                style={{ filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5))' }}
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ThemeSelectorProps {
  active: boolean;
}
