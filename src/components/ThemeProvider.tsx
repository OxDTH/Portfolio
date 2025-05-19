'use client';

import { selectThemeConfig, themeSlice, Theme, useDispatch, useSelector } from '@/lib/redux';
import { ReactNode, useEffect } from 'react';

// Helper function to lighten or darken a hex color
const lightenDarkenColor = (hex: string, amount: number): string => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Increase or decrease the RGB values
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeConfig = useSelector(selectThemeConfig);
  const dispatch = useDispatch();
  
  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme && Object.values(Theme).includes(savedTheme as Theme)) {
      dispatch(themeSlice.actions.setTheme({ theme: savedTheme as Theme }));
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    const body = document.body;
    
    console.log('Theme changed:', themeConfig.name); // Debug log
    
    // Remove any previous theme classes
    const previousThemeClasses = Array.from(root.classList)
      .filter(className => className.startsWith('theme-'));
    
    previousThemeClasses.forEach(className => {
      root.classList.remove(className);
    });
    
    // Add new theme class
    root.classList.add(`theme-${themeConfig.name}`);
    
    // Directly apply styles to body for immediate effect
    body.style.backgroundColor = themeConfig.bgColor;
    body.style.color = themeConfig.textColor;
    
    // Apply CSS variables globally
    document.documentElement.style.setProperty('--theme-bg-color', themeConfig.bgColor);
    document.documentElement.style.setProperty('--theme-text-color', themeConfig.textColor);
    document.documentElement.style.setProperty('--theme-accent-color', themeConfig.accentColor);
    
    // Calculate scrollbar colors based on theme if not explicitly set in CSS
    const scrollbarThumbColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--scrollbar-thumb-color').trim() || 
      lightenDarkenColor(themeConfig.bgColor, 20);
    
    const scrollbarActiveColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--scrollbar-thumb-active-color').trim() || 
      `${themeConfig.accentColor}55`;
    
    // Set scrollbar colors
    document.documentElement.style.setProperty('--scrollbar-thumb-color', scrollbarThumbColor);
    document.documentElement.style.setProperty('--scrollbar-thumb-active-color', scrollbarActiveColor);
    
    // Store user's theme preference in localStorage
    localStorage.setItem('preferred-theme', themeConfig.name);
    
    // Apply transition effect for smooth theme switching
    body.classList.add('theme-transition');
    setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 300);
    
  }, [themeConfig]);
  
  return children;
}
