import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="px-6 py-10 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
          <p className="text-lg">
            This is a simple home page built with React, TypeScript, Vite, and
            shadcn UI.
          </p>
        </main>
      </div>
    </>
  );
}
