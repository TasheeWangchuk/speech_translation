// "use client";

// import { Globe2 } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function Header() {
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const isActive = (path) => {
//     return pathname === path
//       ? "text-white font-medium bg-white/20"
//       : "text-white/90 hover:text-white hover:bg-white/15";
//   };

//   return (
//     <header className="sticky top-0 z-50">
//       {/* Dynamic background based on scroll */}
//       <div
//         className={`${
//           isScrolled ? "bg-orange-400/70 backdrop-blur-sm" : "bg-orange-400"
//         } transition-all duration-500 border-b border-white/20`}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo and Title */}
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
//                 <img src="/logo2.png" alt="Logo"/>
//               </div>
//               <div>
//                 <h1 className="text-white font-semibold text-lg tracking-tight">
//                   Bidirectional
//                 </h1>
//                 <p className="text-orange-200 text-xs font-medium tracking-wider">
//                   TRANSLATION SYSTEM
//                 </p>
//               </div>
//             </div>

//             {/* Navigation */}
//             <nav className="flex gap-2">
//               <Link
//                 href="/"
//                 className={`${isActive(
//                   "/"
//                 )} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/about"
//                 className={`${isActive(
//                   "/about"
//                 )} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/contact"
//                 className={`${isActive(
//                   "/contact"
//                 )} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
//               >
//                 Contact
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`fixed w-full z-50 h-20 flex items-center transition-all duration-300 ${scrolled ? 'bg-gray-600 backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-white text-xl font-bold">
            Dzongkha NLP
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="text-white hover:text-amber-200 transition-colors">
      {children}
    </Link>
  );
};

export default Header;