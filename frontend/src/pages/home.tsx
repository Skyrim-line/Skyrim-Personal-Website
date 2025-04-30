import Navbar from "@/components/layout/Navbar";
import Skyrim from "../assets/Skyrim2.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-12 py-12 max-w-8xl mx-auto flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8">
          {/* 左侧文字区域 */}
          <div className="text-center md:text-left flex-1">
            <div className="text-xl sm:text-5xl font-semibold mb-8 text-center md:text-left">
              Hi There!
            </div>
            <p className="text-lg md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300">
              Welcome to my personal website! I'm a software engineer with a
              passion for creating innovative solutions. Here, you'll find
              information about my projects, skills, and interests. Feel free to
              explore and connect with me!
            </p>
          </div>

          {/* 右侧图片区域 */}
          <div className="flex-1 items-center justify-center w-full">
            <img
              src={Skyrim}
              alt="Skyrim"
              className="rounded-lg shadow-lg w-full "
            />
          </div>
        </div>
      </main>
    </div>
  );
}
