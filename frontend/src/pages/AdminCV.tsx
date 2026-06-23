import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import type { Session } from "@supabase/supabase-js";
import Navbar from "@/components/layout/Header";
import { CVPreview } from "@/components/cv/CVPreview";
import DEFAULT_CV from "@/data/defaultCv.md?raw";
import { useTheme } from "@/components/theme/themeProvider";
import { Button } from "@/components/ui/button";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Toaster, toast } from "sonner";

const RESUME_SLUG = "default";

function buildDraftPayload(markdown: string) {
  return {
    slug: RESUME_SLUG,
    draft_markdown: markdown,
    updated_at: new Date().toISOString(),
  };
}

function buildPublishPayload(markdown: string) {
  const now = new Date().toISOString();

  return {
    slug: RESUME_SLUG,
    draft_markdown: markdown,
    published_markdown: markdown,
    is_published: true,
    updated_at: now,
    published_at: now,
  };
}

export default function AdminCV() {
  const { theme } = useTheme();
  const colorMode = useMemo(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  }, [theme]);

  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoadingResume, setIsLoadingResume] = useState(true);
  const [markdown, setMarkdown] = useState(DEFAULT_CV);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setIsCheckingSession(false);
      return;
    }

    let isMounted = true;

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(data.session);
        setIsCheckingSession(false);
      }
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
        setIsCheckingSession(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadResume = useCallback(async () => {
    if (!supabase) {
      setIsLoadingResume(false);
      return;
    }

    setIsLoadingResume(true);
    const { data, error } = await supabase
      .from("resume_documents")
      .select("draft_markdown, published_markdown")
      .eq("slug", RESUME_SLUG)
      .maybeSingle();

    if (error) {
      toast.error("Failed to load resume content from Supabase.");
      setIsLoadingResume(false);
      return;
    }

    setMarkdown(data?.draft_markdown ?? data?.published_markdown ?? DEFAULT_CV);
    setIsLoadingResume(false);
  }, []);

  useEffect(() => {
    if (session) {
      void loadResume();
    }
  }, [loadResume, session]);

  const handleSave = useCallback(async () => {
    if (!supabase) {
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("resume_documents")
        .upsert(buildDraftPayload(markdown), { onConflict: "slug" });

      if (error) {
        throw error;
      }

      toast.success("Draft saved to Supabase.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save draft.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }, [markdown]);

  const handlePublish = useCallback(async () => {
    if (!supabase) {
      return;
    }

    setIsPublishing(true);
    try {
      const { error } = await supabase
        .from("resume_documents")
        .upsert(buildPublishPayload(markdown), { onConflict: "slug" });

      if (error) {
        throw error;
      }

      toast.success("Resume published.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to publish resume.";
      toast.error(message);
    } finally {
      setIsPublishing(false);
    }
  }, [markdown]);

  const handleSignOut = useCallback(async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    toast.success("Signed out.");
  }, []);

  if (!isSupabaseConfigured || !supabase) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="h-14" />
        <main className="mx-auto max-w-2xl px-4 py-10">
          <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Supabase not configured
            </h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Add your Supabase environment variables before opening the admin editor.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="h-14" />
        <main className="mx-auto max-w-2xl px-4 py-10 text-sm text-gray-600 dark:text-gray-300">
          Checking session...
        </main>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Toaster position="top-center" richColors />
      <Navbar />

      <div className="h-14" />
      <div className="sticky top-14 z-10 border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resume Admin</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Signed in as {session.user.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-md border bg-gray-50 p-0.5 dark:bg-gray-800">
              <Button
                variant={mode === "edit" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("edit")}
                className="h-7 px-3 text-xs">
                Edit
              </Button>
              <Button
                variant={mode === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("preview")}
                className="h-7 px-3 text-xs">
                Preview
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={() => void handleSave()} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button size="sm" onClick={() => void handlePublish()} disabled={isPublishing}>
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => void handleSignOut()}>
              Sign out
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-auto px-4 py-6">
        {isLoadingResume ? (
          <div className="mx-auto max-w-6xl text-sm text-gray-600 dark:text-gray-300">
            Loading resume...
          </div>
        ) : (
          <>
            <div className={mode === "edit" ? "block" : "hidden"}>
              <div className="mx-auto max-w-6xl" data-color-mode={colorMode}>
                <MDEditor
                  value={markdown}
                  onChange={(value) => setMarkdown(value ?? "")}
                  height={720}
                  preview="live"
                  className="overflow-hidden rounded-lg shadow-sm"
                />
              </div>
            </div>
            <div className={mode === "preview" ? "block" : "hidden"}>
              <CVPreview markdown={markdown} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
