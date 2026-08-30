import { HoverLinkButton } from "./HoverLinkButton";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme/themeProvider";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import skyrimLogoDark from "@/assets/skyrim-logo/SKYRIM-WHITE资源 2@4x.png";
import skyrimLogoLight from "@/assets/skyrim-logo/SKYRIM-WHITE资源 1@4x.png";

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
  const isPeePage = location.pathname === "/pee";
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(data.session);
      }
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
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

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const isDark = currentTheme === "dark";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] transition-all duration-300 will-change-transform",
        scrolled
          ? isDark
            ? "bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-sm"
            : "bg-white/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent",
      )}>
      <h1 className="cursor-pointer">
        <Link
          to="/"
          className="inline-block transition-opacity hover:opacity-80">
          <img
            src={currentTheme === "dark" ? skyrimLogoDark : skyrimLogoLight}
            alt="Skyrim Wu"
            className="h-7 sm:h-9 w-auto"
          />
        </Link>
      </h1>
      <nav className="hidden md:flex space-x-6">
        <HoverLinkButton to="#hero">Home</HoverLinkButton>
        <HoverLinkButton to="#about">About</HoverLinkButton>
        <HoverLinkButton to="#project">Project</HoverLinkButton>
        <HoverLinkButton to="#contact">Contact</HoverLinkButton>
        <Link
          to="/cv"
          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline h-9 px-4 py-2 text-lg transition-transform duration-300 ease-in-out hover:scale-110 ${isCVPage ? "underline text-indigo-600 dark:text-indigo-400" : ""
            }`}>
          CV
        </Link>
        <Link
          to="/pee"
          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline h-9 px-4 py-2 text-lg transition-transform duration-300 ease-in-out hover:scale-110 ${isPeePage ? "underline text-indigo-600 dark:text-indigo-400" : ""
            }`}>
          Pee
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        {!session && (
          <Button
            asChild
            variant="ghost"
            className="hidden md:inline-flex h-9 px-4 py-2 text-lg transition-transform duration-300 ease-in-out hover:scale-110">
            <Link to="/admin/login">Login</Link>
          </Button>
        )}

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
          <SheetContent
            side="top"
            className={cn(
              "w-full",
              isDark ? "bg-gray-900 text-white" : "bg-white",
            )}>
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
                className={`w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${isCVPage ? "text-indigo-600 dark:text-indigo-400 font-semibold" : ""
                  }`}
                onClick={() => navigate("/cv")}>
                CV
              </Button>
              <Button
                variant="ghost"
                className={`w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${isPeePage ? "text-indigo-600 dark:text-indigo-400 font-semibold" : ""
                  }`}
                onClick={() => navigate("/pee")}>
                Pee
              </Button>
              {!session && (
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => navigate("/admin/login")}>
                  Login
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
