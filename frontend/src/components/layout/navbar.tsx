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
    <header className="flex w-full items-center justify-between px-6 py-3 border-b bg-white dark:bg-gray-950 shadow-sm">
      {/* 左侧 Logo，始终显示 */}
      <h1 className="text-2xl font-bold cursor-pointer whitespace-nowrap">
        <Link to="/">Skyrim Wu</Link>
      </h1>

      {/* 中间导航链接，仅在大屏幕显示 */}
      <nav className="hidden sm:flex space-x-4">
        <HoverLinkButton to="/home">Home</HoverLinkButton>
        <HoverLinkButton to="/about">About</HoverLinkButton>
        <HoverLinkButton to="/project">Project</HoverLinkButton>
        <HoverLinkButton to="/contact">Gallery</HoverLinkButton>
      </nav>

      {/* 右侧区域 */}
      <div className="flex items-center gap-3">
        {/* 大屏显示下载按钮 */}
        <Download className="sm:block cursor-pointer" />

        {/* 主题切换 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
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

        {/* 小屏显示汉堡菜单 */}
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
            <div className="mt-10 flex flex-col gap-4 text-lg justify-center items-center">
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/project">Project</Link>
              <Link to="/contact">Gallery</Link>
              <Link to="/docs">Documentation</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
