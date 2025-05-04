import Navbar from "@/components/layout/Navbar";
import Skyrim from "../assets/Skyrim2.jpg";
import { useState, useEffect } from "react";
import PhotoGallery from "@/components/gallery/PhotoGallery";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="pt-[150px] pb-0 px-4 sm:px-8 lg:px-14 w-full xl:w-[90%] mx-auto">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } transition-all duration-700`}>
          <div className="w-full lg:w-1/2 space-y-6 mb-8 lg:mb-0">
            <div className="text-5xl sm:text-6xl md:text-7xl xlg:text-8xl font-bold text-gray-800 dark:text-white">
              <span className="block text-center lg:text-left">Hi There!</span>
              <span className="block mt-2 text-indigo-600 dark:text-indigo-400 text-center lg:text-left">
                Welcome to my world
              </span>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl text-center lg:text-left">
              Welcome to my personal website! I'm a software engineer with a
              passion for creating innovative solutions. Here, you'll find
              information about my projects, skills, and interests.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl text-center lg:text-left">
              Feel free to explore and connect with me!
            </p>

            <div className="pt-4 flex justify-center lg:justify-start gap-4">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer">
                View Projects
              </button>
              <button className="px-6 py-3 bg-transparent cursor-pointer border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-300">
                Contact Me
              </button>
            </div>
          </div>

          {/* Right image area */}
          <div className="w-full flex justify-center">
            <div className="relative z-10 w-full max-w-[600px] lg:max-w-full">
              <div className="absolute inset-0 bg-indigo-200 dark:bg-indigo-900 rounded-2xl transform rotate-3 scale-105 opacity-30"></div>
              <img
                src={Skyrim}
                alt="Skyrim"
                className="relative rounded-xl shadow-xl w-full h-auto object-cover max-h-[600px]"
              />
            </div>
          </div>
        </div>
        {/* Dynamic Photo Gallery display here */}
        <PhotoGallery />
        <div className="text-center my-2 transition-all duration-700 hover:scale-[1.02]">
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-base text-sm sm:text-lg italic">
            Fragments of life, frozen in time
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 animate-pulse">
            (Scroll down to view more...)
          </p>
        </div>
      </main>
    </div>
  );
}
