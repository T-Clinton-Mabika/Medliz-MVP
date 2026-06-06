import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { SiGmail } from "react-icons/si";
import { useDarkMode } from "../hooks";

/**
 * Global Footer Component.
 * Redesigned as a floating "Island" component with specific gradients
 * and a layout inspired by modern design patterns.
 */
export const Footer: React.FC = () => {
  const { isDark } = useDarkMode();
  const location = useLocation();

  const getBackgroundImage = () => {
    const path = location.pathname;
    if (path.startsWith("/blog")) {
      return isDark
        ? "/visualAssets/images/webp/footer-background-blog-dark-mode.webp"
        : "/visualAssets/images/webp/footer-background-blog-light-mode.webp";
    }
    if (path.startsWith("/courses")) {
      return isDark
        ? "/visualAssets/images/webp/footer-background-courses-dark-mode.webp"
        : "/visualAssets/images/webp/footer-background-courses-light-mode.webp";
    }
    return isDark
      ? "/visualAssets/images/webp/footer-background-general-dark-mode.webp"
      : "/visualAssets/images/webp/footer-background-general-light-mode.webp";
  };

  const getThemeColorVar = (path: string) => {
    if (path.startsWith("/courses")) return "var(--color-courses-primary)";
    if (path.startsWith("/blog")) return "var(--color-blog-primary)";
    return "var(--color-medical-primary)";
  };

  const navLinks = [
    { to: "/", label: "Homepage" },
    { to: "/courses", label: "Med-Courses" },
    { to: "/blog", label: "Med-Blog" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.to === "/") {
      return location.pathname !== "/";
    }
    return !location.pathname.startsWith(link.to);
  });

  const legalLinks = [
    { type: "cookies", label: "Cookie Policy" },
    { type: "privacy", label: "Privacy Policy" },
    { type: "disclaimer", label: "Medical Disclaimer" },
  ];

  const socialLinks = [
    { icon: <SiGmail size={18} />, href: "mailto:medlizportal@gmail.com" },
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/elizabeth-r-mushambi-ba431553/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BdMA7tfmZRx6Tm95cmiuFmg%3D%3D",
    },
  ];

  return (
    <footer
      className="relative py-12 md:py-20 overflow-hidden"
      style={{
        backgroundImage: `url("${getBackgroundImage()}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Island Footer */}
        <div className="rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-14 lg:p-16 shadow-2xl border border-white/10 dark:border-white/5 flex flex-col items-center text-center bg-app-bg">
          {/* Top Section: Centered Logo */}
          <div className="flex justify-center mb-10 w-full">
            <Link to="/" className="flex items-center group h-36 md:h-28">
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
          </div>

          {/* Middle Section: Mission Statement */}
          <div className="mb-10 max-w-2xl px-4">
            <p className="text-lg md:text-xl font-medium leading-relaxed text-app-text opacity-90">
              Our mission is to empower medical professionals with clinical
              skills, research-driven insights, and the latest medical education
              to lead with excellence.
            </p>
          </div>

          {/* Navigation Links: Quick Links followed by Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 mb-14 px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="text-sm font-bold uppercase tracking-wider text-app-text/90 transition-colors group relative py-1 hover:text-slate-950 dark:hover:text-slate-50"
                >
                  <span>{link.label}</span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{
                      backgroundColor: getThemeColorVar(link.to),
                      boxShadow: `0 0 10px ${getThemeColorVar(link.to)}, 0 0 4px ${getThemeColorVar(link.to)}`,
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Visual separator on larger screens */}
            {filteredNavLinks.length > 0 && (
              <div className="hidden lg:block w-px h-6 bg-app-text opacity-20" />
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {legalLinks.map((link) => (
                <button
                  key={link.type + link.label}
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-policy-modal", {
                        detail: link.type,
                      }),
                    )
                  }
                  className="text-sm font-bold uppercase tracking-wider text-app-text/80 transition-colors opacity-80 hover:opacity-100 group relative py-1 hover:text-slate-950 dark:hover:text-slate-50 cursor-pointer bg-transparent border-none outline-none"
                >
                  <span>{link.label}</span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{
                      backgroundColor: "var(--color-medical-primary)",
                      boxShadow:
                        "0 0 10px var(--color-medical-primary), 0 0 4px var(--color-medical-primary)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Divider Line */}
          <div
            className={`w-full h-px ${isDark ? "bg-white" : "bg-black"} opacity-10 mb-8`}
          />

          {/* Bottom Row: Copyright & Socials */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-medium text-app-muted">
              <span>Copyright 2026 © Medliz, All Rights Reserved.</span>
              <span className="hidden sm:inline opacity-30">|</span>
              <div className="flex items-center gap-1">
                <span>Designed by Takudzwa Clinton Mabika (Voldr)</span>
                <span className="flex items-center group h-6">
                  <img
                    src={
                      isDark
                        ? "/visualAssets/vectors/dark-mode-voldr-logo.svg"
                        : "/visualAssets/vectors/light-mode-voldr-logo.svg"
                    }
                    alt="Voldr Logo"
                    className="h-full w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </div>
              <span className="hidden sm:inline opacity-30">|</span>
              <a
                href="mailto:t.clinton.mabika@outlook.com"
                className="hover:text-medical-primary transition-colors"
              >
                Click here to email the designer.
              </a>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="text-app-text opacity-60 hover:opacity-100 hover:text-medical-primary transition-all hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
