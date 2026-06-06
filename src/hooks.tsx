import React, { useState, useEffect, createContext, useContext } from 'react';

/**
 * Custom hook for a smooth counting animation.
 * Useful for displaying statistics that "count up" when the page loads.
 * @param targetValue The final number to reach.
 * @param duration The animation duration in milliseconds.
 * @param decimals Number of decimal places to show.
 * @returns The current animated count.
 */
export function useScrollCounter(targetValue: number, duration: number = 2000, decimals: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * targetValue;
      
      // Use toFixed to handle decimals and then convert back to number for the state
      // or just keep it as a string if we want to preserve trailing zeros.
      // Since the hook returns a number currently, we'll stick to that but maybe return a string if decimals > 0.
      setCount(Number(current.toFixed(decimals)));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration, decimals]);

  return count;
}

/**
 * Context and Provider for Dark Mode functionality.
 * Manages the 'dark' class on the document root and persists preference to localStorage.
 */
interface DarkModeContextType {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggle: () => {},
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggle = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  return (
    <DarkModeContext.Provider value={{ 
      isDark, 
      toggle
    }}>
      {children}
    </DarkModeContext.Provider>
  );
};

/**
 * Hook to access the Dark Mode context.
 * Allows components to check if dark mode is active and toggle it.
 */
export function useDarkMode() {
  return useContext(DarkModeContext);
}
