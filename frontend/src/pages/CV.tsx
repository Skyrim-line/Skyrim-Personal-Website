import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { CVPreview } from "@/components/cv/CVPreview";
import { CVToolbar } from "@/components/cv/CVToolbar";
import { useTheme } from "@/components/theme/themeProvider";
import Navbar from "@/components/layout/Header";
import { Toaster } from "sonner";

const DEFAULT_CV = `# Simin Wu

**Software Engineer · Full Stack Developer**

sm.wu@eigenflow.ai · GitHub: Skyrim-line · Hong Kong

---

## Summary

Full-stack engineer with a passion for building elegant, performant web applications and AI-powered products. Currently building the future of intelligent workflows at EigenFlow AI.

---

## Experience

### Tech Lead — Full Stack Developer
**EigenFlow AI** · Mar 2025 – Present

- Led a 5-person engineering team end-to-end, owning technical direction, code reviews, sprint planning, and delivery milestones for a live B2B SaaS product in active commercial use
- Sole owner of the entire frontend — architected, built, and shipped the production UI from zero without external contribution
- Hands-on contributor across the full stack; actively co-developed backend services alongside the team, not a passive manager
- Designed and owned the complete CI/CD pipeline and deployment workflow, taking the product from development to live commercial use

---

## Projects

### EulerAI — Architecture Platform · [Live](https://your-link-here)
AI-powered platform for the architecture and construction industry, built and deployed end-to-end as sole engineer.

- Architected and delivered the complete full-stack application (frontend, backend, database) independently
- Owned and configured the entire CI/CD pipeline through to production deployment
- Shipped a live product serving real users in the architecture and construction vertical

### EulerAI — Official Website
Corporate marketing and product site for EulerAI, designed, built, and maintained independently.

- Architected and developed both frontend and backend without external engineering support
- Owned all CI/CD setup and production infrastructure, shipping to a live commercial environment

### TheVineHK · [Live](https://your-link-here)
Commercial edtech web platform for a Hong Kong-based educational organisation, conceived and built solo.

- Solely owned UI/UX design and frontend development from concept through production launch
- Shipped a polished, production-ready product in active commercial use supporting real students and educators

---

## Skills

**Languages:** TypeScript · JavaScript · Python · HTML · CSS

**Frontend:** React · Vite · Tailwind CSS · Framer Motion · Radix UI

**Backend:** Node.js · REST APIs

**Tools:** Git · GitHub · VS Code · Figma

---

## Education

Hong Kong University of Science and Technology (HKUST)

---

## Links

- GitHub: [github.com/Skyrim-line](https://github.com/Skyrim-line)
- Email: sm.wu@eigenflow.ai
`;

const STORAGE_KEY = "cv-content";

function loadInitialMarkdown(search: string): string {
  try {
    const params = new URLSearchParams(search);
    const encoded = params.get("md");
    if (encoded) {
      return decodeURIComponent(atob(encoded));
    }
  } catch {
    // fall through
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ?? DEFAULT_CV;
}

export default function CV() {
  const location = useLocation();
  const { theme } = useTheme();
  const colorMode =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  const [markdown, setMarkdown] = useState<string>(() =>
    loadInitialMarkdown(location.search),
  );
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMarkdownChange = useCallback((value: string | undefined) => {
    const next = value ?? "";
    setMarkdown(next);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, next);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleDownloadPDF = useCallback(() => {
    flushSync(() => setMode("preview"));
    window.print();
  }, []);

  return (
    <div id="cv-print-root" className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Toaster position="top-center" richColors />
      <Navbar />

      <div className="h-14" />
      <div className="sticky top-14 z-10 border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm flex items-center justify-between px-4">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
          CV / Resume
        </h2>
        <CVToolbar
          mode={mode}
          onModeChange={setMode}
          onDownloadPDF={handleDownloadPDF}
          markdown={markdown}
        />
      </div>

      <main className="flex-1 overflow-auto py-6 px-4">
        <div className={mode === "edit" ? "block" : "hidden"}>
          <div className="max-w-5xl mx-auto" data-color-mode={colorMode}>
            <MDEditor
              value={markdown}
              onChange={handleMarkdownChange}
              height={700}
              preview="live"
              className="rounded-lg overflow-hidden shadow-sm"
            />
          </div>
        </div>
        <div className={mode === "preview" ? "block" : "hidden"}>
          <CVPreview ref={previewRef} markdown={markdown} />
        </div>
      </main>
    </div>
  );
}
