/**
 * Represents a blog post or article in the Med-Blog section.
 */
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metadata: {
    contributorId: string[];
    useofAI: boolean;
    publishedDate: string;
    tags: string[];
    rating: number | null;
    reviewCount?: number;
    duration: number;
    durationUnit: "min" | "hrs" | "d";
  };
  contentPath: string; // Path to the markdown file or content source
  image: string; // URL for the featured image
}

/**
 * Represents an educational course in the Med-Courses section.
 */
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  prerequisites?: string[];
  targetAudience?: string[];
  language?: string;
  metadata: {
    contributorId: string[];
    useofAI: boolean;
    publishedDate: string;
    tags: string[];
    rating: number | null;
    reviewCount?: number;
  };
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  durationUnit: "min" | "hrs" | "d";
  image: string;
  modules: CourseModule[]; // A course consists of multiple learning modules
}

/**
 * A single module within a course.
 */
export interface CourseModule {
  id: string;
  title: string;
  contentPath: string; // Path to the markdown file for the module
  quiz?: Quiz; // Optional quiz at the end of the module
}

/**
 * A quiz containing multiple questions.
 */
export interface Quiz {
  questions: Question[];
  passingScore: number; // Percentage, e.g., 80
  duration?: number;
  durationUnit?: "min" | "hrs" | "d";
  difficulty?: "Easy" | "Medium" | "Hard";
}

/**
 * A single multiple-choice question.
 */
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number; // Index of the correct answer in the options array
}

/**
 * Social media and contact links for a contributor.
 */
export interface Socials {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  phone?: string;
  website?: string;
  github?: string;
}

/**
 * Information about a medical professional contributing to the platform.
 */
export interface Contributor {
  id: string;
  name: string;
  type: "TeamMember" | "Benefactor";
  role: string;
  credentials?: string[]; // e.g., ["MD from Harvard Medical School"]
  bio: string; // Short summary
  fullBio: string; // Detailed biography
  image: string;
  socials?: Socials;
}

/**
 * Emergency contact numbers for different countries.
 */
export interface EmergencyContact {
  country: string;
  services: {
    name: string;
    number: string;
  }[];
}

/**
 * Short notices or tips displayed on the Important Information page.
 */
export interface InfoNotice {
  id: string;
  title: string;
  content: string;
  details?: string;
  type: "tip" | "notice" | "info";
  source: string;
  sourceLink?: string;
  noticeDate: string;
}

/**
 * Represents a product from a sponsor to be advertised.
 */
export interface SponsorProduct {
  id: string;
  name: string;
  sponsorName: string;
  benefactorId?: string;
  description: string;
  longDescription?: string;
  image: string;
  logoUrl?: string;
  link: string;
  cta: string;
}
