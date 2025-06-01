// components/About/ContactSection.tsx
import EulerAI from "../../assets/Euler-footer.svg";
import Eulerdark from "../../assets/Euler-dark.svg";

export const ExperienceSection = () => (
  <div className="space-y-6">
    <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
      Experience
    </h3>
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6 p-6 rounded-xl transition-all duration-300 transform bg-white/70 dark:bg-gray-800/60 hover:scale-[1.02] hover:shadow-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-900/40">
        <img
          src={EulerAI}
          alt="EulerAI"
          className="w-20 h-20 object-contain transition-all duration-300 dark:hidden"
        />
        <img
          src={Eulerdark}
          alt="EulerAI Dark"
          className="w-20 h-20 object-contain transition-all duration-300 hidden dark:block"
        />
        <div className="space-y-2">
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            EulerAI Company
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400">
            Software Engineer - Frontend Developer
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mar 2025 - Present
          </p>
        </div>
      </div>
    </div>
  </div>
);
