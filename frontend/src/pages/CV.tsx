import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { CVPreview } from "@/components/cv/CVPreview";
import { CVToolbar } from "@/components/cv/CVToolbar";
import DEFAULT_CV from "@/data/defaultCv.md?raw";
import { useTheme } from "@/components/theme/themeProvider";
import Navbar from "@/components/layout/Header";
import { Toaster } from "sonner";
import { toast } from "sonner";

const STORAGE_KEY = "cv-content";

function loadInitialMarkdown(search: string, canEdit: boolean): string {
  if (!canEdit) {
    return DEFAULT_CV;
  }

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
  const canEdit = import.meta.env.DEV;
  const colorMode = useMemo(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  }, [theme]);
  const [markdown, setMarkdown] = useState<string>(() =>
    loadInitialMarkdown(location.search, canEdit),
  );
  const [mode, setMode] = useState<"edit" | "preview">(canEdit ? "edit" : "preview");
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMarkdownChange = useCallback((value: string | undefined) => {
    if (!canEdit) {
      return;
    }

    const next = value ?? "";
    setMarkdown(next);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, next);
    }, 500);
  }, [canEdit]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleDownloadPDF = useCallback(() => {
    flushSync(() => setMode("preview"));
    window.print();
  }, []);

  const handleSaveToFile = useCallback(async () => {
    if (!canEdit) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/__cv/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown }),
      });

      if (!response.ok) {
        throw new Error("Failed to save CV markdown.");
      }

      localStorage.setItem(STORAGE_KEY, markdown);
      toast.success("CV markdown saved to defaultCv.md", {
        duration: 5000,
      });
    } catch {
      toast.error("Failed to save CV markdown to file.", {
        duration: 6000,
      });
    } finally {
      setIsSaving(false);
    }
  }, [canEdit, markdown]);

  useEffect(() => {
    if (!canEdit) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (!isSaving) {
          void handleSaveToFile();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canEdit, handleSaveToFile, isSaving]);

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
          canEdit={canEdit}
          isSaving={isSaving}
          mode={mode}
          onModeChange={setMode}
          onDownloadPDF={handleDownloadPDF}
          onSave={handleSaveToFile}
          markdown={markdown}
        />
      </div>

      <main className="flex-1 overflow-auto py-6 px-4">
        <div className={canEdit && mode === "edit" ? "block" : "hidden"}>
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
