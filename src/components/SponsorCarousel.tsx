// SponsorCarousel.tsx (UPDATED - Single item)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SponsorProduct } from '../types';
import { SponsorCard } from './SponsorCard';

interface SponsorCarouselProps {
  sponsors: SponsorProduct[];
  glowColor?: string;
}

/**
 * SponsorCarousel Component.
 * 
 * Displays sponsor ads in a responsive carousel.
 * Shows ONE item at a time.
 * Features automatic rotation and landscape card sizing.
 */
export const SponsorCarousel: React.FC<SponsorCarouselProps> = ({ 
  sponsors, 
  glowColor = 'var(--color-sponsor-glow)'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = sponsors.length;

  // Automatic Rotation Logic
  useEffect(() => {
    if (isHovered || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(timer);
  }, [isHovered, totalSlides]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  if (sponsors.length === 0) return null;

  return (
    <div 
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden py-4 px-4 -my-4 -mx-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <div 
              className="glow-border rounded-2xl w-full max-w-4xl mx-auto" 
              style={{ '--glow-color': glowColor } as any}
            >
              <SponsorCard sponsor={sponsors[currentIndex]} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls - Only show if more than 1 sponsor */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="glow-border p-3 rounded-full bg-app-surface border border-app-border text-app-muted hover:text-sponsor-primary transition-all shadow-md cursor-pointer"
            style={{ '--glow-color': glowColor } as any}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-3">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                    ? 'w-8 bg-sponsor-primary' 
                    : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="glow-border p-3 rounded-full bg-app-surface border border-app-border text-app-muted hover:text-sponsor-primary transition-all shadow-md cursor-pointer"
            style={{ '--glow-color': glowColor } as any}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};