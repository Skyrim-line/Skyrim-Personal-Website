import Skyrim from "../../assets/sky3.png";

export const AvatarSection = () => (
  <>
    <img
      src={Skyrim}
      alt="Simin Wu"
      className="w-80 h-80 object-cover object-center rounded-full border-4 border-blue-400 shadow-lg mb-6"
    />
    <h2 className="text-5xl sm:text-7xl font-semibold">About Me</h2>
    <p className="mt-6 text-lg md:text-xl leading-relaxed dark:text-gray-300 max-w-2xl">
      Hi, I'm <span className="font-bold text-blue-500">Simin (Skyrim) Wu</span>
      , a software engineer passionate about creating innovative solutions. I
      love challenging myself and building useful, fun projects with code.
    </p>
  </>
);
