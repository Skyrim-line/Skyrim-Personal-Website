import Navbar from "@/components/layout/Header";

export default function Pee() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold mb-4">Pee</h1>
        <p className="text-lg text-muted-foreground">Coming soon.</p>
      </main>
    </div>
  );
}
