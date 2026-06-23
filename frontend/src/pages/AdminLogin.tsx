import { FormEvent, useState } from "react";
import Navbar from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Toaster, toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSupabaseConfigured || !supabase) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="h-14" />
        <main className="mx-auto max-w-xl px-4 py-10">
          <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Supabase not configured
            </h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to
              your frontend environment before using admin login.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Signed in successfully.");
      window.location.hash = "#/admin/cv";
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign in.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Toaster position="top-center" richColors />
      <Navbar />
      <div className="h-14" />
      <main className="mx-auto max-w-xl px-4 py-10">
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Resume Admin</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Sign in with your email and password to edit and publish your resume content.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
