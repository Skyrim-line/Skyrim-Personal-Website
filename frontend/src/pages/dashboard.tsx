import Navbar from "@/components/layout/Header";
import Skyrim from "../assets/optimized/hero-1280.jpg";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PhotoGallery from "../components/gallery/PhotoGallery";
import ProjectsSection from "./ProjectsSection";
import { About } from "./About";
import ContactMe from "./ContactMe";
import Footer from "@/components/layout/Footer";
import HeroCanvas from "@/components/hero/HeroCanvas";
import HeroImage3D from "@/components/hero/HeroImage3D";

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
    <div>
      <Navbar />
      <main
        id="hero"
        className="pt-[150px] pb-0 px-4 sm:px-8 lg:px-14 w-full xl:w-[90%] mx-auto"
      >
        {/* Hero & Gallery Section */}
        <section className="flex flex-col justify-center">
          <div
            className={`relative flex flex-col mb-4 lg:flex-row items-center justify-between gap-8 md:gap-12 rounded-2xl ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } transition-transform duration-700`}
          >
            {/* Three.js particle background */}
            <HeroCanvas />

            <div className="relative z-10 w-full lg:w-1/2 space-y-6 mb-8 lg:mb-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold overflow-hidden">
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-3">
                  {["Hi", "There!"].map((word, i) => (
                    <motion.span
                      key={word}
                      custom={i}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      variants={wordVariants}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 mt-2">
                  {["Welcome", "to", "my", "world"].map((word, i) => (
                    <motion.span
                      key={word}
                      custom={i + 2}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      variants={wordVariants}
                      className="text-indigo-600 dark:text-indigo-400"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>

              <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl text-center lg:text-left">
                My name is Skyrim Wu, a software engineer with a passion for
                creating innovative solutions. Here, you'll find information
                about my projects, skills, and interests.
              </p>

              <div className="pt-4 flex justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg cursor-pointer"
                  onClick={() => {
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Projects
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-transparent cursor-pointer border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 font-medium rounded-lg"
                  onClick={() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right image area — Three.js 3D tilt card */}
            <div className="relative z-10 w-full flex justify-center">
              <div className="relative w-full max-w-[600px] lg:max-w-full">
                {/* Indigo glow halo */}
                <div className="absolute inset-0 rounded-2xl transform rotate-3 scale-105 opacity-30 blur-sm" />
                {/* 3D image canvas — aspect ratio 16:9 matches the source image */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "16/9" }}
                >
                  <HeroImage3D src={Skyrim} alt="Skyrim Wu hero photo" />
                </div>
              </div>
            </div>
          </div>
          {/* Gallery part */}
          <div className="mt-5">
            <PhotoGallery />
            <div className="text-center my-8 transition-transform duration-700 hover:scale-[1.02]">
              <p className="text-sm sm:text-lg italic">
                Fragments of life, frozen in time
              </p>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                (Scroll down to view more...)
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-screen flex flex-col justify-center py-20">
          <About />
        </section>

        {/* Projects Section */}
        <section className="min-h-screen flex flex-col justify-center py-20">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex flex-col justify-center py-20">
          <ContactMe />
        </section>

        <Footer />
      </main>
    </div>
  );
}
