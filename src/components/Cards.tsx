import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Star, ArrowRight, GraduationCap, Calendar } from "lucide-react";
import { CONTRIBUTORS } from "../data";

/**
 * BlogCard Component.
 *
 * Renders a preview card for a medical blog post.
 * Features include hover animations, metadata display (rating, date, duration),
 * and contributor attribution.
 *
 * @param {Object} props - Component props.
 * @param {any} props.post - The blog post data object.
 */
export const BlogCard = ({ post }: { post: any }) => {
  const contributors = CONTRIBUTORS.filter((c) =>
    post.metadata.contributorId.includes(c.id),
  );
  const mainContributor = contributors[0];
  const othersCount = contributors.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glow-border h-full rounded-2xl"
      style={{ "--glow-color": "var(--color-blog-primary)" } as any}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group h-full flex flex-col card-glass-platform pt-2 pb-6 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-6 mx-2">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Topic Tags */}
          <div className="absolute bottom-3 left-3 flex gap-1.5 max-w-[calc(100%-100px)]">
            {post.metadata.tags
              .slice(0, post.metadata.useofAI ? 1 : 2)
              .map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blog-primary text-white text-[10px] font-bold rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            {post.metadata.tags.length > (post.metadata.useofAI ? 1 : 2) && (
              <span className="px-2 py-1 bg-blog-primary text-white text-[10px] font-bold rounded-full whitespace-nowrap">
                +{post.metadata.tags.length - (post.metadata.useofAI ? 1 : 2)}
              </span>
            )}
          </div>

          {/* AI Assisted Tag */}
          {post.metadata.useofAI && (
            <div className="absolute bottom-3 right-3 px-3 py-1 bg-blog-primary text-white text-[10px] font-bold rounded-full">
              GenAI Involved
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow space-y-3 px-3">
          {/* Metadata Row - Evenly Spaced */}
          <div className="flex items-center justify-between body-xs text-app-muted font-medium">
            <div className="flex items-center gap-3">
              {post.metadata.rating && (
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />{" "}
                  {post.metadata.rating}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />{" "}
                {new Date(post.metadata.publishedDate).toLocaleDateString(
                  "en-GB",
                )}
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.metadata.duration}{" "}
              {post.metadata.durationUnit}
            </span>
          </div>

          {/* Author Row */}
          {mainContributor && (
            <div className="flex items-center gap-2">
              <img
                src={mainContributor.image}
                alt={mainContributor.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <div className="flex items-center gap-1">
                <span className="body-xs font-bold text-app-muted">
                  {mainContributor.name}
                </span>
                {othersCount > 0 && (
                  <span className="flex items-center justify-center w-4 h-4 bg-blog-primary text-white text-[8px] font-bold rounded-full">
                    +{othersCount}
                  </span>
                )}
              </div>
            </div>
          )}

          <h3 className="heading-md text-app-text leading-tight group-hover:text-blog-primary transition-colors">
            {post.title}
          </h3>
          <p className="body-sm text-app-muted line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-4 flex justify-center">
            <span className="text-blog-primary font-bold text-sm flex items-center gap-1 hover:underline hover:decoration-dashed transition-all">
              Read Full Post
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/**
 * CourseCard Component.
 *
 * Renders a preview card for an educational medical course.
 * Highlights difficulty level, duration, and key topics.
 *
 * @param {Object} props - Component props.
 * @param {any} props.course - The course data object.
 */
export const CourseCard = ({ course }: { course: any }) => {
  const contributors = CONTRIBUTORS.filter((c) =>
    course.metadata.contributorId.includes(c.id),
  );
  const mainContributor = contributors[0];
  const othersCount = contributors.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glow-border h-full rounded-2xl"
      style={{ "--glow-color": "var(--color-courses-primary)" } as any}
    >
      <Link
        to={`/courses/${course.slug}`}
        className="group h-full flex flex-col card-glass-platform pt-2 pb-6 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-6 mx-2">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Difficulty Tag */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-white text-[10px] font-bold uppercase tracking-wider rounded-md text-courses-primary shadow-sm">
            {course.difficulty}
          </div>

          {/* Topic Tags */}
          <div className="absolute bottom-3 left-3 flex gap-1.5 max-w-[calc(100%-100px)]">
            {course.metadata.tags
              .slice(0, course.metadata.useofAI ? 1 : 2)
              .map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-courses-primary text-white text-[10px] font-bold rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            {course.metadata.tags.length >
              (course.metadata.useofAI ? 1 : 2) && (
              <span
                key="more"
                className="px-2 py-1 bg-courses-primary text-white text-[10px] font-bold rounded-full whitespace-nowrap"
              >
                +
                {course.metadata.tags.length -
                  (course.metadata.useofAI ? 1 : 2)}
              </span>
            )}
          </div>

          {/* AI Assisted Tag */}
          {course.metadata.useofAI && (
            <div className="absolute bottom-3 right-3 px-3 py-1 bg-courses-primary text-white text-[10px] font-bold rounded-full">
              GenAI Involved
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow space-y-3 px-3">
          {/* Metadata Row - Evenly Spaced */}
          <div className="flex items-center justify-between body-xs text-app-muted font-medium">
            <div className="flex items-center gap-3">
              {course.metadata.rating && (
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  {course.metadata.rating}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />{" "}
                {new Date(course.metadata.publishedDate).toLocaleDateString(
                  "en-GB",
                )}
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {course.duration} {course.durationUnit}
            </span>
          </div>

          {/* Author Row */}
          {mainContributor && (
            <div className="flex items-center gap-2">
              <img
                src={mainContributor.image}
                alt={mainContributor.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <div className="flex items-center gap-1">
                <span className="body-xs font-bold text-app-muted">
                  {mainContributor.name}
                </span>
                {othersCount > 0 && (
                  <span className="flex items-center justify-center w-4 h-4 bg-courses-primary text-white text-[8px] font-bold rounded-full">
                    +{othersCount}
                  </span>
                )}
              </div>
            </div>
          )}

          <h3 className="heading-md text-app-text leading-tight group-hover:text-courses-primary transition-colors">
            {course.title}
          </h3>
          <p className="body-sm text-app-muted line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          <div className="mt-auto pt-6 flex justify-center">
            <span className="text-courses-primary font-bold text-sm flex items-center gap-1 hover:underline hover:decoration-dashed transition-all">
              Open Course
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
