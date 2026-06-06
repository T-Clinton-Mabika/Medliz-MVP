import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Contributor } from '../types';
import { ContributorCard } from './ContributorCard';

interface ContributorCarouselProps {
  contributors: Contributor[];
  onContributorClick: (contributor: Contributor) => void;
  glowColor?: string;
}

/**
 * ContributorCarousel Component.
 * 
 * Displays contributors in a responsive carousel.
 * Mimics the advertisement carousel style (SponsorBanner) but shows multiple items
 * based on screen size (3 on desktop, 2 on tablet, 1 on mobile).
 * Features automatic rotation and consistent card sizing.
 */
export const ContributorCarousel: React.FC<ContributorCarouselProps> = ({ 
  contributors, 
  onContributorClick,
  glowColor = 'var(--color-accent-gold)'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Update itemsToDisplay based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToDisplay(1);
      } else if (window.innerWidth < 1024) {
        setItemsToDisplay(2);
      } else {
        setItemsToDisplay(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(contributors.length / itemsToDisplay);
  
  // Ensure we don't go out of bounds if contributors or itemsToDisplay changes
  useEffect(() => {
    if (currentIndex >= totalPages) {
      setCurrentIndex(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentIndex]);

  // Automatic Rotation Logic (like SponsorBanner)
  useEffect(() => {
    if (isHovered || totalPages <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 6000); // 6 seconds like advertisement carousel

    return () => clearInterval(timer);
  }, [isHovered, totalPages, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleContributors = contributors.slice(
    currentIndex * itemsToDisplay,
    (currentIndex * itemsToDisplay) + itemsToDisplay
  );

  if (contributors.length === 0) return null;

  return (
    <div 
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden min-h-[460px] md:min-h-[500px] py-4 px-4 -my-4 -mx-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${itemsToDisplay}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-center gap-8 h-full"
          >
            {visibleContributors.map((contributor) => (
              <div 
                key={contributor.id} 
                className="glow-border rounded-2xl h-full w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px]" 
                style={{ '--glow-color': glowColor } as any}
              >
                <ContributorCard
                  contributor={contributor}
                  onClick={() => onContributorClick(contributor)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls - Styled like SponsorBanner */}
      <div className="flex items-center justify-center gap-6 mt-12">
        <button
          onClick={handlePrev}
          disabled={totalPages <= 1}
          className={`glow-border p-3 rounded-full bg-app-surface border border-app-border text-app-muted hover:text-medical-primary transition-all shadow-md ${totalPages <= 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ '--glow-color': glowColor } as any}
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-3">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex 
                  ? 'w-12 bg-medical-primary' 
                  : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={totalPages <= 1}
          className={`glow-border p-3 rounded-full bg-app-surface border border-app-border text-app-muted hover:text-medical-primary transition-all shadow-md ${totalPages <= 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ '--glow-color': glowColor } as any}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
