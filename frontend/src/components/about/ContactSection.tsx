// components/About/ContactSection.tsx
import Github from "../../assets/github.svg";
import Linkedin from "../../assets/linkedin.svg";
import Gmail from "../../assets/gmail.svg";
import Wechat from "../../assets/wechat.svg";
import INS from "../../assets/ins.svg";
import QRCode from "../../assets/theskyrim.jpg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const ContactSection = () => (
  <div className="space-y-6">
    <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
      Let's Connect!
    </h3>
    <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
      I've recently graduated and am currently seeking job opportunities. I'm
      always open to potential collaborations, creative ideas, or just
      meaningful conversations. Feel free to connect with me — whether it's to
      share your story, explore opportunities together, or simply chat about
      something interesting. I'd love to hear from you!
    </p>
    <div className="flex flex-wrap gap-4">
      <a
        href="https://github.com/Skyrim-line"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full !bg-white dark:!bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
        <img src={Github} alt="GitHub" className="w-12 h-12 dark:invert" />
      </a>
      <a
        href="https://www.linkedin.com/in/skyrim-wu-a1208b27a/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full !bg-white dark:!bg-gray-800 shadow-md hover:shadow-lg transition-all hover:scale-105">
        <img src={Linkedin} alt="LinkedIn" className="w-12 h-12" />
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
);
