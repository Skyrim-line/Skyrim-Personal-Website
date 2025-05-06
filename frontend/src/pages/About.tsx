import { useState } from "react";
import { Code, Coffee, Gamepad, Map, Music, Book } from "lucide-react";
import Skyrim from "../assets/sky3.png";
import { softwareSkills, photographySkills } from "@/data/skills";

export const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const interests = [
    {
      icon: <Gamepad className="h-6 w-6" />,
      name: "Gaming",
      desc: "RPG enthusiast, especially love Skyrim (just like my name!)",
    },
    {
      icon: <Code className="h-6 w-6" />,
      name: "Coding",
      desc: "Always exploring new tech stacks and programming challenges",
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      name: "Coffee",
      desc: "Finding the perfect latte is my daily mission",
    },
    {
      icon: <Music className="h-6 w-6" />,
      name: "Music",
      desc: "Playing piano and listening to electronic music helps me relax",
    },
    {
      icon: <Map className="h-6 w-6" />,
      name: "Travel",
      desc: "Exploring different cultures and places is my passion",
    },
    {
      icon: <Book className="h-6 w-6" />,
      name: "Reading",
      desc: "Tech and sci-fi novels are my favorites",
    },
  ];

  const funFacts = [
    "My name Simin sounds similar to my favorite game 'Skyrim'",
    "I once coded for 24 hours straight during a hackathon and won first place",
    "I speak three languages: Chinese, English, and JavaScript 😉",
    "My caffeine intake probably exceeds healthy standards",
    "My cat is named 'Bug' because it always appears when I'm debugging critical code",
  ];

  return (
    <div className="flex flex-col lg:flex-row mt-12 min-h-screen items-center justify-center">
      {/* Left section - Big title */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col items-center">
        <img
          src={Skyrim}
          alt="Simin Wu"
          className="w-80 h-80 object-cover object-center rounded-full border-4 border-blue-400 shadow-lg mb-6"
        />
        <h2 className="text-5xl sm:text-7xl font-bold text-gray-800 dark:text-white">
          About Me
        </h2>

        <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
          Hi, I'm{" "}
          <span className="font-bold text-blue-500">Simin (Skyrim) Wu</span>, a
          software engineer passionate about creating innovative solutions. I
          love challenging myself and building useful, fun projects with code.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "skills"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}>
            Skills
          </button>
          <button
            onClick={() => setActiveTab("interests")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "interests"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}>
            Interests
          </button>
          <button
            onClick={() => setActiveTab("funFacts")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "funFacts"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}>
            Fun Facts
          </button>
        </div>
      </div>

      {/* Right section - Tab contents */}
      <div className="w-full lg:w-1/2 p-12">
        {activeTab === "skills" && (
          <div className="space-y-10">
            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              Technical Skills
            </h3>

            <div>
              <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                Software Engineering
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {softwareSkills.map(({ icon, name, invert }, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={icon}
                      alt={name}
                      className={`w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20  ${
                        invert ? "dark:invert" : ""
                      }`}
                    />
                    <span className="mt-2 text-gray-700 dark:text-white text-center">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                Photography Tools
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {photographySkills.map(({ icon, name, invert }, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={icon}
                      alt={name}
                      className={`w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 ${
                        invert ? "dark:invert" : ""
                      }`}
                    />
                    <span className="mt-2 text-sm sm:text-base text-gray-700 dark:text-white text-center">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "interests" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              My Interests
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    {interest.icon}
                    <h4 className="text-lg font-bold dark:text-white">
                      {interest.name}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {interest.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "funFacts" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Fun Facts About Me
            </h3>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-xl">
              <ul className="space-y-4">
                {funFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-block mt-1 text-blue-500">•</span>
                    <p className="text-gray-700 dark:text-gray-300">{fact}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
