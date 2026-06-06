import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { POSTS_DATA, CONTRIBUTORS } from "../data";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import {
  Clock,
  Star,
  Calendar,
  MessageSquare,
  ArrowLeft,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  PhoneCall,
  Mail,
} from "lucide-react";
import { FeedbackForm } from "../components/FeedbackForm";
import { ContactItem } from "../components/ContactItem";

/**
 * Article Detail Page.
 * Features:
 * - Fetches and renders markdown content from a path.
 * - Displays contributor info and social links.
 * - Includes a feedback form and recommended articles.
 */
export const ArticleDetail: React.FC = () => {
  const { slug } = useParams();
  const post = POSTS_DATA.find((p) => p.slug === slug);
  const contributors = CONTRIBUTORS.filter((c) =>
    post?.metadata.contributorId.includes(c.id),
  );
  const [content, setContent] = useState("# Loading article...");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    if (post?.contentPath) {
      setIsLoading(true);
      setError(null);
      fetch(post.contentPath)
        .then((res) => {
          if (!res.ok)
            throw new Error(
              `Failed to load content: ${res.status} ${res.statusText}`,
            );
          return res.text();
        })
        .then((text) => {
          setContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load article:", err);
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [post]);

  if (!post) return <div className="p-20 text-center">Article not found</div>;

  const recommended = POSTS_DATA.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 body-md text-app-muted hover:text-medical-primary mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Med-Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 1. Cover Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[300px] md:h-[500px] object-cover rounded-[2.5rem] mb-12 shadow-sm"
            referrerPolicy="no-referrer"
          />

          {/* 2. Title */}
          <h1 className="display-lg text-app-text mb-8 leading-tight">
            {post.title}
          </h1>

          {/* 3. Tags Row */}
          <div className="flex flex-wrap gap-3 mb-8">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-blog-primary/10 text-blog-primary text-[11px] font-bold rounded-full uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
            {post.metadata.useofAI && (
              <span className="px-4 py-1.5 bg-blog-primary/10 text-blog-primary text-[11px] font-bold rounded-full uppercase tracking-wider">
                GenAI Involved
              </span>
            )}
          </div>

          {/* 4. Metadata Row - Evenly Spaced */}
          <div className="flex items-center justify-between body-md text-app-muted font-medium mb-8 pb-4 border-b border-app-border">
            <div className="flex items-center gap-2">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span>{post.metadata.rating || "N/A"}</span>
              {post.metadata.reviewCount && (
                <span className="text-zinc-400">
                  ({post.metadata.reviewCount} reviews)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>
                {new Date(post.metadata.publishedDate).toLocaleDateString(
                  "en-GB",
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>
                {post.metadata.duration} {post.metadata.durationUnit} read
              </span>
            </div>
          </div>

          {/* 5. Authors Row */}
          <div className="flex flex-wrap gap-8 mb-4">
            {contributors.map((contributor) => (
              <div key={contributor.id} className="flex items-center gap-3">
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-app-text text-sm">
                    {contributor.name}
                  </span>
                  {contributor.credentials &&
                    contributor.credentials.length > 0 && (
                      <span className="text-[10px] text-zinc-400 italic mb-1">
                        {contributor.credentials[0]}
                      </span>
                    )}
                  <div className="flex flex-wrap gap-1">
                    {contributor.socials?.linkedin && (
                      <ContactItem
                        icon={Linkedin}
                        href={contributor.socials.linkedin}
                        label="LinkedIn"
                        colorClass="text-zinc-400 hover:text-blog-primary"
                        size={16}
                      />
                    )}
                    {contributor.socials?.twitter && (
                      <ContactItem
                        icon={Twitter}
                        href={contributor.socials.twitter}
                        label="Twitter"
                        colorClass="text-zinc-400 hover:text-blog-primary"
                        size={16}
                      />
                    )}
                    {contributor.socials?.instagram && (
                      <ContactItem
                        icon={Instagram}
                        href={contributor.socials.instagram}
                        label="Instagram"
                        colorClass="text-zinc-400 hover:text-blog-primary"
                        size={16}
                      />
                    )}
                    {contributor.socials?.facebook && (
                      <ContactItem
                        icon={Facebook}
                        href={contributor.socials.facebook}
                        label="Facebook"
                        colorClass="text-zinc-400 hover:text-blog-primary"
                        size={16}
                      />
                    )}
                    {contributor.socials?.email && (
                      <ContactItem
                        icon={Mail}
                        href={`mailto:${contributor.socials.email}`}
                        label={contributor.socials.email}
                        colorClass="text-zinc-400 hover:text-blog-primary"
                        size={16}
                      />
                    )}
                    {contributor.socials?.phone && (
                      <ContactItem
                        icon={PhoneCall}
                        href={`tel:${contributor.socials.phone}`}
                        label={contributor.socials.phone}
                        colorClass="text-zinc-400 hover:text-blog-primary"
                        size={16}
                      />
                    )}
                    {contributor.socials?.website && (
                      <ContactItem
                        icon={Globe}
                        href={contributor.socials.website}
                        label="Website"
                        colorClass="text-zinc-400 hover:text-blog-primary"
                        size={16}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6. AI Assisted Message */}
          {post.metadata.useofAI && (
            <p className="body-xs text-app-muted mb-12">
              ⚠️ ARIA GenAI was involved in generating and editing the content
              in this article and then subsequently reviewed by a human editor.
            </p>
          )}

          {/* 7. Content - The 'markdown-body' class here (defined in index.css) controls the body text color for the article */}
          <div className="markdown-body mb-16 max-w-none min-h-[200px] relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-blog-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-zinc-500 font-medium">
                    Loading article content...
                  </p>
                </div>
              </div>
            )}

            {error ? (
              <div className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl text-center">
                <p className="text-red-600 dark:text-red-400 font-bold mb-2">
                  Error Loading Content
                </p>
                <p className="text-red-500/80 text-sm mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </div>

          <div className="flex justify-center mb-24">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="glow-border flex items-center gap-2 px-8 py-4 bg-app-text text-app-bg font-display font-bold rounded-2xl hover:scale-105 transition-transform"
              style={{ "--glow-color": "var(--color-blog-primary)" } as any}
            >
              <MessageSquare size={20} /> Leave Feedback
            </button>
          </div>

          {/* Recommended Section */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
            <h2 className="text-3xl font-display font-bold mb-8">
              Recommended Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {recommended.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="group block"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-display font-bold group-hover:text-medical-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <FeedbackForm
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        subjectName={post.title}
        type="Article"
      />
    </div>
  );
};
