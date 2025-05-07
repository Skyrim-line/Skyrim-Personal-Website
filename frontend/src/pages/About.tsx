import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import QRCode from "../assets/theskyrim.jpg"; // Placeholder for WeChat QR code
import Github from "../assets/github.svg";
import Linkedin from "../assets/linkedin.svg";
import Gmail from "../assets/gmail.svg";
import Wechat from "../assets/wechat.svg";
import Skyrim from "../assets/sky3.png";
import INS from "../assets/ins.svg";
import { softwareSkills, photographySkills } from "@/data/skills";
import UNSW from "../assets/unsw.png";
import HFUT from "../assets/HFUT.svg";
import { Separator } from "@/components/ui/separator";

export const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

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
            className={`px-4 py-2 rounded-full shadow-md cursor-pointer transition-all duration-200
          ${
            activeTab === "skills"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}>
            Skills
          </button>

          <button
            onClick={() => setActiveTab("Education")}
            className={`px-4 py-2 rounded-full shadow-md cursor-pointer transition-all duration-200 ${
              activeTab === "Education"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 dark:bg-gray-700  dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}>
            Education
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded-full shadow-md cursor-pointer transition-all duration-200 ${
              activeTab === "contact"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 dark:bg-gray-700  dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}>
            Contact
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

        {activeTab === "Education" && (
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              Education
            </h3>
            <div className="flex flex-col gap-6">
              {/* 教育经历卡片 1 */}
              <div className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300 transform bg-white/70 dark:bg-gray-800/60 hover:scale-[1.02] hover:shadow-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-900/40">
                <img
                  src={UNSW}
                  alt="UNSW"
                  className="w-15 h-15 rounded-full shadow-lg object-cover transition-all duration-300"
                />
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    University of New South Wales
                  </p>
                  <p className="text-md text-gray-600 dark:text-gray-400">
                    Master of Information Technology
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mar 2023 - Mar 2025
                  </p>
                </div>
              </div>

              <Separator className="my-1" />

              <div className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300 transform bg-white/70 dark:bg-gray-800/60 hover:scale-[1.02] hover:shadow-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-900/40">
                <img
                  src={HFUT}
                  alt="Tsinghua"
                  className="w-15 h-15 rounded-full shadow-lg object-cover transition-all duration-300 dark:bg-white"
                />
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    Hefei University of Technology
                  </p>
                  <p className="text-md text-gray-600 dark:text-gray-400">
                    Bachelor of Software Engineering
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sep 2018 - Jun 2022
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              Let's Connect!
            </h3>
            <div className=" rounded-xl">
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                I’ve recently graduated and am currently seeking job
                opportunities. I’m always open to potential collaborations,
                creative ideas, or just meaningful conversations. Feel free to
                connect with me — whether it’s to share your story, explore
                opportunities together, or simply chat about something
                interesting. I’d love to hear from you!
              </p>

              <div className="flex gap-4">
                {/* GitHub */}
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
                  <img src={Github} alt="GitHub" className="w-12 h-12" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/yourusername/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
                  <img src={Linkedin} alt="LinkedIn" className="w-12 h-12" />
                </a>

                {/* Email */}
                <a
                  href="mailto:youremail@example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full dark:bg-gray-600 shadow-md hover:shadow-lg transition-all hover:scale-105">
                  <img src={Gmail} alt="Email" className="w-12 h-12 " />
                </a>
                {/* <a
                  href="mailto:youremail@example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
                  <img src={Wechat} alt="Wechat" className="w-12 h-12" />
                </a> */}

                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105"
                      aria-label="WeChat QR">
                      <img src={Wechat} alt="WeChat" className="w-12 h-12" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    align="center"
                    sideOffset={8}
                    avoidCollisions={false}
                    className="w-60 p-4 text-center rounded-xl shadow-xl bg-white dark:bg-gray-900">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                      Scan to connect on WeChat
                      <br />
                      or search:{" "}
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        wsmskyrim
                      </span>
                    </p>

                    <img
                      src={QRCode}
                      alt="WeChat QR"
                      className="w-full h-auto mt-2 rounded-md border border-gray-200 dark:border-gray-700"
                    />
                  </PopoverContent>
                </Popover>

                <a
                  href="https://www.instagram.com/skyrim_sc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
                  <img src={INS} alt="Instagram" className="w-12 h-12" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
