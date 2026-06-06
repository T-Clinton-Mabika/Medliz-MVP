import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EMERGENCY_CONTACTS } from '../data';
import { Mail, ChevronRight, Loader2, Star } from 'lucide-react';
import { SiGmail } from 'react-icons/si';
import { clsx } from 'clsx';
import emailjs from '@emailjs/browser';
import { HeroSection } from '../components/HeroSection';
import { SponsorBanner } from '../components/SponsorBanner';

const EMAILJS_SERVICE_ID = 'service_dxvyr5b';
const EMAILJS_PUBLIC_KEY = 'VLVlPicG50RX7Zug7';
const EMAILJS_TEMPLATE_ID = 'template_t2y0hni';

export const Contact: React.FC = () => {
  // Form State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Emergency Contacts State
  const [selectedCountry, setSelectedCountry] = useState(EMERGENCY_CONTACTS[0].country);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countryData = EMERGENCY_CONTACTS.find(c => c.country === selectedCountry);

  const getServiceEmoji = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('police')) return '👮';
    if (lowerName.includes('ambulance') || lowerName.includes('medical')) return '🚑';
    if (lowerName.includes('fire')) return '🔥';
    return '🚨';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      subject_name: 'General Inquiry',
      type: 'Contact',
      rating: 'N/A',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <HeroSection
        title={
          <>
            Contact <span className="text-medical-primary">Us</span>
          </>
        }
        description="Have questions or feedback? Reach out to our team of medical experts."
      />

      {/* Main Content Layout */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        
        {/* Contact Details & Embedded Form */}
        <div className="space-y-12">
          <div>
            <h2 className="heading-lg mb-6 text-app-text">Get in Touch</h2>
            <p className="body-lg text-app-muted mb-8 text-neutral-600 dark:text-neutral-400">
              We'd love to hear from you. Whether you have inquiries about our academic medical courses, questions about our blog posts, or suggestion updates, reach us directly via email or our contact form.
            </p>
            
            <div className="p-6 card-glass-platform rounded-2xl flex items-center gap-5 border border-app-border shadow-sm max-w-md mx-auto">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                <SiGmail size={28} />
              </div>
              <div>
                <div className="body-xs text-app-muted font-bold uppercase tracking-wider">Email Us</div>
                <a href="mailto:medlizportal@gmail.com" className="text-xl font-bold text-app-text hover:text-medical-primary transition-colors">
                  medlizportal@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Form */}
          <div className="p-8 md:p-10 card-glass-platform rounded-3xl border border-app-border shadow-lg">
            <h3 className="text-2xl font-display font-bold mb-6 text-app-text">Send a Message</h3>
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Star size={32} className="fill-current" />
                </div>
                <h4 className="text-xl font-display font-bold text-app-text">Thank You!</h4>
                <p className="text-neutral-500 dark:text-neutral-400">Your message has been sent successfully. We will review it shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-semibold text-app-text mb-2">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    className="w-full px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-app-text focus:ring-2 focus:ring-medical-primary outline-none transition-all placeholder:text-neutral-400"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-app-text mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-app-text focus:ring-2 focus:ring-medical-primary outline-none transition-all placeholder:text-neutral-400"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-app-text mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-app-text focus:ring-2 focus:ring-medical-primary outline-none transition-all resize-none placeholder:text-neutral-400"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="glow-border w-full py-4 bg-medical-primary hover:bg-medical-secondary text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ '--glow-color': 'var(--color-medical-primary)' } as any}
                >
                  {isSending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Emergency Contacts Finder Finder Panel */}
        <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-app-border rounded-[2.5rem] p-8 md:p-12 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-app-text mb-2">
              Emergency <span className="text-medical-primary">Contacts</span>
            </h2>
            <p className="body-sm text-app-muted">Quickly locate critical crisis response and medical hotlines by country.</p>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-app-muted mb-3">Country / Region</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 pl-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-medical-primary text-left text-lg font-medium flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                    {selectedCountry === 'United States' && <span className="fi fi-us text-2xl shadow-sm" />}
                    {selectedCountry === 'United Kingdom' && <span className="fi fi-gb text-2xl shadow-sm" />}
                    {selectedCountry === 'South Africa' && <span className="fi fi-za text-2xl shadow-sm" />}
                  </div>
                  <span className="text-app-text">{selectedCountry}</span>
                </div>
                <ChevronRight size={20} className={clsx("text-zinc-400 transition-transform", isDropdownOpen ? "rotate-90" : "rotate-0")} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 bg-app-surface border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {EMERGENCY_CONTACTS.map((c) => (
                      <button
                        key={c.country}
                        onClick={() => {
                          setSelectedCountry(c.country);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full p-4 flex items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left cursor-pointer"
                      >
                        {c.country === 'United States' && <span className="fi fi-us text-xl rounded-sm" />}
                        {c.country === 'United Kingdom' && <span className="fi fi-gb text-xl rounded-sm" />}
                        {c.country === 'South Africa' && <span className="fi fi-za text-xl rounded-sm" />}
                        <span className="font-medium text-app-text">{c.country}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-4">
            {countryData?.services.length === 1 ? (
              <div className="flex items-center justify-between p-6 bg-app-surface rounded-2xl border border-app-border shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🚨</span>
                  <span className="font-bold text-lg text-app-text">General Emergency Contact</span>
                </div>
                <span className="text-3xl font-display font-bold text-medical-primary">{countryData.services[0].number}</span>
              </div>
            ) : (
              countryData?.services.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-app-surface rounded-2xl border border-app-border shadow-sm animate-none">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{getServiceEmoji(service.name)}</span>
                    <span className="font-bold text-lg text-app-text">{service.name}</span>
                  </div>
                  <span className="text-3xl font-display font-bold text-medical-primary">{service.number}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Sponsor Ads Carousel/Section (Benefactors only) */}
      <section className="py-12 border-t border-app-border">
        <div className="max-w-[1440px] mx-auto px-4 mb-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-app-text mb-2">
              Advertisements
            </h2>
          </div>
        </div>
        <SponsorBanner filter="benefactors" />
      </section>

    </div>
  );
};
