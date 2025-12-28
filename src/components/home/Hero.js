"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Reveal
    tl.fromTo(
      textRef.current.children,
      { y: 100, opacity: 0, skewY: 10 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      }
    );

    // Parallax Effect
    gsap.to(textRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden"
    >
      <div
        ref={textRef}
        className="z-10 text-center flex flex-col items-center gap-4"
      >
        <h1 className="text-[12vw] leading-none font-bold tracking-tighter uppercase mix-blend-difference">
          Perfume
        </h1>
        <h2 className="text-[12vw] leading-none font-light tracking-widest uppercase mix-blend-difference">
          Store
        </h2>
        <p className="mt-8 text-xl md:text-2xl uppercase tracking-[0.5em] font-medium opacity-70 mix-blend-difference">
          Essence of Luxury
        </p>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <span className="text-sm uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
