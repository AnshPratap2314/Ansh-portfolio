import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { InteractiveSkillTag } from "./InteractiveSkillTag";
import type { ReadmeTarget } from "./ReadmeModal";

interface ProjectsSectionProps {
  onOpenCaseStudy: (projectId: string) => void;
  onOpenDemo: (projectId: string) => void;
  onOpenSkillPreview?: (skillName: string) => void;
  onOpenReadme?: (target: ReadmeTarget) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenCaseStudy,
  onOpenDemo,
  onOpenSkillPreview,
  onOpenReadme,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<{ [key: string]: number }>({});
  const { isDark } = useTheme();

  const filterTabs = [
    { id: "all", label: "All Builds" },
    { id: "ai-ml", label: "AI/ML" },
    { id: "full-stack", label: "Full-Stack" },
    { id: "automation", label: "Automation" },
    { id: "genai", label: "Generative AI" },
    { id: "vision", label: "Computer Vision" },
  ];

  const projectPipelines: Record<string, { steps: string[]; detail: string[] }> = {
    mindcare: {
      steps: ["User Query", "Safety & Negation Filter", "TF-IDF + Calibrated Model", "FastAPI Safe Engine", "Safe Response / Hotline"],
      detail: [
        "Inbound user input sanitization & multi-turn session tracking",
        "Deterministic rule-based safety layer intercepting self-harm/crisis phrases before model inference",
        "Scikit-learn text classification pipeline evaluating intent and distress confidence",
        "FastAPI async endpoint with sub-18ms execution SLA & 238 Pytest regression guards",
        "Zero-latency safety escalation with resource hotlines when threshold exceeded"
      ]
    },
    interview: {
      steps: ["Role & Difficulty", "Question Bank & History", "Candidate Answer Input", "Gemini Structured API", "Scored Radar & Feedback"],
      detail: [
        "Role track selector (AI/ML Engineer, Python Backend, GenAI Systems) and experience tier",
        "Curated question generator with repetition avoidance and history tracking",
        "Real-time code or spoken/free-text answer capture and syntax parsing",
        "Google Gemini API invoked with strict Pydantic JSON schema output constraints",
        "Deterministic score radar (Technical Depth, Problem Solving, Clarity) and actionable improvement items"
      ]
    },
    studyverse: {
      steps: ["Document Upload (PDF)", "Text Chunking & Indexing", "MongoDB Document Store", "Google GenAI Socratic Tutor", "Active Revision & Quiz"],
      detail: [
        "Multi-page syllabus, textbook, and research paper ingestion pipeline",
        "Semantic chunking and embedding indexing for contextual retrieval (RAG)",
        "Document metadata and user revision notebook persistence in MongoDB",
        "Multi-modal AI tutor with Socratic guidance, exam drill, and summary modes",
        "Instant interactive flashcard generation and quiz knowledge checks"
      ]
    }
  };

  const flagshipProjects = PORTFOLIO_DATA.projects.filter(
    (p) => p.id === "mindcare" || p.id === "interview" || p.id === "studyverse"
  );

  const pcaProject = PORTFOLIO_DATA.projects.find((p) => p.id === "pca");
  const aishieProject = PORTFOLIO_DATA.projects.find((p) => p.id === "aishie");

  const matchesFilterFor = (project: Project, filterId: string) => {
    if (filterId === "all") return true;
    if (filterId === "ai-ml")
      return (
        project.category.includes("AI/ML") ||
        project.category.includes("MACHINE LEARNING") ||
        project.category.includes("GENERATIVE AI") ||
        project.tags.some((t) =>
          ["Scikit-learn", "Google Gemini API", "PCA"].includes(t)
        )
      );
    if (filterId === "full-stack")
      return (
        project.category.includes("FULL-STACK") ||
        project.category.includes("API ENGINEERING") ||
        project.category.includes("BACKEND ENGINEERING") ||
        project.tags.some((t) =>
          ["FastAPI", "Node.js", "Express.js", "MongoDB"].includes(t)
        )
      );
    if (filterId === "automation")
      return (
        project.category.includes("AUTOMATION") ||
        project.id === "aishie" ||
        project.approach.toLowerCase().includes("automation")
      );
    if (filterId === "genai")
      return (
        project.category.includes("GENERATIVE") ||
        project.tags.some((t) =>
          ["Google Gemini API", "Google GenAI SDK"].includes(t)
        )
      );
    if (filterId === "vision")
      return (
        project.category.includes("VISION") || project.tags.includes("OpenCV")
      );
    return true;
  };

  const getCategoryCount = (filterId: string) =>
    PORTFOLIO_DATA.projects.filter((p) => matchesFilterFor(p, filterId)).length;

  const filteredFlagships = flagshipProjects.filter((p) =>
    matchesFilterFor(p, activeFilter)
  );
  const showPca = pcaProject && matchesFilterFor(pcaProject, activeFilter);
  const showAishie =
    aishieProject && matchesFilterFor(aishieProject, activeFilter);
  const totalVisible =
    filteredFlagships.length + (showPca ? 1 : 0) + (showAishie ? 1 : 0);
  const activeTabLabel =
    filterTabs.find((t) => t.id === activeFilter)?.label || "All Builds";

  const flagshipHoverShadow = isDark
    ? "0 22px 50px -12px rgba(0, 212, 255, 0.26), 0 0 32px rgba(0, 212, 255, 0.16)"
    : "0 22px 44px -12px rgba(3, 105, 161, 0.2), 0 8px 20px -6px rgba(15, 23, 42, 0.08)";

  const secondaryHoverShadow = isDark
    ? "0 18px 40px -12px rgba(0, 212, 255, 0.24), 0 0 24px rgba(0, 212, 255, 0.14)"
    : "0 18px 36px -12px rgba(3, 105, 161, 0.18), 0 6px 18px -6px rgba(15, 23, 42, 0.08)";

  const experimentHoverShadow = isDark
    ? "0 14px 32px -10px rgba(0, 212, 255, 0.24), 0 0 20px rgba(0, 212, 255, 0.14)"
    : "0 14px 28px -10px rgba(3, 105, 161, 0.18), 0 4px 12px -4px rgba(15, 23, 42, 0.07)";

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD6E6] dark:border-[#203B5B]/50 tech-grid-bg">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#0369A1] dark:text-[#00D4FF] uppercase">
              03 — FEATURED BUILDS
            </span>
            <div className="h-px w-12 bg-[#0369A1]/40 dark:bg-[#00D4FF]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] tracking-tight">
            Production Software, Not Just Notebooks.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#2B3B52] dark:text-[#B4C3D8] max-w-2xl">
            Each project is architected with real-world engineering constraints: deterministic safety filters, strictly validated LLM outputs, regression test suites, and deployed cloud endpoints.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-[#EAF0F8] dark:bg-[#09182E] border border-[#CBD6E6] dark:border-[#203B5B]/80 shadow-sm dark:shadow-lg self-start lg:self-auto"
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            const count = getCategoryCount(tab.id);
            return (
              <motion.button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  setActiveFilter((prev) =>
                    prev === tab.id && tab.id !== "all" ? "all" : tab.id
                  )
                }
                className={`relative px-3.5 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 select-none ${
                  isActive
                    ? "text-white dark:text-[#061329] font-bold"
                    : "text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#0369A1] to-[#0284C7] dark:from-[#00D4FF] dark:to-[#38bdf8] rounded-lg shadow-md dark:shadow-[0_0_16px_rgba(0,212,255,0.45)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-white/20 text-white dark:bg-[#061329]/20 dark:text-[#061329]"
                      : "bg-white dark:bg-[#0D203B] text-[#0369A1] dark:text-[#00D4FF]"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Active Filter Status Bar */}
      {activeFilter !== "all" && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-[#09182E]/90 border border-[#0369A1]/35 dark:border-[#00D4FF]/30 text-xs font-mono shadow-xs">
          <span className="text-[#2B3B52] dark:text-[#B4C3D8]">
            Showing{" "}
            <strong className="text-[#0369A1] dark:text-[#00D4FF]">{totalVisible}</strong>{" "}
            {totalVisible === 1 ? "project" : "projects"} in{" "}
            <strong className="text-[#09111E] dark:text-[#F5F8FF]">{activeTabLabel}</strong>
          </span>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="text-[#0369A1] dark:text-[#00D4FF] hover:text-[#075985] dark:hover:text-[#38bdf8] hover:underline cursor-pointer font-semibold"
          >
            Reset filter ×
          </button>
        </div>
      )}

      {/* Featured Projects List */}
      {filteredFlagships.length > 0 && (
        <div className="space-y-16 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredFlagships.map((project: Project, index: number) => {
              const isReversed = index % 2 === 1;
              const pipeline = projectPipelines[project.id];
              const activeStepIndex = selectedPipelineStep[project.id] ?? 0;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  whileHover={{
                    y: -6,
                    borderColor: isDark ? "rgba(0, 212, 255, 0.75)" : "rgba(3, 105, 161, 0.7)",
                    boxShadow: flagshipHoverShadow,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-[#CBD6E6] dark:border-[#203B5B] overflow-hidden hover:border-[#0369A1]/70 dark:hover:border-[#00D4FF]/75 transition-colors duration-300 shadow-lg shadow-slate-900/5 dark:shadow-2xl relative ring-1 ring-[#0369A1]/15 dark:ring-[#00D4FF]/30 dark:shadow-[0_0_40px_rgba(0,212,255,0.1)] group/card"
                >
                  {/* Corner tech accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#0369A1] dark:border-[#00D4FF] z-20"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#0369A1] dark:border-[#00D4FF] z-20"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Screenshot / Visual column */}
                    <div className={`lg:col-span-5 bg-[#EAF0F8] dark:bg-[#08172E] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 border-[#CBD6E6] dark:border-[#203B5B] ${
                      isReversed ? "lg:order-2 lg:border-l" : "lg:order-1 lg:border-r"
                    }`}>
                      <div className="relative group rounded-xl overflow-hidden border border-[#CBD6E6] dark:border-[#203B5B] bg-white dark:bg-[#061329] shadow-md dark:shadow-2xl">
                        {project.imageUrl && (
                          <div className="relative overflow-hidden aspect-[16/10] bg-[#061329]">
                            <img
                              src={project.imageUrl}
                              alt={`${project.title} live interface preview`}
                              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (!img.dataset.fallbackTried) {
                                  img.dataset.fallbackTried = "true";
                                  if (project.id === "interview") {
                                    img.src = "/assets/images/interview_sim_live.png";
                                  } else if (project.id === "studyverse") {
                                    img.src = "/assets/images/studyverse_live.png";
                                  } else if (project.id === "aishie") {
                                    img.src = "/assets/images/aishie_voice_preview.jpg";
                                  }
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#061329]/80 via-transparent to-transparent opacity-50 pointer-events-none" />
                          </div>
                        )}

                        {/* Verified Live Badge Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#00D4FF] bg-[#061329]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#00D4FF]/30 shadow-lg">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>LIVE CLOUD DEPLOYED</span>
                          </span>
                          <span className="text-[#E2EDF8] text-[10px] uppercase font-bold">
                            {project.id === "studyverse" ? "VERCEL" : "RENDER"}
                          </span>
                        </div>
                      </div>

                      {/* Quick Launch & Sandbox Buttons */}
                      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#0369A1] hover:bg-[#075985] text-white dark:bg-[#00D4FF] dark:hover:bg-[#38bdf8] dark:text-[#061329] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0369A1]/20 dark:shadow-[0_0_20px_rgba(0,212,255,0.35)] cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Open Live Web App ↗</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenDemo(project.id);
                          }}
                          className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-[#F4F7FB] dark:bg-[#0D203B] dark:hover:bg-[#153156] text-[#0369A1] dark:text-[#00D4FF] border border-[#0369A1]/40 dark:border-[#00D4FF]/40 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Interactive Sandbox</span>
                        </button>
                      </div>
                    </div>

                    {/* Details column */}
                    <div className={`p-6 sm:p-8 flex flex-col justify-between lg:col-span-7 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}>
                      <div>
                        {/* Badge & Category */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-[#0369A1]/10 dark:bg-[#00D4FF]/15 text-[#0369A1] dark:text-[#00D4FF] border border-[#0369A1]/30 dark:border-[#00D4FF]/30 uppercase">
                            {project.badge}
                          </span>
                          <span className="font-mono text-[11px] text-[#4A5D78] dark:text-[#8EA3BE] tracking-wider uppercase">
                            {project.category}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] tracking-tight group-hover/card:text-[#0369A1] dark:group-hover/card:text-[#00D4FF] transition-colors">
                            {project.title}
                          </h3>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#0369A1] dark:hover:text-[#00D4FF] p-2 rounded-xl bg-[#EAF0F8] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/50 transition-all shrink-0 shadow-sm"
                            title="View GitHub Repository"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                          </a>
                        </div>

                        <p className="text-sm font-semibold text-[#0369A1] dark:text-[#00D4FF] mb-4">
                          {project.subtitle}
                        </p>

                        {/* Challenge & Solution */}
                        <div className="space-y-3 mb-5 text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed">
                          <div>
                            <span className="font-mono text-xs font-semibold text-[#4A5D78] dark:text-[#8EA3BE] uppercase block mb-1">
                              The Challenge:
                            </span>
                            <p>{project.description}</p>
                          </div>

                          <div className="mt-2">
                            <span className="font-mono text-xs font-semibold text-[#0369A1] dark:text-[#00D4FF] uppercase block mb-1">
                              The Architecture &amp; Implementation:
                            </span>
                            <p>{project.approach}</p>
                          </div>
                        </div>

                        {/* Interactive Architecture Pipeline */}
                        {pipeline && (
                          <div className="mb-6 rounded-xl bg-[#F4F7FB] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] p-4">
                            <div className="flex items-center justify-between text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE] mb-2.5 pb-2 border-b border-[#CBD6E6] dark:border-[#203B5B]/50">
                              <span className="text-[#0369A1] dark:text-[#00D4FF] font-semibold flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#0369A1] dark:bg-[#00D4FF] animate-pulse-dot" />
                                PIPELINE CONNECTORS &amp; TELEMETRY
                              </span>
                              <span className="text-[10px] text-[#4A5D78] dark:text-[#8EA3BE]">CLICK STAGE TO INSPECT</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                              {pipeline.steps.map((step, sIdx) => {
                                const isSelected = sIdx === activeStepIndex;
                                return (
                                  <React.Fragment key={sIdx}>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedPipelineStep({ ...selectedPipelineStep, [project.id]: sIdx })}
                                      className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                                        isSelected
                                          ? "bg-[#0369A1] dark:bg-[#00D4FF] text-white dark:text-[#061329] font-bold shadow-sm dark:shadow-[0_0_12px_rgba(0,212,255,0.4)]"
                                          : "bg-white dark:bg-[#0A1930] text-[#2B3B52] dark:text-[#B4C3D8] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/40"
                                      }`}
                                    >
                                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white dark:bg-[#061329]" : "bg-[#0369A1] dark:bg-[#00D4FF]"}`}></span>
                                      <span>{step}</span>
                                    </button>

                                    {sIdx < pipeline.steps.length - 1 && (
                                      <div className="flex items-center text-[#0369A1] dark:text-[#00D4FF] px-0.5">
                                        <svg className="w-4 h-3.5 text-[#0369A1] dark:text-[#00D4FF] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                      </div>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>

                            {/* Step detailed inspector */}
                            <div className="mt-3 p-2.5 rounded-lg bg-white dark:bg-[#0A1930] border border-[#CBD6E6] dark:border-[#203B5B]/80 text-[11px] font-mono text-[#0369A1] dark:text-[#00D4FF] flex items-center justify-between">
                              <span className="text-[#09111E] dark:text-[#F5F8FF]">
                                <strong className="text-[#0369A1] dark:text-[#00D4FF]">Stage {activeStepIndex + 1}:</strong> {pipeline.detail[activeStepIndex]}
                              </span>
                              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold shrink-0 ml-2">VERIFIED</span>
                            </div>
                          </div>
                        )}

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2 mb-6 pb-2">
                          {project.tags.map((tag, tagIdx) => (
                            <InteractiveSkillTag
                              key={tagIdx}
                              name={tag}
                              onPreview={onOpenSkillPreview}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 border-t border-[#CBD6E6] dark:border-[#203B5B]/60 flex flex-wrap items-center gap-3">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-[#0369A1] hover:bg-[#075985] text-white dark:bg-[#00D4FF] dark:hover:bg-[#38bdf8] dark:text-[#061329] font-mono text-xs font-bold transition-all shadow-md shadow-[#0369A1]/20 dark:shadow-[0_0_18px_rgba(0,212,255,0.3)] flex items-center gap-1.5 cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Open Live Web App ↗</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenCaseStudy(project.id);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-[#EAF0F8] hover:bg-[#DFE8F4] dark:bg-[#0D203B] dark:hover:bg-[#153156] text-[#0369A1] dark:text-[#00D4FF] border border-[#0369A1]/40 dark:border-[#00D4FF]/40 font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>View case study ↗</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenReadme?.({
                              title: project.title,
                              githubUrl: project.githubUrl,
                            });
                          }}
                          className="px-4 py-2.5 rounded-xl bg-[#EAF0F8] hover:bg-[#DFE8F4] dark:bg-[#0D203B] dark:hover:bg-[#153156] text-[#09111E] dark:text-[#F5F8FF] hover:text-[#0369A1] dark:hover:text-[#00D4FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/50 font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00D4FF]" />
                          <span>View README</span>
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F7FB] dark:bg-[#061329] dark:hover:bg-[#0c1f38] text-[#09111E] dark:text-[#F5F8FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/40 font-mono text-xs font-medium transition-all flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* 2-Column Section: PCA Face Recognition & Aishie */}
      {(showPca || showAishie) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {showPca && pcaProject && (
            <motion.div
              key={pcaProject.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                borderColor: isDark ? "rgba(0, 212, 255, 0.65)" : "rgba(3, 105, 161, 0.65)",
                boxShadow: secondaryHoverShadow,
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl bg-white dark:bg-[#0D203B]/80 border border-[#CBD6E6] dark:border-[#203B5B] p-6 sm:p-8 flex flex-col justify-between hover:border-[#0369A1]/60 dark:hover:border-[#00D4FF]/60 transition-colors duration-300 shadow-md dark:shadow-xl"
            >
              <div>
                <h3 className="text-2xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] tracking-tight mb-1">
                  {pcaProject.title}
                </h3>
                <p className="text-sm font-semibold text-[#0369A1] dark:text-[#00D4FF] mb-4">
                  {pcaProject.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed mb-4">
                  {pcaProject.description}
                </p>

                <p className="text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed mb-6">
                  <strong className="text-[#09111E] dark:text-white">Approach — </strong>
                  {pcaProject.approach}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 pb-2">
                  {pcaProject.tags.map((tag, idx) => (
                    <InteractiveSkillTag
                      key={idx}
                      name={tag}
                      onPreview={onOpenSkillPreview}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#CBD6E6] dark:border-[#203B5B]/60 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenCaseStudy(pcaProject.id);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0369A1] hover:bg-[#075985] text-white dark:bg-[#00D4FF] dark:hover:bg-[#38bdf8] dark:text-[#061329] font-mono text-xs font-bold transition-all shadow-sm dark:shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View case study</span>
                  <span>↗</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenReadme?.({
                      title: pcaProject.title,
                      githubUrl: pcaProject.githubUrl,
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-[#EAF0F8] hover:bg-[#DFE8F4] dark:bg-[#0D203B] dark:hover:bg-[#153156] text-[#09111E] dark:text-[#F5F8FF] hover:text-[#0369A1] dark:hover:text-[#00D4FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/50 font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00D4FF]" />
                  <span>View README</span>
                </button>

                <a
                  href={pcaProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white hover:bg-[#F4F7FB] dark:bg-[#061329] dark:hover:bg-[#0c1f38] text-[#09111E] dark:text-[#F5F8FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/40 font-mono text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          )}

          {showAishie && aishieProject && (
            <motion.div
              key={aishieProject.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                borderColor: isDark ? "rgba(0, 212, 255, 0.65)" : "rgba(3, 105, 161, 0.65)",
                boxShadow: secondaryHoverShadow,
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="rounded-2xl bg-white dark:bg-[#0D203B]/80 border border-[#CBD6E6] dark:border-[#203B5B] p-6 sm:p-8 flex flex-col justify-between hover:border-[#0369A1]/60 dark:hover:border-[#00D4FF]/60 transition-colors duration-300 shadow-md dark:shadow-xl"
            >
              <div>
                <h3 className="text-2xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] tracking-tight mb-1">
                  {aishieProject.title}
                </h3>
                <p className="text-sm font-semibold text-[#0369A1] dark:text-[#00D4FF] mb-4">
                  {aishieProject.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed mb-4">
                  {aishieProject.description}
                </p>

                <p className="text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed mb-6">
                  <strong className="text-[#09111E] dark:text-white">Approach — </strong>
                  {aishieProject.approach}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 pb-2">
                  {aishieProject.tags.map((tag, idx) => (
                    <InteractiveSkillTag
                      key={idx}
                      name={tag}
                      onPreview={onOpenSkillPreview}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#CBD6E6] dark:border-[#203B5B]/60 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenCaseStudy(aishieProject.id);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0369A1] hover:bg-[#075985] text-white dark:bg-[#00D4FF] dark:hover:bg-[#38bdf8] dark:text-[#061329] font-mono text-xs font-bold transition-all shadow-sm dark:shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View case study</span>
                  <span>↗</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenReadme?.({
                      title: aishieProject.title,
                      githubUrl: aishieProject.githubUrl,
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-[#EAF0F8] hover:bg-[#DFE8F4] dark:bg-[#0D203B] dark:hover:bg-[#153156] text-[#09111E] dark:text-[#F5F8FF] hover:text-[#0369A1] dark:hover:text-[#00D4FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/50 font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00D4FF]" />
                  <span>View README</span>
                </button>

                <a
                  href={aishieProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white hover:bg-[#F4F7FB] dark:bg-[#061329] dark:hover:bg-[#0c1f38] text-[#09111E] dark:text-[#F5F8FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/40 font-mono text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* More experiments on GitHub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-[#EAF0F8] dark:bg-[#09182D] border border-[#CBD6E6] dark:border-[#203B5B] p-6 sm:p-8 shadow-md dark:shadow-xl"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#CBD6E6] dark:border-[#203B5B]/60">
          <h3 className="text-xl sm:text-2xl font-bold text-[#09111E] dark:text-[#F5F8FF]">
            More experiments on GitHub
          </h3>
          <a
            href="https://github.com/AnshPratap2314"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-semibold text-[#0369A1] dark:text-[#00D4FF] hover:text-[#075985] dark:hover:text-[#38bdf8] flex items-center gap-1 transition-colors"
          >
            <span>@ANSHPRATAP2314</span>
            <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.moreExperiments.map((exp, eIdx) => (
            <motion.div
              key={eIdx}
              whileHover={{
                y: -5,
                borderColor: isDark ? "rgba(0, 212, 255, 0.65)" : "rgba(3, 105, 161, 0.65)",
                boxShadow: experimentHoverShadow,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="p-5 rounded-xl bg-white dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B] transition-colors duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#09111E] dark:text-[#F5F8FF] group-hover:text-[#0369A1] dark:group-hover:text-[#00D4FF] transition-colors flex items-center gap-1"
                  >
                    <span>{exp.title}</span>
                    <span className="text-xs text-[#0369A1] dark:text-[#00D4FF]">↗</span>
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-[#4A5D78] dark:text-[#8EA3BE] leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#CBD6E6] dark:border-[#203B5B]/50 flex items-center justify-between gap-2 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() =>
                    onOpenReadme?.({
                      title: exp.title,
                      githubUrl: exp.url,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-[#09111E] dark:text-[#F5F8FF] hover:text-[#0369A1] dark:hover:text-[#00D4FF] transition-colors cursor-pointer font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00D4FF]" />
                  <span>View README</span>
                </button>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0369A1] dark:text-[#00D4FF] hover:text-[#075985] dark:hover:text-[#38bdf8] transition-colors font-semibold"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
