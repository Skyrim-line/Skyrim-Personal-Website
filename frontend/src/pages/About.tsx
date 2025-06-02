// components/About/About.tsx
import { useState } from "react";
import { ExperienceSection } from "../components/about/ExpSection";
import { EducationSection } from "../components/about/EducationSection";
import { SkillsSection } from "../components/about/SkillSection";
import { AvatarSection } from "../components/about/AvatarSection";

export const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div
      id="about"
      className="flex flex-col lg:flex-row min-h-screen items-center justify-center">
      <div className="w-full lg:w-1/2 p-2 md:p-4 flex flex-col items-center">
        <AvatarSection />
        <div className="mt-8 flex gap-4">
          {[
            { label: "Skills", value: "skills" },
            { label: "Education", value: "Education" },
            { label: "Experience", value: "Experience" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`px-4 py-2 rounded-full shadow-md cursor-pointer transition-all duration-200 ${
                activeTab === value
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-12">
        {activeTab === "skills" && <SkillsSection />}
        {activeTab === "Education" && <EducationSection />}
        {activeTab === "Experience" && <ExperienceSection />}
      </div>
    </div>
  );
};
