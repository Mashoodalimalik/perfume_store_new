"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import gsap from "gsap";

export default function MenuOverlay({ isOpen, closeMenu }) {
  const menuRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        ".menu-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4 }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 bg-background text-foreground z-[60] flex flex-col justify-center items-center transform -translate-y-full will-change-transform overflow-y-auto"
    >
      <nav className="flex flex-col gap-8 text-center py-20" ref={contentRef}>
        {[
          { name: "Home", href: "/" },
          { name: "Our Collection", href: "/collection" },
          { name: "Track Order", href: "/order-tracking" },
          { name: "About", href: "/about" },
          { name: "Contact", href: "/contact" },
        ].map((item, i) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={closeMenu}
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-accent transition-colors"
          >
            {item.name}
          </Link>
        ))}
        <Link
            href="/wishlist"
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-accent transition-colors"
            onClick={closeMenu}
        >
            Wishlist
        </Link>
      </nav>

      {/* Close Button at Bottom Mid */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
        <button
            onClick={closeMenu}
            className="p-3 bg-foreground text-background rounded-full hover:scale-110 transition-transform magnetic-wrap"
            aria-label="Close Menu"
        >
            <X size={32} />
        </button>
      </div>

      <div className="absolute top-10 right-10 text-sm opacity-50 space-x-4 hidden md:block">
        <span className="menu-item">Instagram</span>
        <span className="menu-item">Twitter</span>
      </div>
    </div>
  );
}
