import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  colorClass?: string;
  size?: number;
}

/**
 * ContactItem Component.
 * 
 * Renders a social media or contact icon that displays a label on hover.
 * Uses Framer Motion for the smooth label appearance.
 * 
 * @param icon The Lucide icon component to display.
 * @param href The link destination.
 * @param label The text displayed when hovering over the icon.
 * @param colorClass Optional Tailwind CSS color class for the icon.
 * @param size Optional size for the icon in pixels.
 */
export const ContactItem: React.FC<ContactItemProps> = ({ 
  icon: Icon, 
  href, 
  label, 
  colorClass = "text-zinc-400 hover:text-medical-primary",
  size = 14
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -35, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute z-50 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-bold rounded-lg whitespace-nowrap pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2"
          >
            {label}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-800 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${colorClass} transition-all p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 flex items-center justify-center`}
      >
        <Icon size={size} />
      </a>
    </div>
  );
};
