// SponsorBanner.tsx (UPDATED - Simplified version)
import React, { useState } from 'react';
import { SPONSOR_PRODUCTS, CONTRIBUTORS } from '../data';
import { Modal } from './Modal';
import { Contributor } from '../types';
import { ExternalLink, Globe, Twitter, Linkedin, Github } from 'lucide-react';
import { SponsorCarousel } from './SponsorCarousel';

interface SponsorBannerProps {
  filter?: 'all' | 'benefactors';
}

/**
 * SponsorBanner Component.
 * 
 * Displays a rotating carousel of sponsored advertisements.
 * 
 * Features:
 * - Auto-playing carousel with pause-on-hover functionality using SponsorCarousel.
 * - Shows multiple ads at a time (3 on desktop, 2 on tablet, 1 on mobile).
 * - Integrated modals for detailed advertisement content and benefactor profiles.
 * 
 * @param {SponsorBannerProps} props - Component props.
 * @param {'all' | 'benefactors'} [props.filter='all'] - Filter to show all ads or only benefactor-linked ones.
 */
export const SponsorBanner: React.FC<SponsorBannerProps> = ({ filter = 'all' }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBenefactor, setSelectedBenefactor] = useState<Contributor | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const filteredProducts = SPONSOR_PRODUCTS.filter(p => {
    if (filter === 'benefactors') return !!p.benefactorId;
    return true;
  });

  if (filteredProducts.length === 0) return null;

  // Handle opening the modal for detailed ad content
  const handleOpenModal = (product: any) => {
    if (product.longDescription) {
      setSelectedProduct(product);
      setShowModal(true);
    }
  };

  const handleBenefactorClick = (e: React.MouseEvent, benefactor: Contributor | undefined) => {
    if (benefactor) {
      e.stopPropagation();
      setShowModal(false);
      setSelectedBenefactor(benefactor);
    }
  };

  const currentProduct = selectedProduct;
  const benefactor = currentProduct?.benefactorId 
    ? CONTRIBUTORS.find(c => c.id === currentProduct.benefactorId) 
    : null;

  const hasLinkButton = currentProduct?.link && currentProduct?.cta;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 mb-12">
      {/* Use the SponsorCarousel component - shows multiple ads */}
      <SponsorCarousel sponsors={filteredProducts} />

      {/* Modal for Advertisement Details */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        title="Sponsored Ad"
        maxWidth="max-w-2xl"
        glowColor="var(--color-sponsor-glow)"
      >
        {currentProduct && (
          <div className="space-y-8">
            <div className="h-64 sm:h-80 overflow-hidden rounded-2xl">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div 
                className={`flex items-center gap-3 mb-4 ${benefactor ? 'cursor-pointer group/benefactor' : ''}`}
                onClick={(e) => handleBenefactorClick(e, benefactor)}
              >
                <div className={`w-8 h-8 rounded-full bg-sponsor-primary/10 flex items-center justify-center text-sponsor-primary font-bold text-xs border border-sponsor-primary/20 transition-all overflow-hidden ${benefactor ? 'group-hover/benefactor:scale-110 group-hover/benefactor:border-sponsor-primary' : ''}`}>
                  {currentProduct.logoUrl || benefactor?.image ? (
                    <img 
                      src={currentProduct.logoUrl || benefactor?.image} 
                      alt={currentProduct.sponsorName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    currentProduct.sponsorName.charAt(0)
                  )}
                </div>
                <span className={`text-sponsor-primary font-bold text-sm transition-all ${benefactor ? 'group-hover/benefactor:translate-x-1' : ''}`}>
                  {currentProduct.sponsorName}
                </span>
              </div>

              <h3 className="heading-lg text-app-text mb-6">
                {currentProduct.name}
              </h3>

              <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
                <p className="body-md text-app-muted leading-relaxed">
                  {currentProduct.longDescription || currentProduct.description}
                </p>
              </div>

              {hasLinkButton && (
                <a
                  href={currentProduct.link}
                  className="glow-border inline-flex px-8 py-4 bg-sponsor-primary hover:bg-sponsor-hover text-white font-display font-bold rounded-xl transition-all items-center gap-2 shadow-lg"
                  style={{ '--glow-color': 'var(--color-sponsor-glow)' } as any}
                >
                  {currentProduct.cta} <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal for Benefactor Profile */}
      <Modal
        isOpen={!!selectedBenefactor}
        onClose={() => setSelectedBenefactor(null)}
        title="Benefactor Profile"
        maxWidth="max-w-3xl"
        glowColor="var(--color-medical-primary)"
      >
        {selectedBenefactor && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden rounded-2xl">
              <img
                src={selectedBenefactor.image}
                alt={selectedBenefactor.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-3/5">
              <div className="mb-8">
                <h3 className="display-sm text-app-text mb-2">
                  {selectedBenefactor.name}
                </h3>
                <p className="text-medical-primary font-medium uppercase tracking-widest text-sm">
                  Benefactor
                </p>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none mb-10">
                <p className="body-md text-app-muted leading-relaxed">
                  {selectedBenefactor.fullBio || selectedBenefactor.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {selectedBenefactor.socials?.website && (
                  <a href={selectedBenefactor.socials.website} className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-medical-primary transition-all">
                    <Globe size={20} />
                  </a>
                )}
                {selectedBenefactor.socials?.twitter && (
                  <a href={selectedBenefactor.socials.twitter} className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-medical-primary transition-all">
                    <Twitter size={20} />
                  </a>
                )}
                {selectedBenefactor.socials?.linkedin && (
                  <a href={selectedBenefactor.socials.linkedin} className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-medical-primary transition-all">
                    <Linkedin size={20} />
                  </a>
                )}
                {selectedBenefactor.socials?.github && (
                  <a href={selectedBenefactor.socials.github} className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-medical-primary transition-all">
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};