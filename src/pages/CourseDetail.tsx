import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { COURSES_DATA, CONTRIBUTORS } from "../data";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import {
  Clock,
  Star,
  BarChart,
  ArrowLeft,
  Play,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Linkedin,
  Twitter,
  Instagram,
  Users,
  Facebook,
  Globe,
  PhoneCall,
  Mail,
  GraduationCap,
} from "lucide-react";
import { FeedbackForm } from "../components/FeedbackForm";
import { Modal } from "../components/Modal";
import { ContactItem } from "../components/ContactItem";
import { clsx } from "clsx";

/**
 * Course Detail Page.
 * Features:
 * - Course overview with instructor info and syllabus.
 * - Interactive module viewer with markdown content loaded from files.
 * - Integrated quiz system with navigation and feedback.
 */
export const CourseDetail: React.FC = () => {
  const { slug } = useParams();
  const course = COURSES_DATA.find((c) => c.slug === slug);
  const contributors = CONTRIBUTORS.filter((c) =>
    course?.metadata.contributorId.includes(c.id),
  );
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);
  const [moduleContent, setModuleContent] = useState<string>(
    "# Loading module content...",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showQuizIntro, setShowQuizIntro] = useState(true);
  const [quizState, setQuizState] = useState<{
    currentStep: number;
    answers: (number | null)[];
    submitted: boolean;
  }>({ currentStep: 0, answers: [], submitted: false });

  const activeModule =
    activeModuleIdx !== null ? course?.modules[activeModuleIdx] : null;

  useEffect(() => {
    if (activeModule?.contentPath) {
      setIsLoading(true);
      setError(null);
      fetch(activeModule.contentPath)
        .then((res) => {
          if (!res.ok)
            throw new Error(
              `Failed to load module: ${res.status} ${res.statusText}`,
            );
          return res.text();
        })
        .then((text) => {
          setModuleContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load module content:", err);
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setModuleContent("");
    }

    // Reset quiz state when switching modules
    if (activeModule?.quiz) {
      setQuizState({
        currentStep: 0,
        answers: new Array(activeModule.quiz.questions.length).fill(null),
        submitted: false,
      });
      setShowQuizIntro(true);
    }
  }, [activeModule]);

  if (!course) return <div className="p-20 text-center">Course not found</div>;

  const calculateScore = () => {
    if (!activeModule?.quiz) return 0;
    return quizState.answers.reduce((acc, curr, idx) => {
      return (
        acc + (curr === activeModule.quiz!.questions[idx].correctIndex ? 1 : 0)
      );
    }, 0);
  };

  const handleQuizSubmit = () => {
    setQuizState((prev) => ({ ...prev, submitted: true }));
  };

  const resetQuiz = () => {
    if (activeModule?.quiz) {
      setQuizState({
        currentStep: 0,
        answers: new Array(activeModule.quiz.questions.length).fill(null),
        submitted: false,
      });
    }
  };

  const questionsPerStep = 3;
  const totalSteps = activeModule?.quiz
    ? Math.ceil(activeModule.quiz.questions.length / questionsPerStep)
    : 0;
  const isLastStep = quizState.currentStep === totalSteps - 1;

  return (
    <div className="pb-24">
      <div className="max-w-[1440px] mx-auto px-4 pt-12">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-courses-primary mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Med-Courses
        </Link>

        {activeModuleIdx === null ? (
          /* Course Intro Page */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2">
              {/* Tags Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {course.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-courses-primary/10 text-courses-primary text-[11px] font-bold rounded-full uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
                {course.metadata.useofAI && (
                  <span className="px-4 py-1.5 bg-courses-primary/10 text-courses-primary text-[11px] font-bold rounded-full uppercase tracking-wider">
                    GenAI Involved
                  </span>
                )}
              </div>

              <h1 className="display-lg text-app-text mb-8 leading-tight">
                {course.title}
              </h1>
              <p className="body-lg text-app-muted mb-12 leading-relaxed">
                {course.description}
              </p>

              {/* Info Cards Row */}
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="p-8 bg-app-surface rounded-3xl border border-app-border flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-app-muted">
                    <BarChart size={24} className="text-courses-primary" />
                    <span className="body-sm font-medium">Difficulty</span>
                  </div>
                  <div className="heading-lg text-app-text">
                    {course.difficulty}
                  </div>
                </div>
                <div className="p-8 bg-app-surface rounded-3xl border border-app-border flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-app-muted">
                    <Clock size={24} className="text-courses-primary" />
                    <span className="body-sm font-medium">Duration</span>
                  </div>
                  <div className="heading-lg text-app-text">
                    {course.duration} {course.durationUnit}
                  </div>
                </div>
              </div>

              {/* New Course Details */}
              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                <div className="p-6 bg-app-surface rounded-3xl border border-app-border flex flex-col gap-2">
                  <span className="body-xs font-bold text-app-muted uppercase tracking-widest">
                    Language
                  </span>
                  <div className="body-sm font-bold text-app-text">
                    {course.language || "English"}
                  </div>
                </div>
                <div className="p-6 bg-app-surface rounded-3xl border border-app-border flex flex-col gap-2 sm:col-span-2">
                  <span className="body-xs font-bold text-app-muted uppercase tracking-widest">
                    Target Audience
                  </span>
                  <div className="body-sm font-bold text-app-text">
                    {course.targetAudience?.join(", ") ||
                      "Medical Professionals"}
                  </div>
                </div>
              </div>

              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="p-8 bg-app-surface rounded-3xl border border-app-border mb-6">
                  <span className="body-xs font-bold text-app-muted uppercase tracking-widest block mb-4">
                    Prerequisites
                  </span>
                  <ul className="list-disc list-inside space-y-2 body-sm text-app-muted">
                    {course.prerequisites.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructors Card */}
              <div className="p-8 bg-app-surface rounded-3xl border border-app-border mb-16">
                <div className="flex items-center gap-3 text-app-muted mb-6">
                  <div className="w-10 h-10 bg-courses-primary/10 rounded-xl flex items-center justify-center text-courses-primary">
                    <Users size={20} />
                  </div>
                  <span className="body-sm font-medium">Instructors</span>
                </div>
                <div className="flex flex-wrap gap-8">
                  {contributors.map((contributor) => (
                    <div
                      key={contributor.id}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={contributor.image}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="heading-xs text-app-text">
                          {contributor.name}
                        </span>
                        {contributor.credentials &&
                          contributor.credentials.length > 0 && (
                            <span className="body-xs text-app-muted italic mb-1">
                              {contributor.credentials[0]}
                            </span>
                          )}
                        <div className="flex flex-wrap gap-1">
                          {contributor.socials?.linkedin && (
                            <ContactItem
                              icon={Linkedin}
                              href={contributor.socials.linkedin}
                              label="LinkedIn"
                              colorClass="text-app-muted hover:text-courses-primary"
                              size={16}
                            />
                          )}
                          {contributor.socials?.twitter && (
                            <ContactItem
                              icon={Twitter}
                              href={contributor.socials.twitter}
                              label="Twitter"
                              colorClass="text-app-muted hover:text-courses-primary"
                              size={16}
                            />
                          )}
                          {contributor.socials?.instagram && (
                            <ContactItem
                              icon={Instagram}
                              href={contributor.socials.instagram}
                              label="Instagram"
                              colorClass="text-app-muted hover:text-courses-primary"
                              size={16}
                            />
                          )}
                          {contributor.socials?.facebook && (
                            <ContactItem
                              icon={Facebook}
                              href={contributor.socials.facebook}
                              label="Facebook"
                              colorClass="text-app-muted hover:text-courses-primary"
                              size={16}
                            />
                          )}
                          {contributor.socials?.email && (
                            <ContactItem
                              icon={Mail}
                              href={`mailto:${contributor.socials.email}`}
                              label={contributor.socials.email}
                              colorClass="text-app-muted hover:text-courses-primary"
                              size={16}
                            />
                          )}
                          {contributor.socials?.phone && (
                            <ContactItem
                              icon={PhoneCall}
                              href={`tel:${contributor.socials.phone}`}
                              label={contributor.socials.phone}
                              colorClass="text-app-muted hover:text-courses-primary"
                              size={16}
                            />
                          )}
                          {contributor.socials?.website && (
                            <ContactItem
                              icon={Globe}
                              href={contributor.socials.website}
                              label="Website"
                              colorClass="text-app-muted hover:text-courses-primary"
                              size={16}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-3xl font-display font-bold mb-8">
                Course Content
              </h2>
              <div className="space-y-4">
                {course.modules.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModuleIdx(idx)}
                    className="glow-border w-full flex items-center justify-between p-8 bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800 rounded-3xl hover:border-courses-primary transition-all group"
                    style={
                      { "--glow-color": "var(--color-courses-primary)" } as any
                    }
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-courses-primary/10 flex items-center justify-center text-courses-primary font-bold text-lg">
                        {idx + 1}
                      </div>
                      <span className="font-bold text-xl text-app-text">
                        {m.title}
                      </span>
                    </div>
                    <Play
                      size={24}
                      className="text-zinc-200 group-hover:text-courses-primary transition-colors"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none mb-8">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full aspect-video object-cover rounded-3xl mb-8"
                  />
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      {course.metadata.rating && (
                        <>
                          <Star
                            size={24}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="heading-md text-app-text">
                            {course.metadata.rating}
                          </span>
                          {course.metadata.reviewCount && (
                            <span className="body-sm text-app-muted ml-1">
                              ({course.metadata.reviewCount} reviews)
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <span className="body-sm text-app-muted">
                      1.2k students enrolled
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveModuleIdx(0)}
                    className="glow-border w-full py-5 bg-courses-primary hover:bg-courses-hover text-white font-display font-bold rounded-2xl transition-all mb-6 text-lg shadow-lg"
                    style={
                      { "--glow-color": "var(--color-courses-primary)" } as any
                    }
                  >
                    Start Learning
                  </button>
                  <p className="text-center body-sm text-app-muted font-medium">
                    100% Online • Flexible Schedule
                  </p>
                </div>

                {/* AI Assisted Message */}
                {course.metadata.useofAI && (
                  <p className="body-xs text-app-muted text-center leading-relaxed">
                    ⚠️ ARIA GenAI was involved in generating and editing the
                    content in this course and then subsequently reviewed by a
                    human editor.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Module Content & Quiz */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-12">
              <h1 className="display-sm text-app-text">
                {activeModule?.title}
              </h1>
              <button
                onClick={() => setActiveModuleIdx(null)}
                className="body-md text-app-muted hover:text-courses-primary transition-colors"
              >
                Exit Module
              </button>
            </div>

            <div className="bg-app-surface p-8 rounded-3xl border border-app-border shadow-sm mb-12 relative min-h-[300px]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-app-surface/50 backdrop-blur-sm rounded-3xl z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-courses-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="body-md text-app-muted font-medium">
                      Loading module content...
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
                /* The 'markdown-body' class here (defined in index.css) controls the body text color for the module content */
                <div className="prose prose-zinc dark:prose-invert max-w-none mb-12 markdown-body">
                  <ReactMarkdown>{moduleContent}</ReactMarkdown>
                </div>
              )}

              {activeModule?.quiz && (
                <div className="flex justify-center border-t border-zinc-100 dark:border-zinc-800 pt-8">
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="glow-border flex items-center gap-2 px-8 py-4 bg-courses-primary text-white font-display font-bold rounded-2xl hover:scale-105 transition-transform"
                    style={
                      { "--glow-color": "var(--color-courses-primary)" } as any
                    }
                  >
                    <CheckCircle2 size={20} /> Take Module Quiz
                  </button>
                </div>
              )}
            </div>

            <Modal
              isOpen={isQuizOpen}
              onClose={() => setIsQuizOpen(false)}
              title={`${activeModule?.title} - Quiz`}
              maxWidth="max-w-2xl"
            >
              {showQuizIntro ? (
                <div className="space-y-8 py-4">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-courses-primary/10 rounded-full flex items-center justify-center text-courses-primary mx-auto">
                      <GraduationCap size={40} />
                    </div>
                    <h3 className="text-2xl font-display font-bold">
                      Ready to test your knowledge?
                    </h3>
                    <p className="text-zinc-500">
                      Review the quiz details below before starting.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Questions
                      </span>
                      <div className="text-xl font-bold text-app-text">
                        {activeModule?.quiz?.questions.length}
                      </div>
                    </div>
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Passing Score
                      </span>
                      <div className="text-xl font-bold text-app-text">
                        {activeModule?.quiz?.passingScore}%
                      </div>
                    </div>
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Duration
                      </span>
                      <div className="text-xl font-bold text-app-text">
                        {activeModule?.quiz?.duration
                          ? `${activeModule.quiz.duration} ${activeModule.quiz.durationUnit}`
                          : "No limit"}
                      </div>
                    </div>
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Difficulty
                      </span>
                      <div className="text-xl font-bold text-app-text">
                        {activeModule?.quiz?.difficulty || "Medium"}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQuizIntro(false)}
                    className="glow-border w-full py-4 bg-courses-primary text-white font-display font-bold rounded-xl hover:bg-courses-hover transition-all text-lg"
                    style={
                      { "--glow-color": "var(--color-courses-primary)" } as any
                    }
                  >
                    Start Quiz
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                      Step {quizState.currentStep + 1} of {totalSteps}
                    </div>
                    <div className="h-2 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-courses-primary transition-all duration-300"
                        style={{
                          width: `${((quizState.currentStep + 1) / totalSteps) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {activeModule?.quiz?.questions
                    .slice(
                      quizState.currentStep * questionsPerStep,
                      (quizState.currentStep + 1) * questionsPerStep,
                    )
                    .map((q, qIdx) => {
                      const globalIdx =
                        quizState.currentStep * questionsPerStep + qIdx;
                      return (
                        <div key={q.id} className="space-y-4">
                          <p className="font-bold text-lg">
                            {globalIdx + 1}. {q.text}
                          </p>
                          <div className="grid gap-3">
                            {q.options.map((opt, optIdx) => {
                              const isSelected =
                                quizState.answers[globalIdx] === optIdx;
                              const isCorrect = q.correctIndex === optIdx;
                              const showResult = quizState.submitted;

                              return (
                                <button
                                  key={optIdx}
                                  disabled={quizState.submitted}
                                  onClick={() => {
                                    const newAnswers = [...quizState.answers];
                                    newAnswers[globalIdx] = optIdx;
                                    setQuizState((prev) => ({
                                      ...prev,
                                      answers: newAnswers,
                                    }));
                                  }}
                                  className={clsx(
                                    "w-full text-left p-4 rounded-xl border transition-all",
                                    !showResult && isSelected
                                      ? "border-courses-primary bg-courses-primary/5"
                                      : "border-zinc-100 dark:border-zinc-800",
                                    showResult && isCorrect
                                      ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                                      : "",
                                    showResult && isSelected && !isCorrect
                                      ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400"
                                      : "",
                                  )}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                  <div className="pt-6 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        {quizState.currentStep > 0 && (
                          <button
                            onClick={() =>
                              setQuizState((prev) => ({
                                ...prev,
                                currentStep: prev.currentStep - 1,
                              }))
                            }
                            className="glow-border flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            style={
                              {
                                "--glow-color": "var(--color-courses-primary)",
                              } as any
                            }
                          >
                            <ChevronLeft size={20} /> Previous
                          </button>
                        )}

                        {!isLastStep && (
                          <button
                            onClick={() =>
                              setQuizState((prev) => ({
                                ...prev,
                                currentStep: prev.currentStep + 1,
                              }))
                            }
                            className="glow-border flex items-center gap-2 px-6 py-3 bg-courses-primary text-white font-bold rounded-xl hover:bg-courses-hover transition-colors"
                            style={
                              {
                                "--glow-color": "var(--color-courses-primary)",
                              } as any
                            }
                          >
                            Next <ChevronRight size={20} />
                          </button>
                        )}
                      </div>

                      {!quizState.submitted ? (
                        isLastStep && (
                          <button
                            onClick={handleQuizSubmit}
                            className="glow-border px-8 py-3 bg-courses-primary text-white font-bold rounded-xl hover:bg-courses-hover transition-colors"
                            style={
                              {
                                "--glow-color": "var(--color-courses-primary)",
                              } as any
                            }
                          >
                            Submit Answers
                          </button>
                        )
                      ) : (
                        <button
                          onClick={resetQuiz}
                          className="glow-border px-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                          style={
                            {
                              "--glow-color": "var(--color-courses-primary)",
                            } as any
                          }
                        >
                          Retake Quiz
                        </button>
                      )}
                    </div>

                    {quizState.submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center"
                      >
                        <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-bold">
                          Your Score
                        </div>
                        <div className="text-4xl font-display font-bold text-courses-primary">
                          {calculateScore()} /{" "}
                          {activeModule?.quiz?.questions.length}
                        </div>
                        <div className="mt-2 text-zinc-600 dark:text-zinc-400">
                          {calculateScore() ===
                          activeModule?.quiz?.questions.length
                            ? "Perfect! You have mastered this module."
                            : "Great effort! Review the correct answers above."}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </Modal>

            <div className="flex justify-center mb-24">
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="glow-border flex items-center gap-2 px-8 py-4 bg-app-text text-app-bg font-display font-bold rounded-2xl hover:scale-105 transition-transform"
                style={
                  { "--glow-color": "var(--color-courses-primary)" } as any
                }
              >
                <MessageSquare size={20} /> Course Feedback
              </button>
            </div>

            {/* Recommended Section */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
              <h2 className="text-3xl font-display font-bold mb-8">
                Recommended Courses
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {COURSES_DATA.filter((c) => c.slug !== slug)
                  .slice(0, 2)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/courses/${item.slug}`}
                      className="group block"
                    >
                      <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xl font-display font-bold group-hover:text-courses-primary transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <FeedbackForm
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        subjectName={course.title}
        type="Course"
      />
    </div>
  );
};
