import { HoverLinkButton } from "./HoverLinkButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { isDark, toggleTheme } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-3 transition-all duration-300 will-change-transform ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent"
      }`}>
      <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer whitespace-nowrap">
        <Link
          to="/"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Skyrim Wu
        </Link>
      </h1>
      <nav className="hidden md:flex space-x-6">
        <HoverLinkButton to="#hero">Home</HoverLinkButton>
        <HoverLinkButton to="#about">About</HoverLinkButton>
        <HoverLinkButton to="#project">Project</HoverLinkButton>
        <HoverLinkButton to="/gallery">Gallery</HoverLinkButton>
        <HoverLinkButton to="#contact">Contact</HoverLinkButton>
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
              className="md:hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full">
            <div className="mt-8 flex flex-col gap-3 py-3 text-lg justify-center items-center">
              <Button
                variant="ghost"
                className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => scrollToSection("hero")}>
                Home
              </Button>
              <Button
                variant="ghost"
                className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => scrollToSection("about")}>
                About
              </Button>
              <Button
                variant="ghost"
                className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => scrollToSection("projects")}>
                Project
              </Button>
              <Button
                variant="ghost"
                className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => scrollToSection("gallery")}>
                Gallery
              </Button>
              <Button
                variant="ghost"
                className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => scrollToSection("contact")}>
                Contact
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
