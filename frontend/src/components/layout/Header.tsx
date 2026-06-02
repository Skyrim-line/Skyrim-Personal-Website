import { HoverLinkButton } from "./HoverLinkButton";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function getSystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCVPage = location.pathname === "/cv";
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("vite-ui-theme") || "system";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // 监听系统主题变化
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        setTheme("system"); // 触发重渲染
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 计算当前主题
  let currentTheme: "dark" | "light";
  if (theme === "system") {
    currentTheme = getSystemTheme();
  } else {
    currentTheme = theme as "dark" | "light";
  }

  // 切换主题
  const toggleTheme = () => {
    let nextTheme: "dark" | "light";
    if (currentTheme === "dark") {
      nextTheme = "light";
    } else {
      nextTheme = "dark";
    }
    setTheme(nextTheme);
    localStorage.setItem("vite-ui-theme", nextTheme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
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
        <HoverLinkButton to="#contact">Contact</HoverLinkButton>
        <Link
          to="/cv"
          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline h-9 px-4 py-2 text-lg transition-transform duration-300 ease-in-out hover:scale-110 ${
            isCVPage ? "underline text-indigo-600 dark:text-indigo-400" : ""
          }`}>
          CV
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        {mounted && (
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme">
            {currentTheme === "dark" ? (
              <Sun className="!h-5 !w-5" />
            ) : (
              <Moon className="!h-5 !w-5" />
            )}
          </Button>
        )}

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
                onClick={() => scrollToSection("contact")}>
                Contact
              </Button>
              <Button
                variant="ghost"
                className={`w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isCVPage ? "text-indigo-600 dark:text-indigo-400 font-semibold" : ""
                }`}
                onClick={() => navigate("/cv")}>
                CV
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
