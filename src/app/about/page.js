import React from "react";
import Link from 'next/link'; // Import Link if needed, though not used in this simple page

export default function About() {
  return (
    <main className="min-h-screen pt-32 px-6 md:px-20 bg-background text-foreground flex flex-col items-center text-center">
      <div className="max-w-3xl animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12">
          Our Story
        </h1>
        
        <div className="space-y-8 text-lg md:text-xl leading-relaxed opacity-80 font-light tracking-wide">
          <p>
            At <span className="font-bold">L'ESSENCE</span>, we believe that fragrance is more than just a scent—it's a journey, a memory, and a statement.
            Founded in 2024, our mission is to craft exceptional fragrances that resonate with the modern individual.
          </p>
          <p>
             We source the finest ingredients from around the globe, ensuring each bottle is a masterpiece of olfactory art. 
             From the deep forests of the north to the spice markets of the east, our collections are a curated exploration of the world's most evocative aromas.
          </p>
          <p>
            Sustainable, ethical, and unapologetically luxurious.
          </p>
        </div>

        <div className="mt-16">
            <div className="w-full h-[1px] bg-foreground/20 mb-16" />
            <p className="uppercase tracking-[0.5em] text-sm opacity-50">Est. 2024 • Paris • New York</p>
        </div>
      </div>
    </main>
  );
}
