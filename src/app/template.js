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
    animatePageIn();
  }, [pathname]);

  const animatePageIn = () => {
    const banners = [bannerOne.current, bannerTwo.current, bannerFour.current, bannerThree.current];
    if (banners[0]) {
      gsap.set(banners, { yPercent: 0 });
      gsap.to(banners, {
        yPercent: 100,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.inOut",
      });
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
