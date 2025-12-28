"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import MenuOverlay from "./MenuOverlay";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();
  
  // Hide Navigation on Admin pages and Auth pages (optional, but cleaner)
  if (pathname.startsWith('/admin')) {
      return null;
  }

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <MenuOverlay isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </>
  );
}
