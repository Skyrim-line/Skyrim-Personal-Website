import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CVPreview } from "@/components/cv/CVPreview";
import { CVToolbar } from "@/components/cv/CVToolbar";
import DEFAULT_CV from "@/data/defaultCv.md?raw";
import Navbar from "@/components/layout/Header";
import { Toaster, toast } from "sonner";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const RESUME_SLUG = "default";

function loadSharedMarkdown(search: string): string | null {
  try {
    const params = new URLSearchParams(search);
    const encoded = params.get("md");
    if (encoded) {
      return decodeURIComponent(atob(encoded));
    }
  } catch {
    // fall through
  }

  return null;
}

export default function CV() {
  const location = useLocation();
  const [markdown, setMarkdown] = useState<string>(() => loadSharedMarkdown(location.search) ?? DEFAULT_CV);
  const [mode, setMode] = useState<"edit" | "preview">("preview");
  const [isLoading, setIsLoading] = useState(() => loadSharedMarkdown(location.search) === null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sharedMarkdown = loadSharedMarkdown(location.search);
    if (sharedMarkdown) {
      setMarkdown(sharedMarkdown);
      setIsLoading(false);
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setMarkdown(DEFAULT_CV);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadPublishedResume = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("resume_documents")
        .select("published_markdown")
        .eq("slug", RESUME_SLUG)
        .eq("is_published", true)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        toast.error("Failed to load published resume. Showing local fallback.");
        setMarkdown(DEFAULT_CV);
      } else {
        setMarkdown(data?.published_markdown ?? DEFAULT_CV);
      }
      setIsLoading(false);
    };

    void loadPublishedResume();

    return () => {
      isMounted = false;
    };
  }, [location.search]);

  const handleDownloadPDF = useCallback(() => {
    setMode("preview");
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
          canEdit={false}
          mode={mode}
          onModeChange={setMode}
          onDownloadPDF={handleDownloadPDF}
          markdown={markdown}
        />
      </div>

      <main className="flex-1 overflow-auto py-6 px-4">
        {isLoading ? (
          <div className="mx-auto max-w-5xl text-sm text-gray-600 dark:text-gray-300">
            Loading published resume...
          </div>
        ) : (
          <div className={mode === "preview" ? "block" : "hidden"}>
            <CVPreview ref={previewRef} markdown={markdown} />
          </div>
        )}
      </main>
    </div>
  );
}
