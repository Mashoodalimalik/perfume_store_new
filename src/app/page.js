import Hero from "@/components/home/Hero";
import ProjectGrid from "@/components/projects/ProjectGrid";

export default function Home() {
  return (
    <main className="min-h-[200vh]"> {/* Extra height to test scroll */}
      <Hero />
      <section className="h-screen w-full overflow-hidden relative">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 text-center mix-blend-difference pointer-events-none">
           <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-white">Our Collection</h2>
           <p className="text-sm mt-2 tracking-[0.3em] uppercase opacity-70 text-white">Curated Scents</p>
        </div>
        <ProjectGrid />
      </section>
    </main>
  );
}
