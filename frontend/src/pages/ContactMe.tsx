import GithubIcon from "../assets/github.svg";
import LinkedinIcon from "../assets/linkedin.svg";
import Gmail from "../assets/gmail.svg";
import Wechat from "../assets/wechat.svg";
import INS from "../assets/ins.svg";
import QRCode from "../assets/theskyrim.jpg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function ContactMe() {
  return (
    <div
      id="contact"
      className="container mx-auto px-2 md:px-4 py-12 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <h1 className="!text-3xl sm:!text-4xl md:!text-5xl font-semibold text-left mb-12">
          Contact Me
        </h1>

        <div className="space-y-8">
          <div className="text-left mb-8">
            <h3 className="text-3xl font-semibold mb-4">Let's Connect!</h3>
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
              I've recently graduated and am currently seeking job
              opportunities. I'm always open to discussing new projects,
              creative ideas, or opportunities to be part of your visions.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/Skyrim-line"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full !bg-white dark:!bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
              <img
                src={GithubIcon}
                alt="GitHub"
                className="w-12 h-12 dark:invert"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/skyrim-wu-a1208b27a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full !bg-white dark:!bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
              <img src={LinkedinIcon} alt="LinkedIn" className="w-12 h-12" />
            </a>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                  aria-label="Gmail">
                  <img src={Gmail} alt="Gmail" className="w-12 h-12" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 text-center rounded-xl shadow-xl bg-white dark:bg-gray-900">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                  Contact with me through my email:
                  <span className="font-semibold text-blue-600 dark:text-blue-400 underline block">
                    ahandsomeskyrim@gmail.com
                  </span>
                </p>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                  aria-label="WeChat">
                  <img src={Wechat} alt="WeChat" className="w-12 h-12" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4 text-center rounded-xl shadow-xl bg-white dark:bg-gray-900">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                  Scan to connect on WeChat
                  <br />
                  or search:
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
              className="p-3 rounded-full !bg-white dark:!bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
              <img src={INS} alt="Instagram" className="w-12 h-12" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
