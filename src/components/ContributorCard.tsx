import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { Contributor } from "../types";

interface ContributorCardProps {
  contributor: Contributor;
  onClick: () => void;
}

/**
 * Contributor/Benefactor Card Component.
 *
 * Features:
 * - Default state: Image background with glassmorphic bottom island showing basic info
 * - Hover state: Expanded glassmorphic overlay showing full preview with bio
 * - Smooth transitions between states
 */
export const ContributorCard: React.FC<ContributorCardProps> = ({
  contributor,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get the first credential if available
  const firstCredential =
    contributor.credentials && contributor.credentials.length > 0
      ? contributor.credentials[0]
      : null;

  // Filter available socials for display - now showing ALL socials
  const availableSocials = () => {
    const socials = [];
    if (contributor.socials?.linkedin)
      socials.push({
        icon: Linkedin,
        href: contributor.socials.linkedin,
        label: "LinkedIn",
      });
    if (contributor.socials?.twitter)
      socials.push({
        icon: Twitter,
        href: contributor.socials.twitter,
        label: "Twitter",
      });
    if (contributor.socials?.instagram)
      socials.push({
        icon: Instagram,
        href: contributor.socials.instagram,
        label: "Instagram",
      });
    if (contributor.socials?.facebook)
      socials.push({
        icon: Facebook,
        href: contributor.socials.facebook,
        label: "Facebook",
      });
    if (contributor.socials?.email)
      socials.push({
        icon: Mail,
        href: `mailto:${contributor.socials.email}`,
        label: contributor.socials.email,
      });
    if (contributor.socials?.phone)
      socials.push({
        icon: PhoneCall,
        href: `tel:${contributor.socials.phone}`,
        label: contributor.socials.phone,
      });
    if (contributor.socials?.website)
      socials.push({
        icon: Globe,
        href: contributor.socials.website,
        label: "Website",
      });
    return socials;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: "3/4",
        position: "relative",
        minHeight: "400px",
      }}
    >
      {/* Glow Border Effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: isHovered
            ? "0 0 0 2px var(--color-accent-gold), 0 0 0 4px rgba(255, 208, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)"
            : "none",
          transition: "box-shadow 0.3s ease",
          zIndex: 3,
        }}
      />

      {/* Background Image - fills entire container */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${contributor.image})` }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" />

      {/* Glassmorphic Platform - FIXED HEIGHT IN DEFAULT STATE */}
      <motion.div
        className="absolute left-3 right-3 rounded-xl overflow-hidden contributor-glass-platform"
        initial={false}
        animate={{
          bottom: 12,
          height: isHovered ? "calc(100% - 24px)" : "280px", // FIXED HEIGHT for default state
          top: isHovered ? 12 : "auto",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          zIndex: 2,
        }}
      >
        <motion.div
          className="p-5 flex flex-col items-center text-center w-full h-full"
          animate={{
            justifyContent: isHovered ? "center" : "flex-start",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Hover State Content */}
          {isHovered ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4 w-full overflow-y-auto"
              style={{ maxHeight: "100%" }}
            >
              {/* Circular Profile Image */}
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                src={contributor.image}
                alt={contributor.name}
                className="w-24 h-24 rounded-full object-cover border-3 border-accent-gold mx-auto flex-shrink-0"
                style={{
                  borderWidth: "3px",
                  borderColor: "var(--color-accent-gold)",
                }}
              />

              {/* Name with fixed max-height and ellipsis */}
              <div className="flex-shrink-0">
                <h3 className="text-white heading-md line-clamp-2">
                  {contributor.name}
                </h3>
              </div>

              {/* Role with fixed max-height */}
              <div className="flex-shrink-0">
                <div className="text-accent-gold body-sm font-bold uppercase tracking-wider line-clamp-2">
                  {contributor.role}
                </div>
              </div>

              {/* Credential if TeamMember type */}
              {contributor.type === "TeamMember" && firstCredential && (
                <div className="flex-shrink-0">
                  <div className="text-white/80 text-xs italic font-medium line-clamp-2">
                    {firstCredential}
                  </div>
                </div>
              )}

              {/* Bio - FIXED HEIGHT with scroll and ellipsis */}
              <div className="w-full flex-shrink-0">
                <div
                  className="text-white/90 text-sm leading-relaxed overflow-y-auto"
                  style={{
                    maxHeight: "120px", // FIXED HEIGHT for bio
                    scrollbarWidth: "thin",
                  }}
                >
                  <p className="line-clamp-5">
                    {contributor.fullBio || contributor.bio}
                  </p>
                </div>
              </div>

              {/* Open Profile Button */}
              <button
                className="mt-4 px-6 py-2.5 bg-[#ffd000] text-black font-bold text-sm rounded-full hover:bg-[#ffd000]/90 transition-colors inline-flex items-center gap-2 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                Open Profile <ExternalLink size={14} />
              </button>
            </motion.div>
          ) : (
            /* Default State Content - FIXED LAYOUT */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col"
              style={{ height: "100%" }}
            >
              {/* Name with max-height and ellipsis */}
              <div className="flex-shrink-0 mb-2">
                <h3 className="text-white heading-md line-clamp-2">
                  {contributor.name}
                </h3>
              </div>

              {/* Role with max-height and ellipsis */}
              <div className="flex-shrink-0 mb-2">
                <div className="text-accent-gold body-sm font-bold uppercase tracking-wider line-clamp-2">
                  {contributor.role}
                </div>
              </div>

              {/* Credential if TeamMember type */}
              {contributor.type === "TeamMember" && firstCredential && (
                <div className="flex-shrink-0 mb-3">
                  <div className="text-white/80 text-xs italic font-medium line-clamp-2">
                    {firstCredential}
                  </div>
                </div>
              )}

              {/* "Available on:" text */}
              <div className="flex-shrink-0 text-white/70 text-xs uppercase tracking-wider mb-3">
                Available on:
              </div>

              {/* Social Icons - WRAP with fixed container */}
              <div className="flex-shrink-0 flex items-center justify-center gap-2 mb-4 flex-wrap">
                {availableSocials().map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-accent-gold hover:text-black transition-all duration-200 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                    title={social.label}
                  >
                    <social.icon size={14} />
                  </a>
                ))}
              </div>

              {/* Spacer to push "View Profile" to bottom */}
              <div className="flex-grow" />

              {/* "View Profile" text */}
              <div className="flex-shrink-0 text-white/80 text-xs font-medium hover:text-[#ffd000] transition-colors">
                View Profile
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
