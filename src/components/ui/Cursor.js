"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleHoverStart = () => {
      setHovered(true);
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 2, opacity: 0.5, duration: 0.3 });
    };

    const handleHoverEnd = () => {
      setHovered(false);
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    // Attach generic hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .magnetic-wrap"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });
    
    // Cleanup and re-attach on DOM mutations might be needed for dynamic content
    // For now, this covers static/initial elements. 
    // Ideally use a context or global observer for dynamic apps.

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-foreground rounded-full pointer-events-none z-[9999]"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-foreground rounded-full pointer-events-none z-[9998] transition-transform duration-300"
      />
    </>
  );
}
