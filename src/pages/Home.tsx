import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  PhoneCall,
  Globe,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { GrArticle } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";
import { Link } from "react-router-dom";
import { POSTS_DATA, COURSES_DATA, CONTRIBUTORS, INFO_NOTICES } from "../data";
import { BlogCard, CourseCard } from "../components/Cards";
import { ContactItem } from "../components/ContactItem";
import { SponsorBanner } from "../components/SponsorBanner";
import { Modal } from "../components/Modal";
import { HeroSection } from "../components/HeroSection";
import MarkerUnderline from "../components/MarkerUnderline";
import { Contributor } from "../types";
import { ContributorCard } from "../components/ContributorCard";
import { ContributorCarousel } from "../components/ContributorCarousel";
import { clsx } from "clsx";

/**
 * Home Page Component.
 * Features:
 * - Hero section with call-to-action buttons.
 * - Key notices carousel/noticeboard section.
 * - Previews of latest blog posts and courses.
 */
export const Home: React.FC = () => {
  const [activeNotice, setActiveNotice] = useState(0);
  const [selectedNotice, setSelectedNotice] = useState<
    (typeof INFO_NOTICES)[0] | null
  >(null);
  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>(null);
  const latestPosts = [...POSTS_DATA]
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedDate).getTime() -
        new Date(a.metadata.publishedDate).getTime(),
    )
    .slice(0, 3);
  const latestCourses = [...COURSES_DATA]
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedDate).getTime() -
        new Date(a.metadata.publishedDate).getTime(),
    )
    .slice(0, 3);
  const benefactors = CONTRIBUTORS.filter((c) => c.type === "Benefactor");

  const nextNotice = () =>
    setActiveNotice((prev) => (prev + 1) % INFO_NOTICES.length);
  const prevNotice = () =>
    setActiveNotice(
      (prev) => (prev - 1 + INFO_NOTICES.length) % INFO_NOTICES.length,
    );
  const currentNotice = INFO_NOTICES[activeNotice];

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <HeroSection
        image="/visualAssets/images/avif/hero-background-home.avif"
        overlayOpacity="dark"
        title={
          <>
            Forge Your Future with{" "}
            <MarkerUnderline
              underlineVar="--color-home-hero-underline"
              textVar="--color-home-hero-text"
            >
              Expert-Led
            </MarkerUnderline>{" "}
            Medical Content
          </>
        }
        description="Master clinical skills and stay updated with the latest medical research through our comprehensive education portal and expert-curated insights."
        contentRight={
          <img
            src="/visualAssets/images/avif/hero-foreground-home.avif"
            alt="Medical Hero"
            className="w-full h-auto max-h-[500px] object-contain object-bottom"
            referrerPolicy="no-referrer"
          />
        }
      >
        {/* Buttons — side by side on larger screens */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto justify-center">
          <Link
            to="/blog"
            className="glow-border hover:opacity-90 group flex-1 text-[var(--color-hero-btn-text-light)] hover:text-[var(--color-hero-btn-hover-blog)]"
            style={
              {
                "--glow-color": "var(--color-blog-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "16px 32px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, var(--color-hero-btn-dark-start), var(--color-hero-btn-dark-end))",
                fontWeight: "700",
                fontSize: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "all 0.2s",
                textDecoration: "none",
              } as any
            }
          >
            <GrArticle size={20} /> Read Articles
          </Link>

          <Link
            to="/courses"
            className="glow-border hover:opacity-90 group flex-1 text-[var(--color-hero-btn-text-dark)] hover:text-[var(--color-hero-btn-hover-courses)]"
            style={
              {
                "--glow-color": "var(--color-courses-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "16px 32px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, var(--color-hero-btn-light-start), var(--color-hero-btn-light-end))",
                fontWeight: "700",
                fontSize: "16px",
                border: "1px solid rgba(0,0,0,0.05)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "all 0.2s",
                textDecoration: "none",
              } as any
            }
          >
            <GiTeacher size={22} /> Explore Courses
          </Link>
        </div>
      </HeroSection>

      {/* Important Notices Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="display-md text-app-text mb-2">
            Important <span className="text-medical-primary">Notices</span>
          </h2>
          <p className="body-md text-app-muted max-w-2xl mx-auto">
            Stay updated with the latest health alerts, announcements, and
            medical updates.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNotice}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedNotice(currentNotice)}
                className="glow-border w-full text-left rounded-3xl cursor-pointer"
                style={
                  {
                    "--glow-color":
                      currentNotice.type === "notice"
                        ? "var(--color-error)"
                        : currentNotice.type === "tip"
                          ? "var(--color-success)"
                          : "var(--color-info)",
                  } as any
                }
              >
                <div className="card-glass-platform p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-sm">
                  <div
                    className={clsx(
                      "w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center",
                      currentNotice.type === "tip"
                        ? "bg-green-500/10 text-green-500"
                        : currentNotice.type === "notice"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-blue-500/10 text-blue-500",
                    )}
                  >
                    <AlertCircle size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="heading-xl text-app-text mb-1">
                      {currentNotice.title}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 mb-4 body-sm text-app-muted">
                      <span>{currentNotice.noticeDate}</span>
                      <span className="hidden md:inline">•</span>
                      {currentNotice.sourceLink ? (
                        <a
                          href={currentNotice.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-medical-primary hover:underline font-medium"
                        >
                          Source: {currentNotice.source}
                        </a>
                      ) : (
                        <span>Source: {currentNotice.source}</span>
                      )}
                    </div>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">
                      {currentNotice.content}
                    </p>
                    <div className="text-medical-primary font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:underline hover:decoration-dashed transition-all">
                      See More
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevNotice}
              className="glow-border p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-app-text transition-colors shadow-sm cursor-pointer animate-none"
              style={{ "--glow-color": "var(--color-info)" } as any}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextNotice}
              className="glow-border p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-app-text transition-colors shadow-sm cursor-pointer animate-none"
              style={{ "--glow-color": "var(--color-info)" } as any}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Notice Modal */}
      <Modal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        title="Important Notice"
        glowColor={
          selectedNotice?.type === "tip"
            ? "var(--color-success)"
            : selectedNotice?.type === "notice"
              ? "var(--color-error)"
              : "var(--color-info)"
        }
      >
        {selectedNotice && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div
                className={clsx(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  selectedNotice.type === "tip"
                    ? "bg-green-500/10 text-green-500"
                    : selectedNotice.type === "notice"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-blue-500/10 text-blue-500",
                )}
              >
                <AlertCircle size={24} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-bold text-app-text">
                  {selectedNotice.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 dark:text-zinc-500">
                  <span>{selectedNotice.noticeDate}</span>
                  <span>•</span>
                  {selectedNotice.sourceLink ? (
                    <a
                      href={selectedNotice.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-medical-primary hover:underline font-medium"
                    >
                      Source: {selectedNotice.source}
                    </a>
                  ) : (
                    <span>Source: {selectedNotice.source}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl font-medium text-app-text leading-relaxed">
                {selectedNotice.content}
              </p>
              {selectedNotice.details && (
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {selectedNotice.details}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={() => setSelectedNotice(null)}
                className="glow-border w-full py-4 bg-medical-primary text-white font-bold rounded-xl hover:bg-medical-primary/90 transition-colors cursor-pointer"
                style={
                  {
                    "--glow-color":
                      selectedNotice.type === "tip"
                        ? "var(--color-success)"
                        : selectedNotice.type === "notice"
                          ? "var(--color-error)"
                          : "var(--color-info)",
                  } as any
                }
              >
                Close Notice
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Latest Articles */}
      <section className="bg-app-surface pt-20 pb-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 text-center md:text-left">
            <div className="w-full">
              <h2 className="heading-xl text-app-text mb-2 text-center">
                Latest Med-Blog Posts
              </h2>
              <p className="body-md text-app-muted text-center max-w-2xl mx-auto">
                Our most recent medical research and articles.
              </p>
            </div>
            <Link
              to="/blog"
              className="text-medical-primary font-bold flex items-center gap-2 hover:underline mt-4 md:mt-0 whitespace-nowrap"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-md"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Courses */}
      <section className="bg-app-surface pt-10 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 text-center md:text-left">
            <div className="w-full">
              <h2 className="heading-xl text-app-text mb-2 text-center">
                New Courses
              </h2>
              <p className="body-md text-app-muted text-center max-w-2xl mx-auto">
                Recently added professional medical training.
              </p>
            </div>
            <Link
              to="/courses"
              className="text-medical-primary font-bold flex items-center gap-2 hover:underline mt-4 md:mt-0 whitespace-nowrap"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {latestCourses.map((course) => (
              <div
                key={course.id}
                className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-md"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefactors Section */}
      <section className="bg-app-surface/30 py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="display-md text-app-text mb-2 text-center w-full">
              Our <span className="text-medical-primary">Benefactors</span>
            </h2>
            <p className="body-md text-app-muted max-w-2xl mx-auto text-center">
              We are grateful for the support of these organizations who help us
              maintain our high standards of medical education.
            </p>
          </div>

          <ContributorCarousel
            contributors={benefactors}
            onContributorClick={(c) => setSelectedContributor(c)}
            glowColor="var(--color-accent-gold)"
          />

          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="glow-border px-8 py-4 bg-medical-primary text-white font-display font-bold rounded-xl transition-all inline-flex items-center gap-2"
              style={{ "--glow-color": "var(--color-medical-primary)" } as any}
            >
              Learn More About Us <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsor Banner Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center">
          <h2 className="display-md text-app-text mb-2">Advertisements</h2>
        </div>
      </section>
      <div className="pb-20">
        <SponsorBanner />
      </div>

      {/* Benefactor Modal */}
      <Modal
        isOpen={!!selectedContributor}
        onClose={() => setSelectedContributor(null)}
        title="Benefactor Profile"
      >
        {selectedContributor && (
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center gap-6">
              <img
                src={selectedContributor.image}
                alt={selectedContributor.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-medical-primary/10"
              />
              <div>
                <h3 className="text-3xl font-display font-bold mb-2">
                  {selectedContributor.name}
                </h3>
                <div className="text-medical-primary font-bold mb-4">
                  {selectedContributor.role}
                </div>
                <div className="flex justify-center flex-wrap gap-3">
                  {selectedContributor.socials?.linkedin && (
                    <ContactItem
                      icon={Linkedin}
                      href={selectedContributor.socials.linkedin}
                      label="LinkedIn"
                      colorClass="glow-border p-3 bg-app-surface border border-app-border rounded-xl text-app-muted hover:text-medical-primary transition-all"
                    />
                  )}
                  {selectedContributor.socials?.twitter && (
                    <ContactItem
                      icon={Twitter}
                      href={selectedContributor.socials.twitter}
                      label="Twitter"
                      colorClass="glow-border p-3 bg-app-surface border border-app-border rounded-xl text-app-muted hover:text-medical-primary transition-all"
                    />
                  )}
                  {selectedContributor.socials?.website && (
                    <ContactItem
                      icon={Globe}
                      href={selectedContributor.socials.website}
                      label="Website"
                      colorClass="glow-border p-3 bg-app-surface border border-app-border rounded-xl text-app-muted hover:text-medical-primary transition-all"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="body-lg leading-relaxed">
                {selectedContributor.fullBio || selectedContributor.bio}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
