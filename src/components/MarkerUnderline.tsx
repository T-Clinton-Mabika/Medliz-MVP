import React from 'react';
import { motion } from 'framer-motion';

interface MarkerProps {
  children: React.ReactNode;
  underlineVar?: string;
  textVar?: string;
  className?: string;
  underlinePadding?: string | number;
}

const MarkerUnderline: React.FC<MarkerProps> = ({ 
  children, 
  underlineVar = "--color-marker-ink", 
  textVar,
  className = "",
  underlinePadding = "-0.75rem"
}) => {
  const effectiveTextVar = textVar || underlineVar;

  return (
    <span
      className={`relative inline-block font-marker ${className}`}
      style={{
        color: `var(${effectiveTextVar}, #2563eb)`,
      }}
    >
      {children}
      <svg
        className="absolute left-0 w-full h-[0.45em] pointer-events-none overflow-visible"
        style={{ bottom: underlinePadding }}
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top line - longer and slightly thicker */}
        <motion.path
          d="M 2 4 C 20 3.5, 80 3, 98 4"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        {/* Bottom line - shorter and shifted right */}
        <motion.path
          d="M 15 9 C 40 8.5, 75 8, 95 9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="opacity-80"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ 
            duration: 0.7, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </svg>
    </span>
  );
};

export default MarkerUnderline;