import React, { useState } from "react";
import { motion } from "framer-motion";
import { POSTS_DATA } from "../data";
import { clsx } from "clsx";
import { BlogCard } from "../components/Cards";
import { HeroSection } from "../components/HeroSection";
import MarkerUnderline from "../components/MarkerUnderline";

/**
 * Med-Blog Page.
 * Features:
 * - Dynamic filtering by tags and time periods.
 * - Sorting by date (newest/oldest).
 * - Grid of blog post cards.
 */
export const MedBlog: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortByDate, setSortByDate] = useState<"newest" | "oldest" | null>(
    null,
  );
  const [dateFilter, setDateFilter] = useState<
    "all" | "last30" | "last180" | "thisYear"
  >("all");
  const allTags = Array.from(
    new Set(POSTS_DATA.flatMap((p) => p.metadata.tags)),
  );

  const now = new Date("2026-03-07");

  let filteredPosts = POSTS_DATA.filter((p) => {
    const postDate = new Date(p.metadata.publishedDate);
    const tagMatch = !selectedTag || p.metadata.tags.includes(selectedTag);

    let dateMatch = true;
    if (dateFilter === "last30") {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      dateMatch = postDate >= thirtyDaysAgo;
    } else if (dateFilter === "last180") {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      dateMatch = postDate >= sixMonthsAgo;
    } else if (dateFilter === "thisYear") {
      dateMatch = postDate.getFullYear() === now.getFullYear();
    }

    return tagMatch && dateMatch;
  });

  if (sortByDate === "newest") {
    filteredPosts = [...filteredPosts].sort(
      (a, b) =>
        new Date(b.metadata.publishedDate).getTime() -
        new Date(a.metadata.publishedDate).getTime(),
    );
  } else if (sortByDate === "oldest") {
    filteredPosts = [...filteredPosts].sort(
      (a, b) =>
        new Date(a.metadata.publishedDate).getTime() -
        new Date(b.metadata.publishedDate).getTime(),
    );
  }

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <HeroSection
        image="/visualAssets/images/avif/hero-background-blog.avif"
        pill={
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-blog-primary to-blog-hover text-[var(--color-hero-pill-text)] border border-[var(--color-hero-pill-border-light)] dark:border-[var(--color-hero-pill-border-dark)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.3)]">
            Med-Blog: Insights from Medical Practitioners
          </span>
        }
        title={
          <>
            Engage with Riveting{" "}
            <MarkerUnderline
              underlineVar="--color-auxiliary-purple-neutral"
              textVar="--color-blog-primary"
            >
              First-hand
            </MarkerUnderline>{" "}
            Insights
          </>
        }
        description="Dive into professional opinion pieces and real-world reflections shared by practitioners from across the medical field."
        contentRight={
          <img
            src="/visualAssets/images/avif/hero-foreground-blog.avif"
            alt="Blog Hero"
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
                  ? "bg-blog-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
              )}
              style={{ "--glow-color": "var(--color-blog-primary)" } as any}
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
                    ? "bg-blog-primary text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
                )}
                style={{ "--glow-color": "var(--color-blog-primary)" } as any}
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
                    ? "bg-blog-primary text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
                )}
                style={{ "--glow-color": "var(--color-blog-primary)" } as any}
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
                  ? "bg-blog-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200",
              )}
              style={{ "--glow-color": "var(--color-blog-primary)" } as any}
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
                  ? "bg-blog-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 hover:text-blog-hover",
              )}
              style={{ "--glow-color": "var(--color-blog-primary)" } as any}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-md"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
