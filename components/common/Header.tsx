"use client";

import { Globe2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return pathname === path 
      ? "text-white font-medium bg-white/20" 
      : "text-white/90 hover:text-white hover:bg-white/15";
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Dynamic background based on scroll */}
      <div className={`${
        isScrolled 
          ? "bg-orange-400/70 backdrop-blur-sm" 
          : "bg-orange-400"
        } transition-all duration-500 border-b border-white/20`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg tracking-tight">Bidirectional</h1>
                <p className="text-orange-200 text-xs font-medium tracking-wider">TRANSLATION SYSTEM</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex gap-2">
              <Link 
                href="/" 
                className={`${isActive('/')} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`${isActive('/about')} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`${isActive('/contact')} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}