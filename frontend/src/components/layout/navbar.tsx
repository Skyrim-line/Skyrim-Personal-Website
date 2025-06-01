import { HoverLinkButton } from "./HoverLinkButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import { useEffect } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { isDark, toggleTheme } = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches !== isDark) {
        toggleTheme();
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isDark, toggleTheme]);

  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-3 border-b shadow-sm bg-white dark:bg-gray-900">
      <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer whitespace-nowrap">
        <Link
          to="/"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Skyrim Wu
        </Link>
      </h1>
      <nav className="hidden sm:flex space-x-6">
        <HoverLinkButton to="#hero">Home</HoverLinkButton>
        <HoverLinkButton to="#about">About</HoverLinkButton>
        <HoverLinkButton to="/project">Project</HoverLinkButton>
        <HoverLinkButton to="/contact">Gallery</HoverLinkButton>
      </nav>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme">
          {isDark ? (
            <Sun className="!h-5 !w-5" />
          ) : (
            <Moon className="!h-5 !w-5" />
          )}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full">
            <div className="mt-8 flex flex-col gap-3 py-3 text-lg justify-center items-center">
              <a href="#hero" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  Home
                </Button>
              </a>
              <a href="#about" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  About
                </Button>
              </a>
              <a href="/project" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  Project
                </Button>
              </a>
              <a href="/contact" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  Gallery
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
