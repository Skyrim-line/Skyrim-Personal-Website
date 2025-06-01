import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Skyrim Wu. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:ahandsomeskyrim@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Send me an email">
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Skyrim-line"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Visit my GitHub profile">
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/skyrim-wu-a1208b27a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Visit my LinkedIn profile">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
