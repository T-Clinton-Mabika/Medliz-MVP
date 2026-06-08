import React, { useState } from "react";
import { COURSES_DATA } from "../data";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { CourseCard } from "../components/Cards";
import { HeroSection } from "../components/HeroSection";
import MarkerUnderline from "../components/MarkerUnderline";

/**
 * Med-Courses Page.
 * Features:
 * - Dynamic filtering by tags and time periods.
 * - Sorting by date (newest/oldest).
 * - Grid of educational course cards.
 */
export const MedCourses: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortByDate, setSortByDate] = useState<"newest" | "oldest" | null>(
    null,
  );
  const [dateFilter, setDateFilter] = useState<
    "all" | "last30" | "last180" | "thisYear"
  >("all");
  const allTags = Array.from(
    new Set(COURSES_DATA.flatMap((c) => c.metadata.tags)),
  );

  const now = new Date("2026-03-07");

  let filteredCourses = COURSES_DATA.filter((c) => {
    const courseDate = new Date(c.metadata.publishedDate);
    const tagMatch = !selectedTag || c.metadata.tags.includes(selectedTag);

    let dateMatch = true;
    if (dateFilter === "last30") {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      dateMatch = courseDate >= thirtyDaysAgo;
    } else if (dateFilter === "last180") {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      dateMatch = courseDate >= sixMonthsAgo;
    } else if (dateFilter === "thisYear") {
      dateMatch = courseDate.getFullYear() === now.getFullYear();
    }

    return tagMatch && dateMatch;
  });

  if (sortByDate === "newest") {
    filteredCourses = [...filteredCourses].sort(
      (a, b) =>
        new Date(b.metadata.publishedDate).getTime() -
        new Date(a.metadata.publishedDate).getTime(),
    );
  } else if (sortByDate === "oldest") {
    filteredCourses = [...filteredCourses].sort(
      (a, b) =>
        new Date(a.metadata.publishedDate).getTime() -
        new Date(b.metadata.publishedDate).getTime(),
    );
  }

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <HeroSection
        image="/visualAssets/images/avif/hero-background-courses.avif"
        pill={
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-courses-primary to-courses-hover text-[var(--color-hero-pill-text)] border border-[var(--color-hero-pill-border-light)] dark:border-[var(--color-hero-pill-border-dark)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.3)]">
            Med-Courses: Self-paced interactive medical courses
          </span>
        }
        title={
          <>
            Sharpen Your Skills with{" "}
            <MarkerUnderline
              underlineVar="--color-auxiliary-green-neutral"
              textVar="--color-courses-primary"
            >
              Focused
            </MarkerUnderline>{" "}
            Learning
          </>
        }
        description="Learn at your own pace and test your knowledge through a library of practical courses and interactive quizzes designed for quick revision."
        contentRight={
          <img
            src="/visualAssets/images/avif/hero-foreground-courses.avif"
            alt="Education Hero"
            className="w-full h-auto max-h-[500px] object-contain object-bottom"
            referrerPolicy="no-referrer"
          />
        }
      />

      {/* Filters */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 mb-6 space-y-6">
        <div>
          <h3 className="body-sm font-bold text-app-muted uppercase tracking-wider mb-4">
            Filter by Tag
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTag(null)}
              className={clsx(
                "glow-border px-6 py-2 rounded-full text-sm font-bold transition-all",
                !selectedTag
                  ? "bg-courses-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
              )}
              style={{ "--glow-color": "var(--color-courses-primary)" } as any}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={clsx(
                  "glow-border px-6 py-2 rounded-full text-sm font-bold transition-all",
                  selectedTag === tag
                    ? "bg-courses-primary text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
                )}
                style={
                  { "--glow-color": "var(--color-courses-primary)" } as any
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
            Time Period
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { id: "all", label: "All Time" },
              { id: "last30", label: "Last 30 Days" },
              { id: "last180", label: "Last 6 Months" },
              { id: "thisYear", label: "This Year" },
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setDateFilter(period.id as any)}
                className={clsx(
                  "glow-border px-6 py-2 rounded-full text-sm font-bold transition-all",
                  dateFilter === period.id
                    ? "bg-courses-primary text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
                )}
                style={
                  { "--glow-color": "var(--color-courses-primary)" } as any
                }
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
            Sort by Date
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                setSortByDate(sortByDate === "newest" ? null : "newest")
              }
              className={clsx(
                "glow-border px-6 py-2 rounded-full text-sm font-bold transition-all",
                sortByDate === "newest"
                  ? "bg-courses-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
              )}
              style={{ "--glow-color": "var(--color-courses-primary)" } as any}
            >
              Newest First
            </button>
            <button
              onClick={() =>
                setSortByDate(sortByDate === "oldest" ? null : "oldest")
              }
              className={clsx(
                "glow-border px-6 py-2 rounded-full text-sm font-bold transition-all",
                sortByDate === "oldest"
                  ? "bg-courses-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
              )}
              style={{ "--glow-color": "var(--color-courses-primary)" } as any}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-md"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
