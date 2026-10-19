import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { fastScrollTo } from "../utils/scrollHelper";
import { InteractiveSkillTag } from "./InteractiveSkillTag";

interface SkillsSectionProps {
  onOpenSkillPreview?: (skillName: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onOpenSkillPreview }) => {
  const [filter, setFilter] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillCategories = PORTFOLIO_DATA.skills;

  const filterTabs = [
    { id: "all", label: "All Skills" },
    { id: "core", label: "Core ML & Python" },
    { id: "ai", label: "Generative AI" },
    { id: "backend", label: "Backend & Systems" },
  ];

  // Flat list of all premier tools for the continuous infinite marquee line
  const marqueeTools = [
    { name: "Python 3.11", tag: "Primary Language" },
    { name: "Scikit-Learn", tag: "NLP & ML" },
    { name: "FastAPI", tag: "Async Backend" },
    { name: "Google Gemini 2.5", tag: "Structured LLM" },
    { name: "Pytest (238 Suites)", tag: "Regression Testing" },
    { name: "Pydantic v2", tag: "Schema Validation" },
    { name: "OpenCV", tag: "Computer Vision" },
    { name: "TF-IDF Vectorizer", tag: "Feature Extraction" },
    { name: "NumPy & Pandas", tag: "Data Engineering" },
    { name: "MongoDB Atlas", tag: "Document Store" },
    { name: "Docker", tag: "Containerization" },
    { name: "Render Cloud", tag: "Production CI/CD" },
    { name: "RESTful Web APIs", tag: "Microservices" },
    { name: "Eigenfaces & PCA", tag: "Dimensionality Reduction" },
  ];

  // Repeat 4x to guarantee a gapless marquee across wide monitors
  const repeatedMarqueeTools = [...marqueeTools, ...marqueeTools, ...marqueeTools, ...marqueeTools];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#203B5B]/50 tech-grid-bg relative overflow-hidden">
      {/* Ambient background GPU-optimized glow orb with div motion */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)] pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 relative z-10"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#00D4FF] uppercase">
              02 — SKILLS &amp; ARCHITECTURE
            </span>
            
            {/* Moving Line with Marquee Laser Scanner Motion */}
            <div className="relative h-1 w-40 sm:w-56 bg-[#203B5B]/70 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent shadow-[0_0_15px_#00D4FF]"
                animate={{
                  x: [-100, 240],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F8FF] tracking-tight">
            Technical Arsenal.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#B4C3D8] max-w-2xl leading-relaxed">
            A production-proven stack developed across training NLP classifiers, structured LLM pipelines, and high-concurrency FastAPI microservices.
          </p>
        </div>

        {/* Filter Pills with animated layoutId motion */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1.5 rounded-xl bg-[#09182E] border border-[#203B5B]/80 shadow-lg w-full sm:w-auto">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-mono transition-colors cursor-pointer select-none flex-1 sm:flex-initial text-center ${
                  isActive ? "text-[#061329] font-bold" : "text-[#8EA3BE] hover:text-[#F5F8FF]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#38bdf8] rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* CONTINUOUS MOVING MARQUEE LINE OF TOOLS WITH MOTION.DIV */}
      <div className="w-full mb-12 rounded-xl bg-[#08182E] border border-[#203B5B]/80 p-2.5 overflow-hidden relative shadow-inner">
        {/* Subtle Edge Gradients for Smooth Visual Transitions */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#08182E] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#08182E] to-transparent z-10" />

        {/* Moving Marquee Track */}
        <motion.div
          className="flex items-center gap-4 whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 32,
            repeat: Infinity,
          }}
        >
          {repeatedMarqueeTools.map((tool, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D203B] border border-[#203B5B] text-xs font-mono text-[#F5F8FF] shrink-0 hover:border-[#00D4FF]/60 transition-colors shadow-sm cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
              <span className="font-semibold text-white">{tool.name}</span>
              <span className="text-[10px] text-[#8EA3BE] bg-[#061329] px-1.5 py-0.5 rounded border border-[#203B5B]/50">
                {tool.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Grid of Skill Categories with div motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {skillCategories.map((group, idx) => {
            const isAiGroup = group.title.includes("AI") || group.title.includes("Machine") || group.title.includes("Generative");
            const isBackendGroup = group.title.includes("Backend") || group.title.includes("Databases") || group.title.includes("Web") || group.title.includes("Testing");
            const isCoreGroup = group.title.includes("Programming") || group.title.includes("Machine Learning");

            if (filter === "core" && !isCoreGroup && !group.title.includes("AI")) return null;
            if (filter === "ai" && !isAiGroup) return null;
            if (filter === "backend" && !isBackendGroup) return null;

            return (
              <motion.div
                key={group.title}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  borderColor: "rgba(0, 212, 255, 0.6)",
                  boxShadow: "0 15px 35px -5px rgba(0, 212, 255, 0.18)",
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl bg-[#0D203B]/85 border border-[#203B5B] p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative z-10 hover:z-20 ${
                  group.isFullWidth ? "md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#0D203B] via-[#0B1E38] to-[#0A1A32]" : ""
                }`}
              >
                {/* Dynamic animated top edge scanner beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden rounded-t-2xl pointer-events-none">
                  <motion.div
                    className="h-full w-full bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent group-hover:via-[#00D4FF] transition-all duration-500"
                  />
                </div>

                <div>
                  {/* Category Header */}
                  <div className={`mb-4 ${group.isFullWidth ? "flex flex-col sm:flex-row sm:items-center justify-between gap-3" : "space-y-2.5"}`}>
                    <h3 className="font-mono text-sm sm:text-[15px] font-bold text-[#F5F8FF] tracking-wide flex items-center gap-2.5">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-[#00D4FF] shrink-0"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.2 }}
                      />
                      <span>{group.title}</span>
                    </h3>

                    {group.footer && (
                      <div className="flex items-center">
                        <motion.span
                          whileHover={{ scale: 1.03 }}
                          className="font-mono text-[10px] text-[#00D4FF] uppercase px-2.5 py-0.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 font-semibold shadow-sm tracking-wide"
                        >
                          {group.footer}
                        </motion.span>
                      </div>
                    )}
                  </div>

                  {group.description && (
                    <p className="text-xs text-[#8EA3BE] mb-4 leading-relaxed">
                      {group.description}
                    </p>
                  )}

                  {/* Skill Badge Tags with elevated glow and floating Preview pill */}
                  <div className="flex flex-wrap gap-2.5 pt-1 pb-4">
                    {group.items.map((item: any, itemIdx: number) => (
                      <InteractiveSkillTag
                        key={itemIdx}
                        name={item.name}
                        highlight={Boolean(item.highlight)}
                        bold={Boolean(item.bold)}
                        onPreview={onOpenSkillPreview}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer validation indicator */}
                <div className="mt-6 pt-4 border-t border-[#203B5B]/40 flex items-center justify-between text-[11px] font-mono text-[#8EA3BE]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Verified in production code</span>
                  </span>
                  <motion.svg
                    className="w-3.5 h-3.5 text-[#00D4FF]/60 group-hover:text-[#00D4FF] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 45 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Engineering Philosophy callout with full motion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        whileHover={{ borderColor: "rgba(0, 212, 255, 0.4)" }}
        className="mt-8 rounded-2xl bg-[#09182D] border border-[#203B5B] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden group"
      >
        {/* Animated Scanline Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/5 to-transparent pointer-events-none animate-scanline" />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-[#00D4FF] font-semibold tracking-wider uppercase">
              TESTING DISCIPLINE &amp; PRODUCTION INTEGRITY
            </span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#F5F8FF]">
            238 Pytest regression test suites passing across edge inputs &amp; safety escalations.
          </div>
          <p className="text-xs sm:text-sm text-[#8EA3BE] max-w-2xl leading-relaxed">
            Software engineering fundamentals come first: typed Pydantic payloads, error boundary fallbacks, Dockerized deployment on Render Cloud, and deterministic safety filters.
          </p>
        </div>

        <motion.a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            fastScrollTo("projects");
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,212,255,0.4)" }}
          whileTap={{ scale: 0.96 }}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00D4FF] text-[#061329] font-mono font-bold text-xs transition-all cursor-pointer shadow-md relative z-10"
        >
          <span>Explore Architecture Builds</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
};
