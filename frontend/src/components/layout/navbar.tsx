import { HoverLinkButton } from "./HoverLinkButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/themeProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { setTheme } = useTheme();

  return (
    <header className="flex w-full items-center justify-between px-2 sm:px-6 py-3 border-b  shadow-sm">
      <h1 className="sm:pl- text-3xl sm:text-sm  font-bold cursor-pointer whitespace-nowrap font-['Eras_Medium'] ">
        <Link to="/">Skyrim Wu</Link>
      </h1>
      <nav className="hidden sm:flex space-x-4">
        <HoverLinkButton to="/home">Home</HoverLinkButton>
        <HoverLinkButton to="/about">About</HoverLinkButton>
        <HoverLinkButton to="/project">Project</HoverLinkButton>
        <HoverLinkButton to="/contact">Gallery</HoverLinkButton>
      </nav>

      <div className="flex items-center gap-3">
        <Download className="sm:block cursor-pointer" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
              <a href="/docs" className="w-full">
                <Button variant="ghost" className="w-full cursor-pointer">
                  Documentation
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
