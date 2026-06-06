import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ShieldAlert, FileText, Cookie } from "lucide-react";
import { TbSunLowFilled, TbMoonFilled } from "react-icons/tb";
import { MdPolicy } from "react-icons/md";
import { useDarkMode } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";
import { POSTS_DATA, COURSES_DATA, CONTRIBUTORS } from "../data";
import { Modal } from "./Modal";

/**
 * Navigation Header Component.
 * Features:
 * - Responsive navigation links with active state highlighting.
 * - Global search functionality across articles, courses, and contributors.
 * - Dark mode toggle.
 * - Mobile-friendly hamburger menu.
 */
export const Header: React.FC = () => {
  const { isDark, toggle } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "disclaimer" | "cookies" | "privacy" | null
  >(null);
  const location = useLocation();

  const navLinks = [
    {
      name: "Home",
      path: "/",
      color: "text-medical-primary",
      hover: "hover:text-slate-950 dark:hover:text-slate-50",
    },
    {
      name: "Med-Courses",
      path: "/courses",
      color: "text-courses-primary",
      hover: "hover:text-slate-950 dark:hover:text-slate-50",
    },
    {
      name: "Med-Blog",
      path: "/blog",
      color: "text-blog-primary",
      hover: "hover:text-slate-950 dark:hover:text-slate-50",
    },
    {
      name: "Contact",
      path: "/contact",
      color: "text-medical-primary",
      hover: "hover:text-slate-950 dark:hover:text-slate-50",
    },
    {
      name: "About Medliz",
      path: "/about",
      color: "text-medical-primary",
      hover: "hover:text-slate-950 dark:hover:text-slate-50",
    },
  ];

  const filteredResults =
    searchQuery.length > 2
      ? [
          ...POSTS_DATA.filter((p) => {
            const postContributors = CONTRIBUTORS.filter((c) =>
              p.metadata.contributorId.includes(c.id),
            );
            return (
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.metadata.tags.some((t) =>
                t.toLowerCase().includes(searchQuery.toLowerCase()),
              ) ||
              postContributors.some((c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
            );
          }).map((p) => ({ ...p, type: "Article", link: `/blog/${p.slug}` })),
          ...COURSES_DATA.filter((c) => {
            const courseContributors = CONTRIBUTORS.filter((cont) =>
              c.metadata.contributorId.includes(cont.id),
            );
            return (
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.metadata.tags.some((t) =>
                t.toLowerCase().includes(searchQuery.toLowerCase()),
              ) ||
              courseContributors.some((cont) =>
                cont.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
            );
          }).map((c) => ({
            ...c,
            type: "Course",
            link: `/courses/${c.slug}`,
          })),
          ...CONTRIBUTORS.filter((c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ).map((c) => ({ ...c, type: "Contributor", link: "/about" })),
        ]
      : [];

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const handleOpenPolicy = (e: Event) => {
      const policy = (e as CustomEvent).detail;
      if (
        policy === "disclaimer" ||
        policy === "privacy" ||
        policy === "cookies"
      ) {
        setActiveModal(policy);
      }
    };
    window.addEventListener("open-policy-modal", handleOpenPolicy);
    return () =>
      window.removeEventListener("open-policy-modal", handleOpenPolicy);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkColor = (link: any) => {
    const isActive = location.pathname === link.path;
    if (isActive) return link.color;
    return "text-zinc-600 dark:text-zinc-400";
  };

  const getThemeColorVar = (path: string) => {
    if (path === "/courses") return "var(--color-courses-primary)";
    if (path === "/blog") return "var(--color-blog-primary)";
    return "var(--color-medical-primary)";
  };

  const typeColorScheme = (type: string) => {
    switch (type) {
      case "article":
        return {
          typeBackground: isDark
            ? "bg-site-auxiliary-purple-shade"
            : "bg-site-auxiliary-purple-tint",
          typeText: "text-blog-primary",
          typeBorder: isDark
            ? "border-site-auxiliary-purple-tint"
            : "border-site-auxiliary-purple-shade",
        };
      case "course":
        return {
          typeBackground: isDark
            ? "bg-site-auxiliary-green-shade"
            : "bg-site-auxiliary-green-tint",
          typeText: "text-courses-primary",
          typeBorder: isDark
            ? "border-site-auxiliary-green-tint"
            : "border-site-auxiliary-green-shade",
        };
      default:
        return {
          typeBackground: isDark
            ? "bg-site-auxiliary-blue-shade"
            : "bg-site-auxiliary-blue-tint",
          typeText: "text-medical-primary",
          typeBorder: isDark
            ? "border-site-auxiliary-blue-tint"
            : "border-site-auxiliary-blue-shade",
        };
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300">
      <motion.div
        layout
        initial={false}
        animate={{
          width: isScrolled ? "95%" : "100%",
          maxWidth: isScrolled ? "1200px" : "100%",
          borderRadius: isScrolled ? "100px" : "0px",
          marginTop: isScrolled ? "1rem" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
          layout: { duration: 0.3 },
        }}
        className={`glass-header pointer-events-auto h-20 shadow-lg relative overflow-visible ${isScrolled ? "scrolled border border-white/20 dark:border-white/10 px-4 md:px-8" : ""}`}
      >
        <div className="h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center group h-12">
              <img
                src={
                  isDark
                    ? "/visualAssets/vectors/dark-mode-logo-medliz.svg"
                    : "/visualAssets/vectors/light-mode-logo-medliz.svg"
                }
                alt="Medliz Logo"
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors relative flex items-center gap-1.5 ${isActive ? "cursor-default" : `group ${link.hover}`} ${getLinkColor(link)}`}
                    onClick={(e) => {
                      if (isActive) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <span className="flex items-center justify-center w-4 h-4">
                      {isActive && (
                        <span className="text-current text-[10px]">◉</span>
                      )}
                    </span>
                    <span className="relative py-1">
                      {link.name}
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{
                          backgroundColor: getThemeColorVar(link.path),
                          boxShadow: `0 0 10px ${getThemeColorVar(link.path)}, 0 0 4px ${getThemeColorVar(link.path)}`,
                        }}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors glow-border"
                style={
                  {
                    "--glow-color": "var(--color-medical-primary)",
                  } as React.CSSProperties
                }
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggle}
                className="relative h-10 rounded-full transition-all duration-500 glow-border flex items-center border border-zinc-200 dark:border-zinc-800 group"
                style={
                  {
                    "--glow-color": "var(--color-medical-primary)",
                    background: isDark
                      ? "linear-gradient(to right, #001f26, #00191e)"
                      : "linear-gradient(to right, #f1f9fe, #f4fafe)",
                  } as React.CSSProperties
                }
              >
                {/* Mobile version (Icon only) */}
                <div className="md:hidden flex items-center justify-center w-10 h-10">
                  {isDark ? (
                    <TbMoonFilled size={20} className="text-zinc-100" />
                  ) : (
                    <TbSunLowFilled size={20} className="text-zinc-900" />
                  )}
                </div>

                {/* Desktop version (Sliding Toggle) */}
                <div className="hidden md:flex items-center w-[140px] h-full px-1 relative">
                  {/* Text Label */}
                  <span
                    className={`absolute transition-all duration-500 text-[10px] font-bold uppercase tracking-widest ${isDark ? "left-4 text-zinc-100" : "right-4 text-zinc-900"}`}
                  >
                    {isDark ? "Dark Mode" : "Light Mode"}
                  </span>

                  {/* Sliding Thumb */}
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-md relative z-10"
                    style={{
                      background: isDark ? "#f1f9fe" : "#001f26",
                    }}
                    animate={{
                      x: isDark ? 98 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  >
                    {isDark ? (
                      <TbMoonFilled size={18} className="text-zinc-900" />
                    ) : (
                      <TbSunLowFilled size={18} className="text-zinc-100" />
                    )}
                  </motion.div>
                </div>
              </button>

              {/* Policies Dropdown Menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsPolicyOpen(true)}
                onMouseLeave={() => setIsPolicyOpen(false)}
              >
                <button
                  onClick={() => setIsPolicyOpen(!isPolicyOpen)}
                  className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-medical-primary dark:hover:text-medical-primary"
                  style={{ height: "40px", width: "40px" }}
                  title="Policies & Disclaimer"
                >
                  <MdPolicy
                    size={22}
                    className={isPolicyOpen ? "text-medical-primary" : ""}
                  />
                </button>

                <AnimatePresence>
                  {isPolicyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-1 w-56 bg-app-surface border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden pointer-events-auto z-50 flex flex-col"
                    >
                      <button
                        onMouseDown={() => setActiveModal("disclaimer")}
                        className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium text-app-text flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ShieldAlert size={16} className="text-red-500" />
                        Medical Disclaimer
                      </button>
                      <button
                        onMouseDown={() => setActiveModal("privacy")}
                        className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium text-app-text flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <FileText size={16} className="text-blue-500" />
                        Privacy Policy
                      </button>
                      <button
                        onMouseDown={() => setActiveModal("cookies")}
                        className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium text-app-text flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Cookie size={16} className="text-green-500" />
                        Cookie Policy
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-full"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-app-surface border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 text-lg font-medium ${getLinkColor(link)}`}
                      onClick={(e) => {
                        if (isActive) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <span className="flex items-center justify-center w-6 h-6">
                        {isActive && (
                          <span className="text-current text-xl">◉</span>
                        )}
                      </span>
                      <span className="relative py-1">
                        {link.name}
                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-app-surface rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search articles, courses, contributors..."
                  className="flex-1 bg-transparent border-none outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={20} className="text-app-muted" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-4">
                {filteredResults.length > 0 ? (
                  <div className="space-y-2">
                    {filteredResults.map((result: any, idx) => {
                      const typeStyles = typeColorScheme(result.type);
                      return (
                        <Link
                          key={idx}
                          to={result.link}
                          className="block p-3 rounded-xl hover:bg-site-grey-dark-secondary dark:hover:bg-site-grey-light-secondary transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-app-text">
                              {result.title || result.name}
                            </span>
                            <span
                              className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${typeStyles.typeText} ${typeStyles.typeBackground} ${typeStyles.typeBorder}`}
                            >
                              {result.type}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : searchQuery.length > 2 ? (
                  <p className="text-center text-zinc-500 py-8">
                    No results found for "{searchQuery}"
                  </p>
                ) : (
                  <p className="text-center text-zinc-500 py-8">
                    Type at least 3 characters to search...
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Medical Disclaimer Modal */}
      <Modal
        isOpen={activeModal === "disclaimer"}
        onClose={() => setActiveModal(null)}
        title="Medical Disclaimer"
        glowColor="var(--color-error)"
      >
        <div className="space-y-6">
          <div className="flex bg-red-500/10 p-4 rounded-xl items-center gap-3 border border-red-500/20 text-red-500">
            <ShieldAlert size={24} className="shrink-0" />
            <span className="font-bold text-sm">
              Please Read Carefully before proceeding.
            </span>
          </div>
          <div className="prose prose-zinc dark:prose-invert space-y-4 text-app-text leading-relaxed">
            <p>
              The content provided on Medliz, including articles, blog posts,
              courses, and custom newsletters, is intended strictly for
              educational and informational purposes only.
            </p>
            <p className="font-bold">
              It is NOT a substitute for professional medical advice, surgical
              diagnostic consultations, clinical treatments, or professional
              care.
            </p>
            <p>
              Always seek the advice of your personal physician or other
              board-certified health provider with any questions you may have
              regarding health conditions or therapeutics. Never disregard
              professional medical advice or delay seeking care because of
              material or knowledge published on this website.
            </p>
            <p>
              The opinions expressed by contributors are their own and do not
              necessarily reflect the official policies or positions of any
              associated medical institutions or clinics.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => setActiveModal(null)}
              className="glow-border w-full py-3 bg-medical-primary text-white font-bold rounded-xl hover:bg-medical-secondary cursor-pointer transition-colors"
              style={{ "--glow-color": "var(--color-medical-primary)" } as any}
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
        glowColor="var(--color-info)"
      >
        <div className="space-y-6">
          <div className="prose prose-zinc dark:prose-invert space-y-4 text-app-text leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
            <p className="text-sm text-zinc-400">Last Updated: June 2026</p>
            <p>
              Your privacy is extremely important to us. This Privacy Policy
              describes how Medliz processes your personal information when
              utilizing our academic platforms, forms, and services.
            </p>
            <h3 className="font-bold text-base mt-4">
              1. Information We Collect
            </h3>
            <p>
              We collect information that you submit voluntarily via our
              embedded contact and response forms, including your full name,
              email address, and messaging details.
            </p>
            <h3 className="font-bold text-base mt-2">
              2. How We Use Information
            </h3>
            <p>
              We exclusively use the collected details to process and reply to
              inquiries, debug technical platform issues, and customize user
              experiences (such as saving local preferences).
            </p>
            <h3 className="font-bold text-base mt-2">3. Third-Party Sharing</h3>
            <p>
              Medliz does NOT sell, rent, or lease personal identifiers to
              marketing brokers. Contact form entries are secure and accessed
              only by authorized site administrators.
            </p>
            <h3 className="font-bold text-base mt-2">4. Data Security</h3>
            <p>
              We employ proper SSL-secured transport channels, local encryption,
              and server-side data masking guards to ensure user communication
              safety.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => setActiveModal(null)}
              className="glow-border w-full py-3 bg-medical-primary text-white font-bold rounded-xl hover:bg-medical-secondary cursor-pointer transition-colors"
              style={{ "--glow-color": "var(--color-medical-primary)" } as any}
            >
              Close Policy
            </button>
          </div>
        </div>
      </Modal>

      {/* Cookie Policy Modal */}
      <Modal
        isOpen={activeModal === "cookies"}
        onClose={() => setActiveModal(null)}
        title="Cookie Policy"
        glowColor="var(--color-success)"
      >
        <div className="space-y-6">
          <div className="prose prose-zinc dark:prose-invert space-y-4 text-app-text leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
            <p className="text-sm text-zinc-400">Last Updated: June 2026</p>
            <p>
              Medliz uses cookies and similar tracking technologies to improve
              our academic services, site response speeds, and dark/light color
              themes.
            </p>
            <h3 className="font-bold text-base mt-4">1. What are Cookies?</h3>
            <p>
              Cookies are small text structures placed on your device to help
              web browsers remember user states and configurations across single
              or multiple site sessions.
            </p>
            <h3 className="font-bold text-base mt-2">2. How We Use Cookies</h3>
            <p>
              We rely strictly on essential session cookies and persistent
              preference cookies to preserve your theme selection (Dark Mode /
              Light Mode) and tracking of search history within the session.
            </p>
            <h3 className="font-bold text-base mt-2">
              3. Analytical Integration
            </h3>
            <p>
              Anonymized analytical telemetry may be logged to understand user
              traffic behaviors and optimize loading priorities of article
              carousels.
            </p>
            <h3 className="font-bold text-base mt-2">4. Governing Choices</h3>
            <p>
              You can disable cookies at any time via your browser settings.
              Please note that certain features, such as preserving your dark
              mode toggle preference, may not behave correctly with cookies
              offline.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => setActiveModal(null)}
              className="glow-border w-full py-3 bg-medical-primary text-white font-bold rounded-xl hover:bg-medical-secondary cursor-pointer transition-colors"
              style={{ "--glow-color": "var(--color-medical-primary)" } as any}
            >
              Close Policy
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
};
