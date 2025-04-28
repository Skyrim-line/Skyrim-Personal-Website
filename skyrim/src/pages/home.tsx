import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Skyrim from "@/assets/homepage.jpg";
function Home() {
  return (
    <div className="bg-base-300 min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="bg-base-300 flex">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 space-y-4">
              <h1 className="text-5xl font-bold">Hey! I &apos;m Skyrim Wu</h1>
              <p className="text-lg">
                Software Engineer, Web Developer, and Tech Enthusiast also a
                Photographer. I love building amazing applications and exploring
                new technologies.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
              <img
                src={Skyrim}
                alt="Skyrim"
                className="rounded-lg shadow-2xl w-full h-auto object-cover max-h-[700px]"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
