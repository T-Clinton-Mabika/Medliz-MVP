import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { DarkModeProvider } from "./hooks";
import { Home } from "./pages/Home";
import { MedBlog } from "./pages/MedBlog";
import { ArticleDetail } from "./pages/ArticleDetail";
import { MedCourses } from "./pages/MedCourses";
import { CourseDetail } from "./pages/CourseDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

/**
 * Main content wrapper that includes the Header, Footer, and Route definitions.
 * This component is separated from App to allow access to Router hooks if needed.
 */
const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<MedBlog />} />
          <Route path="/blog/:slug" element={<ArticleDetail />} />
          <Route path="/courses" element={<MedCourses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

/**
 * Root Application Component.
 * Wraps the entire app in DarkModeProvider and HashRouter.
 * HashRouter is used for better compatibility with static hosting environments.
 */
export default function App() {
  return (
    <DarkModeProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
}
