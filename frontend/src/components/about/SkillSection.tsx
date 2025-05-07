import { softwareSkills, photographySkills } from "@/data/skills";

export const SkillsSection = () => (
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
);
