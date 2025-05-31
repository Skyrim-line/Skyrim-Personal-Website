import { HoverLinkButton } from "./HoverLinkButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between px-2 sm:px-6 border-b shadow-sm bg-white dark:bg-gray-900">
      <h1 className="sm:pl-1 text-3xl sm:text-sm  font-bold cursor-pointer whitespace-nowrap">
        <Link to="/">Skyrim Wu</Link>
      </h1>
      <nav className="hidden sm:flex space-x-4">
        <HoverLinkButton to="/home">Home</HoverLinkButton>
        <HoverLinkButton to="/about">About</HoverLinkButton>
        <HoverLinkButton to="/project">Project</HoverLinkButton>
        <HoverLinkButton to="/contact">Gallery</HoverLinkButton>
      </nav>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="rounded-full p-2 cursor-pointer"
          aria-label="Toggle theme">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden cursor-pointer">
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full ">
            <div className="mt-10 flex flex-col gap-4 py-3 text-lg justify-center items-center">
              <a href="/home" className="w-full">
                <Button variant="ghost" className="w-full cursor-pointer">
                  Home
                </Button>
              </a>
              <a href="/about" className="w-full">
                <Button variant="ghost" className="w-full cursor-pointer">
                  About
                </Button>
              </a>
              <a href="/project" className="w-full">
                <Button variant="ghost" className="w-full cursor-pointer">
                  Project
                </Button>
              </a>
              <a href="/contact" className="w-full">
                <Button variant="ghost" className="w-full cursor-pointer">
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
