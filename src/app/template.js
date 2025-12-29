"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();
  const bannerOne = useRef(null);
  const bannerTwo = useRef(null);
  const bannerThree = useRef(null);
  const bannerFour = useRef(null);

  useEffect(() => {
    const ctx = animatePageIn();
    return () => ctx && ctx.revert();
  }, [pathname]);

  const animatePageIn = () => {
    const banners = [bannerOne.current, bannerTwo.current, bannerFour.current, bannerThree.current];
    if (banners[0]) {
      let ctx = gsap.context(() => {
          gsap.set(banners, { yPercent: 0 });
          gsap.to(banners, {
            yPercent: 100,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.inOut",
          });
      });
      // We can't revert immediately here, but since it's a transition it usually plays through.
      // However, for best practice in React 18 strict mode, context is better used in useEffect.
      // But since this is a function called from useEffect, we should probably move the context creation to the useEffect.
      return ctx; 
    }
  };

  return (
    <>
      <div 
         className="min-h-screen"
      >
        {children}
      </div>
      
      {/* Overlay Banners for Transition */}
      <div ref={bannerOne} className="fixed top-0 left-0 w-1/4 h-full bg-neutral-900 z-[70] pointer-events-none" />
      <div ref={bannerTwo} className="fixed top-0 left-1/4 w-1/4 h-full bg-neutral-900 z-[70] pointer-events-none" />
      <div ref={bannerThree} className="fixed top-0 left-2/4 w-1/4 h-full bg-neutral-900 z-[70] pointer-events-none" />
      <div ref={bannerFour} className="fixed top-0 left-3/4 w-1/4 h-full bg-neutral-900 z-[70] pointer-events-none" />
    </>
  );
}
