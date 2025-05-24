// components/About/EducationSection.tsx
import { Separator } from "../ui/separator";
import UNSW from "../../assets/unsw.png";
import HFUT from "../../assets/HFUT.svg";

export const EducationSection = () => (
  <div className="space-y-6">
    <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
      Education
    </h3>
    <div className="flex flex-col gap-6">
      {[
        {
          logo: UNSW,
          school: "University of New South Wales",
          degree: "Master of Information Technology",
          time: "Mar 2023 - Mar 2025",
        },
        {
          logo: HFUT,
          school: "Hefei University of Technology",
          degree: "Bachelor of Software Engineering",
          time: "Sep 2018 - Jun 2022",
        },
      ].map(({ logo, school, degree, time }, index) => (
        <>
          <div
            key={school}
            className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300 transform bg-white/70 dark:bg-gray-800/60 hover:scale-[1.02] hover:shadow-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-900/40">
            <img
              src={logo}
              alt={school}
              className="w-15 h-15 rounded-full shadow-lg object-cover transition-all duration-300"
            />
            <div className="space-y-2">
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {school}
              </p>
              <p className="text-md text-gray-600 dark:text-gray-400">
                {degree}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
            </div>
          </div>
          {index === 0 && <Separator className="my-1" />}
        </>
      ))}
    </div>
  </div>
);
