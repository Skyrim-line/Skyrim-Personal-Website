// src/components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex w-fll items-center justify-between px-6 py-3 border-b bg-white dark:bg-gray-950 shadow-sm">
      <h1 className="text-2xl font-bold cursor-pointer whitespace-nowrap hidden min-[450px]:block">
        <Link to="/">Skyrim Wu</Link>
      </h1>

      {/* 中间导航链接 */}
      <nav className="space-x-4">
        <Button asChild variant="link" className="text-lg">
          <Link to="/home">Home</Link>
        </Button>
        <Button asChild variant="link" className="text-lg">
          <Link to="/about">About</Link>
        </Button>
        <Button asChild variant="link" className="text-lg">
          <Link to="/contact">Contact</Link>
        </Button>
      </nav>

      <div>
        <Download />
      </div>
    </header>
  );
}
