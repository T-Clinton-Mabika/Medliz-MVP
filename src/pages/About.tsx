import React, { useState } from "react";
import { CONTRIBUTORS, POSTS_DATA, COURSES_DATA } from "../data";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  PhoneCall,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";
import { HeroSection } from "../components/HeroSection";
import { ContactItem } from "../components/ContactItem";
import { Contributor } from "../types";
import { ContributorCarousel } from "../components/ContributorCarousel";

/**
 * About Medliz Page.
 * Features:
 * - Mission statement and company values.
 * - Interactive contributor profiles with detailed bios.
 * - Medical disclaimer at the end of the page.
 */
export const About: React.FC = () => {
  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>(null);

  const teamMembers = CONTRIBUTORS.filter((c) => c.type === "TeamMember");
  const benefactors = CONTRIBUTORS.filter((c) => c.type === "Benefactor");

  const getContributorArticles = (id: string) => {
    return POSTS_DATA.filter((post) =>
      post.metadata.contributorId.includes(id),
    );
  };

  const getContributorCourses = (id: string) => {
    return COURSES_DATA.filter((course) =>
      course.metadata.contributorId.includes(id),
    );
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <HeroSection
        title={
          <>
            About <span className="text-medical-primary">Medliz</span>
          </>
        }
        description="We are a team of dedicated medical professionals committed to providing accessible, high-quality medical education and insights to the global healthcare community."
      />

      {/* Business Info & Values */}
      <section className="max-w-[1440px] mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="heading-lg mb-8 text-app-text">Our Mission</h2>
            <p className="body-lg text-app-muted mb-8 text-neutral-600 dark:text-neutral-400">
              Medliz was founded on the belief that medical knowledge should be
              shared freely and accurately. Our platform bridges the gap between
              complex clinical research and practical application, empowering
              healthcare providers and students alike.
            </p>
            <p className="body-md text-app-muted leading-relaxed text-neutral-600 dark:text-neutral-400">
              By delivering peer-reviewed courses and expert insights, our goal
              is to improve clinical performance, patient outcomes, and
              educational excellence globally. We continuous update our
              resources to fit the dynamic needs of the modern medical
              professional.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-medical-primary/20 blur-3xl rounded-full -mr-32 -mt-32" />
            <h2 className="text-3xl font-display font-bold mb-8 relative z-10">
              Our Values
            </h2>
            <ul className="space-y-6 relative z-10 animate-none">
              {[
                {
                  title: "Integrity",
                  desc: "Unwavering commitment to medical accuracy and ethical standards.",
                },
                {
                  title: "Accessibility",
                  desc: "Making complex medical education available to everyone, everywhere.",
                },
                {
                  title: "Innovation",
                  desc: "Leveraging digital tools to enhance the learning experience.",
                },
                {
                  title: "Community",
                  desc: "Fostering a collaborative environment for medical professionals.",
                },
              ].map((value, idx) => (
                <li key={idx}>
                  <h3 className="font-bold text-medical-primary mb-1">
                    {value.title}
                  </h3>
                  <p className="text-zinc-400">{value.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TeamMembers */}
      <section className="max-w-[1440px] mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-app-text mb-4 text-center">
            Meet Our <span className="text-medical-primary">Team</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-center mx-auto max-w-2xl">
            The medical experts behind our insights and courses.
          </p>
        </div>

        <ContributorCarousel
          contributors={teamMembers}
          onContributorClick={(c) => setSelectedContributor(c)}
          glowColor="#ffd000"
        />
      </section>

      {/* Benefactors */}
      <section className="bg-zinc-50 dark:bg-zinc-900/30 py-24 mb-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-app-text mb-4 text-center">
              Our <span className="text-medical-primary">Benefactors</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-center mx-auto max-w-2xl">
              Organizations supporting our mission to democratize medical
              knowledge.
            </p>
          </div>

          <ContributorCarousel
            contributors={benefactors}
            onContributorClick={(c) => setSelectedContributor(c)}
            glowColor="#ffd000"
          />
        </div>
      </section>

      {/* Medical Disclaimer Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div
          id="disclaimer"
          className="p-8 md:p-12 bg-medical-accent rounded-[2.5rem] text-center shadow-[0_0_50px_-12px_rgba(244,0,9,0.6)] border border-white/10 relative overflow-hidden"
        >
          {/* Subtle light cast effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col items-center gap-4 mb-8 text-white">
              <ShieldAlert size={48} className="drop-shadow-lg" />
              <h2 className="display-sm text-white tracking-tight">
                Medical Disclaimer
              </h2>
            </div>

            <div className="prose prose-zinc max-w-none text-lg text-white/90 leading-relaxed mx-auto">
              <p className="mb-4">
                The content provided on Medliz, including articles, blog posts,
                and educational courses, is intended for informational and
                educational purposes only.
              </p>
              <p className="font-bold text-white mb-4">
                It is NOT a substitute for professional medical advice,
                diagnosis, or treatment.
              </p>
              <p className="mb-4">
                Always seek the advice of your physician or other qualified
                health provider with any questions you may have regarding a
                medical condition. Never disregard professional medical advice
                or delay in seeking it because of something you have read on
                this website.
              </p>
              <p>
                The opinions expressed by contributors are their own and do not
                necessarily reflect the official policy or position of any
                medical institution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <Modal
        isOpen={!!selectedContributor}
        onClose={() => setSelectedContributor(null)}
        title={
          selectedContributor?.type === "TeamMember"
            ? "Content Generator Profile"
            : "Benefactor Profile"
        }
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
                <div className="flex flex-col items-center gap-1 mb-4">
                  <div className="text-medical-primary font-bold">
                    {selectedContributor.role}
                  </div>
                </div>
                <div className="flex justify-center flex-wrap gap-3">
                  {selectedContributor.socials?.linkedin && (
                    <ContactItem
                      icon={Linkedin}
                      href={selectedContributor.socials.linkedin}
                      label="LinkedIn"
                      colorClass="glow-border p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-medical-primary"
                    />
                  )}
                  {selectedContributor.socials?.twitter && (
                    <ContactItem
                      icon={Twitter}
                      href={selectedContributor.socials.twitter}
                      label="Twitter"
                      colorClass="glow-border p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-medical-primary"
                    />
                  )}
                  {selectedContributor.socials?.instagram && (
                    <ContactItem
                      icon={Instagram}
                      href={selectedContributor.socials.instagram}
                      label="Instagram"
                      colorClass="glow-border p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-medical-primary"
                    />
                  )}
                  {selectedContributor.socials?.facebook && (
                    <ContactItem
                      icon={Facebook}
                      href={selectedContributor.socials.facebook}
                      label="Facebook"
                      colorClass="glow-border p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-medical-primary"
                    />
                  )}
                  {selectedContributor.socials?.email && (
                    <ContactItem
                      icon={Mail}
                      href={`mailto:${selectedContributor.socials.email}`}
                      label={selectedContributor.socials.email}
                      colorClass="glow-border p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-medical-primary"
                    />
                  )}
                  {selectedContributor.socials?.phone && (
                    <ContactItem
                      icon={PhoneCall}
                      href={`tel:${selectedContributor.socials.phone}`}
                      label={selectedContributor.socials.phone}
                      colorClass="glow-border p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-medical-primary"
                    />
                  )}
                  {selectedContributor.socials?.website && (
                    <ContactItem
                      icon={Globe}
                      href={selectedContributor.socials.website}
                      label="Website"
                      colorClass="glow-border p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-medical-primary"
                    />
                  )}
                </div>
              </div>
            </div>
            {selectedContributor.type === "TeamMember" &&
              selectedContributor.credentials &&
              selectedContributor.credentials.length > 0 && (
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GraduationCap size={16} className="text-medical-primary" />{" "}
                    Credentials
                  </h4>
                  <ul className="space-y-2 animate-none">
                    {selectedContributor.credentials.map((credential, idx) => (
                      <li
                        key={idx}
                        className="text-app-text text-sm flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-medical-primary mt-1.5 shrink-0" />
                        {credential}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                {selectedContributor.fullBio}
              </p>
            </div>

            {selectedContributor.type === "TeamMember" && (
              <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                <h4 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                  <Award className="text-medical-primary" /> Contributions
                </h4>

                <div className="space-y-6">
                  {getContributorArticles(selectedContributor.id).length >
                    0 && (
                    <div>
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <BookOpen size={14} /> Articles
                      </div>
                      <div className="grid gap-3">
                        {getContributorArticles(selectedContributor.id).map(
                          (post) => (
                            <Link
                              key={post.id}
                              to={`/blog/${post.id}`}
                              className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-medical-primary transition-colors flex justify-between items-center group"
                            >
                              <span className="font-medium group-hover:text-medical-primary transition-colors">
                                {post.title}
                              </span>
                              <ArrowRight
                                size={16}
                                className="text-zinc-300 group-hover:text-medical-primary transition-colors"
                              />
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {getContributorCourses(selectedContributor.id).length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <GraduationCap size={14} /> Courses
                      </div>
                      <div className="grid gap-3">
                        {getContributorCourses(selectedContributor.id).map(
                          (course) => (
                            <Link
                              key={course.id}
                              to={`/courses/${course.id}`}
                              className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-medical-primary transition-colors flex justify-between items-center group"
                            >
                              <span className="font-medium group-hover:text-medical-primary transition-colors">
                                {course.title}
                              </span>
                              <ArrowRight
                                size={16}
                                className="text-zinc-300 group-hover:text-medical-primary transition-colors"
                              />
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {getContributorArticles(selectedContributor.id).length ===
                    0 &&
                    getContributorCourses(selectedContributor.id).length ===
                      0 && (
                      <p className="text-zinc-500 italic text-sm">
                        No contributions listed yet.
                      </p>
                    )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
