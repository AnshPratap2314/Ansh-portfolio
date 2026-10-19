import React from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { fastScrollTo } from "../utils/scrollHelper";

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    fastScrollTo("top", 180);
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    fastScrollTo(id);
  };

  return (
    <footer className="w-full bg-[#040D1D] border-t border-[#203B5B]/80 text-[#8EA3BE] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#203B5B]/60">
          {/* Logo & Brand with User Photo */}
          <div className="flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-10 h-10 rounded-xl object-cover border border-[#00D4FF]/50 shadow-[0_0_15px_rgba(0,212,255,0.25)] hover:border-[#00D4FF] transition-all"
              loading="lazy"
            />
            <div>
              <span className="font-mono text-base font-bold text-[#F5F8FF] tracking-wider block">
                {profile.name}
              </span>
              <span className="text-xs text-[#00D4FF] font-mono tracking-widest uppercase">
                {profile.title}
              </span>
            </div>
          </div>

          {/* Quick nav links with fast scrolling */}
          <nav className="flex flex-wrap gap-6 text-xs font-mono">
            <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
              About
            </a>
            <a href="#skills" onClick={(e) => handleNavClick(e, "skills")} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
              Skills
            </a>
            <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
              Builds
            </a>
            <a href="#experience" onClick={(e) => handleNavClick(e, "experience")} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
              Experience
            </a>
            <a href="#education" onClick={(e) => handleNavClick(e, "education")} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
              Education
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-[#00D4FF] transition-colors cursor-pointer text-left"
            >
              Resume
            </button>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
              Contact
            </a>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#0D203B] border border-[#203B5B] hover:border-[#00D4FF]/50 text-[#8EA3BE] hover:text-[#00D4FF] transition-all cursor-pointer self-start md:self-auto"
            title="Scroll to top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        {/* Bottom copyright and notes */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[#8EA3BE]/80 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-[#203B5B]">|</span>
            <span className="text-[#00D4FF] font-semibold text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              4th Year Final Year B.Tech CSE · Available for Hire
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4FF] transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4FF] transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-[#00D4FF] transition-colors"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
