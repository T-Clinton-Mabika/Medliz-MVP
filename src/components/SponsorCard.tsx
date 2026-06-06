// SponsorCard.tsx - Fixed padding on glass platform
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SponsorProduct } from '../types';
import { HiExternalLink } from 'react-icons/hi';

interface SponsorCardProps {
  sponsor: SponsorProduct;
}

/**
 * Sponsor/Ad Card Component.
 * 
 * Normal State (Frame 42.png):
 * - Landscape orientation
 * - Glass platform with padding on bottom, left, right
 * - Product name at top
 * - "from:" with logo and sponsor name
 * - Short description
 * - "Learn More" CTA
 * 
 * Hover State (Frame 44.png):
 * - Expanded glass platform with padding on all sides (bottom, left, right, top)
 * - Shows full product details
 * - Larger logo
 * - Complete product description
 * - Enhanced CTA button
 */
export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (sponsor.link) {
      window.open(sponsor.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer group w-full"
      style={{
        aspectRatio: '16/9',
        minWidth: '280px',
        maxWidth: '100%',
        position: 'relative',
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${sponsor.image})` }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glassmorphic Platform - with padding on all sides when hovered, and bottom/left/right when normal */}
      <motion.div
        className="absolute rounded-xl overflow-y-auto"
        initial={false}
        animate={{
          bottom: isHovered ? 16 : 16,
          left: isHovered ? 16 : 16,
          right: isHovered ? 16 : 16,
          top: isHovered ? 16 : 'auto',
          height: isHovered ? 'calc(100% - 32px)' : 'auto',
          background: isHovered 
            ? 'rgba(0, 0, 0, 0.85)' 
            : 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(12px)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="h-full flex flex-col"
          animate={{
            padding: isHovered ? '24px' : '20px',
            justifyContent: isHovered ? 'center' : 'flex-start',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Normal State Content (Frame 42) */}
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {/* Product Name */}
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-1">
                {sponsor.name}
              </h3>

              {/* Sponsor attribution */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white/60 text-sm">from:</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white/20">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.sponsorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold bg-cyan-500/40">
                        {sponsor.sponsorName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-cyan-400 font-semibold">{sponsor.sponsorName}</span>
                </div>
              </div>

              {/* Short description */}
              <p className="text-white/80 text-sm leading-relaxed mb-3 line-clamp-2">
                {sponsor.description}
              </p>

              {/* CTA Text */}
              {sponsor.cta && (
                <div className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
                  {sponsor.cta} <HiExternalLink size={12} />
                </div>
              )}
            </motion.div>
          )}

          {/* Hover State Content (Frame 44) */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4 w-full"
            >
              {/* Sponsor Logo - larger on hover */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-400 mx-auto bg-white/10 mb-2">
                  {sponsor.logoUrl ? (
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.sponsorName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold bg-cyan-500/20">
                      {sponsor.sponsorName.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Ad Name */}
              <h3 className="text-white text-2xl font-bold text-center">
                {sponsor.name}
              </h3>

              {/* Sponsor attribution */}
              <div className="text-white/70 text-sm flex items-center justify-center gap-2 flex-wrap">
                <span>from:</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white/20">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.sponsorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold bg-cyan-500/40">
                        {sponsor.sponsorName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-cyan-400 font-bold">{sponsor.sponsorName}</span>
                </div>
              </div>

              {/* Full Description */}
              <p className="text-white/90 text-sm leading-relaxed max-h-32 overflow-y-auto text-center">
                {sponsor.longDescription || sponsor.description}
              </p>

              {/* CTA Button */}
              {sponsor.link && sponsor.cta && (
                <div className="flex justify-center w-full">
                  <button
                    className="mt-2 px-6 py-2.5 bg-cyan-500 text-white font-bold text-sm rounded-lg hover:bg-cyan-600 transition-colors inline-flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (sponsor.link) {
                        window.open(sponsor.link, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {sponsor.cta} <HiExternalLink size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};