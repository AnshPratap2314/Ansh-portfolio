import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { fastScrollTo } from "../utils/scrollHelper";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    // Lightweight passive scroll listener for navbar background state
    const handleScrollThrottled = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    window.addEventListener("scroll", handleScrollThrottled, { passive: true });

    // High-performance IntersectionObserver for active link indicator
    const sections = ["about", "skills", "projects", "experience", "education", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Small tick to let drawer close before scrolling
      setTimeout(() => {
        fastScrollTo(id);
      }, 50);
    } else {
      fastScrollTo(id);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection("about");
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    fastScrollTo("top", 180);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 select-none ${
          scrolled
            ? "bg-[#061329]/95 backdrop-blur-md border-b border-[#203B5B] shadow-lg shadow-[#040f22]/50 py-3 sm:py-3.5"
            : "bg-[#061329]/90 backdrop-blur-md border-b border-[#203B5B]/70 py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Monogram */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer min-w-0"
            aria-label="Back to top"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg overflow-hidden border border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.2)] group-hover:border-[#00D4FF] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all bg-[#0B1F3A] flex items-center justify-center">
              <img
                src={PORTFOLIO_DATA.profile.avatarUrl}
                alt={PORTFOLIO_DATA.profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold tracking-wider text-xs sm:text-sm uppercase text-[#F5F8FF] group-hover:text-[#00D4FF] transition-colors truncate">
                {PORTFOLIO_DATA.profile.name}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#B4C3D8] font-mono uppercase truncate hidden min-[360px]:block">
                {PORTFOLIO_DATA.profile.title}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#B4C3D8]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`transition-colors whitespace-nowrap relative py-1 cursor-pointer select-none ${
                    isActive
                      ? "text-[#00D4FF] font-semibold"
                      : "hover:text-[#00D4FF]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Call to Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-medium text-[#F5F8FF] bg-[#0D203B] border border-[#203B5B] hover:border-[#00D4FF]/60 hover:text-[#00D4FF] transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D4FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                fastScrollTo("contact");
                onOpenContact();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold text-[#061329] bg-[#00D4FF] hover:bg-[#38bdf8] shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Hire me</span>
            </a>

            {/* Mobile Menu Toggle Button with guaranteed touch area */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-[#203B5B] bg-[#0A1930] text-[#B4C3D8] hover:text-[#00D4FF] hover:border-[#00D4FF]/60 active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5 text-[#00D4FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden bg-[#0A1930] border-b border-[#203B5B] px-4 pt-3 pb-5 space-y-1.5 shadow-2xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer active:scale-[0.99] touch-manipulation ${
                    activeSection === link.id
                      ? "bg-[#0D203B] text-[#00D4FF] font-semibold border-l-2 border-[#00D4FF]"
                      : "text-[#B4C3D8] hover:text-[#00D4FF] hover:bg-[#0D203B]/60"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[#203B5B]/70 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#F5F8FF] bg-[#0D203B] border border-[#203B5B] rounded-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-[#00D4FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Resume</span>
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      fastScrollTo("contact");
                      onOpenContact();
                    }, 50);
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#061329] bg-[#00D4FF] hover:bg-[#38bdf8] rounded-lg active:scale-95 transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Hire me</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay when mobile menu is open - closes menu when tapped */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};
