import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
  image?: string;
  pill?: React.ReactNode;
  contentRight?: React.ReactNode;
  children?: React.ReactNode;
  overlayOpacity?: 'light' | 'normal' | 'dark';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  image,
  pill,
  contentRight,
  children,
  overlayOpacity = 'normal',
}) => {
  const overlayClasses = {
    light: 'bg-black/20 dark:bg-black/40',
    normal: 'bg-black/30 dark:bg-black/50',
    dark: 'bg-black/40 dark:bg-black/60'
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image with Overlay - ALWAYS VISIBLE if provided */}
      <div className="absolute inset-0 z-0">
        {image && (
          <img 
            src={image} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        {!image && (
          <div className="w-full h-full bg-app-surface" />
        )}
        {image && (
          <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]}`} />
        )}
      </div>

      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10 pt-24 md:pt-20 flex flex-col lg:flex-row items-center lg:items-center min-h-[600px]">
        {/* Text Content */}
        <div className={`${contentRight ? 'lg:w-2/3' : 'w-full'} w-full p-2 md:p-4 lg:p-6 pb-12 md:pb-20 flex items-center justify-center`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`glass-platform h-fit w-full lg:max-w-[960px] text-center p-6 md:p-10 lg:p-12 rounded-[2rem] ${!image ? 'shadow-none border-none bg-transparent' : ''}`}
          >
            {pill && <div className="mb-6">{pill}</div>}
            
            <h1 className="display-lg mb-6 text-app-text text-center">
              {title}
            </h1>
            
            <p className="body-md text-app-text mb-8 max-w-3xl mx-auto opacity-90 text-center">
              {description}
            </p>

            {children}
          </motion.div>
        </div>

        {/* Right Content (Foreground Image) - INVISIBLE BUT RESERVES SPACE if hideForeground is true */}
        {contentRight && (
  <div className="w-full flex items-end justify-center px-2 lg:absolute lg:bottom-0 lg:right-0 lg:w-[35%] xl:w-[30%] lg:px-4 z-20 pointer-events-none">
    <div className="pointer-events-auto w-full">
      {contentRight}
    </div>
  </div>
)}
      </div>
    </section>
  );
};
