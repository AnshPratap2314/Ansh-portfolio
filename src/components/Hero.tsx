import React, { useState } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { fastScrollTo } from "../utils/scrollHelper";

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodeDetails: Record<string, { desc: string; latency: string; status: string }> = {
    fastapi: {
      desc: "High-throughput async backend with strict Pydantic v2 schemas and deterministic API boundaries",
      latency: "14ms",
      status: "ACTIVE"
    },
    gemini: {
      desc: "Structured JSON schema output validation, multi-turn prompting & enterprise safety guards",
      latency: "280ms",
      status: "OPTIMIZED"
    },
    tfidf: {
      desc: "Scikit-learn text classification pipeline with n-gram vectorization & calibrated risk triage",
      latency: "8ms",
      status: "CALIBRATED"
    },
    opencv: {
      desc: "Computer vision face detection, eigenface basis extraction & biometric pipelines",
      latency: "22ms",
      status: "SYNCHRONIZED"
    },
    pytest: {
      desc: "238 deterministic regression suites covering edge cases, negation phrases & input safety",
      latency: "100%",
      status: "PASSING"
    },
    mongodb: {
      desc: "Document & vector store indexing with session persistence and fallback caching",
      latency: "12ms",
      status: "CONNECTED"
    },
    core: {
      desc: "Autonomous Systems Core V2 — Production architecture orchestrating ML models and APIs",
      latency: "<20ms avg",
      status: "OPERATIONAL"
    }
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 overflow-hidden tech-grid-bg" data-purpose="hero-banner">
      {/* Ambient Lighting Blobs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none animate-pulse-ring"></div>
      <div className="absolute bottom-10 right-0 w-[32rem] h-[32rem] bg-[#1677FF]/12 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        {/* Left Hero Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono tracking-wider font-semibold bg-[#0A1930] border border-[#00D4FF]/40 text-[#00D4FF] mb-5 sm:mb-6 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D4FF]"></span>
            </span>
            {PORTFOLIO_DATA.profile.availability}
          </div>

          {/* Subtitle Track Tag */}
          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#00D4FF] uppercase mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-[#00D4FF]"></span>
            {PORTFOLIO_DATA.profile.tracks}
          </p>

          {/* Main Bold Headline */}
          <h1 className="text-3xl min-[360px]:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-5 sm:mb-6">
            Building <br />
            <span className="text-gradient-accent drop-shadow-[0_0_35px_rgba(0,212,255,0.35)]">Intelligent</span> <br />
            <span className="text-white">Software.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-[#E2EDF8] font-medium mb-5 sm:mb-6 leading-snug">
            {PORTFOLIO_DATA.profile.subheadline}
          </p>

          {/* Core Bio Summary */}
          <p className="text-sm sm:text-lg text-[#B4C3D8] leading-relaxed max-w-2xl mb-7 sm:mb-8">
            I'm <strong className="text-white font-semibold">Ansh Pratap</strong>, a 4th-year (final year) Computer Science and Engineering student focused on AI/ML, Generative AI and backend development. I build practical AI-powered applications using Python, machine learning, APIs and LLM integrations.
          </p>

          {/* CTA Button Group with Motion */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                fastScrollTo("projects");
              }}
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 30px rgba(0,212,255,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#00D4FF] text-[#061329] hover:bg-[#38bdf8] shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all cursor-pointer group"
            >
              <span>Explore my work</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>

            <motion.button
              onClick={onOpenResume}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#0D203B] text-[#F5F8FF] border border-[#203B5B] hover:border-[#00D4FF] hover:text-[#00D4FF] shadow-sm hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download resume</span>
            </motion.button>
          </div>

          {/* Social Links & Geo Metadata Strip */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#B4C3D8] border-t border-[#203B5B]/80 pt-5 sm:pt-6 w-full">
            <a
              href={PORTFOLIO_DATA.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#00D4FF] transition-colors"
            >
              <svg className="w-4 h-4 text-[#00D4FF]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
            <span className="text-[#203B5B]">•</span>
            <a
              href={PORTFOLIO_DATA.profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#00D4FF] transition-colors"
            >
              <svg className="w-4 h-4 text-[#00D4FF]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <span className="text-[#203B5B]">•</span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                fastScrollTo("contact");
              }}
              className="flex items-center gap-1.5 hover:text-[#00D4FF] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact me</span>
            </a>
            <span className="text-[#203B5B]">•</span>
            <div className="flex items-center gap-1.5 text-[#B4C3D8]">
              <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{PORTFOLIO_DATA.profile.location}</span>
            </div>
          </div>
        </div>

        {/* Right Hero Interactive Constellation Network Diagram */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-4 sm:py-6 w-full">
          <div className="relative w-full max-w-[340px] min-[400px]:max-w-[420px] sm:max-w-[500px] aspect-square rounded-3xl border border-[#203B5B] bg-[#0A1930]/80 p-3 sm:p-6 backdrop-blur-md shadow-[0_0_60px_rgba(0,212,255,0.12)] flex items-center justify-center mx-auto">
            
            {/* Header Telemetry Badge */}
            <div className="absolute top-3 sm:top-4 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#8EA3BE] border-b border-[#203B5B]/60 pb-2 sm:pb-2.5">
              <span className="flex items-center gap-1.5 text-[#00D4FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-ping"></span>
                SYSTEM BUS: ACTIVE
              </span>
              <span className="text-emerald-400">SYNC: 100%</span>
            </div>

            {/* SVG Network Graph with Animated Connectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" fill="none">
              <defs>
                <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1677FF" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="activeCyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Orbital guide tracks */}
              <circle cx="250" cy="250" r="175" stroke="#203B5B" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
              <circle cx="250" cy="250" r="215" stroke="#00D4FF" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.2" />

              {/* Connected Polygon Ring Cables */}
              {/* FastAPI (100, 110) to Core (250, 250) */}
              <line
                x1="100" y1="110" x2="250" y2="250"
                stroke={activeNode === "fastapi" ? "url(#activeCyanLine)" : "url(#cyanLine)"}
                strokeWidth={activeNode === "fastapi" ? "2.5" : "1.5"}
                className={activeNode === "fastapi" ? "animate-cable-flow-fast" : "animate-cable-flow"}
              />

              {/* Gemini (390, 110) to Core (250, 250) */}
              <line
                x1="390" y1="110" x2="250" y2="250"
                stroke={activeNode === "gemini" ? "url(#activeCyanLine)" : "url(#cyanLine)"}
                strokeWidth={activeNode === "gemini" ? "2.5" : "1.5"}
                className={activeNode === "gemini" ? "animate-cable-flow-fast" : "animate-cable-flow"}
              />

              {/* Pytest (430, 260) to Core (250, 250) */}
              <line
                x1="430" y1="260" x2="250" y2="250"
                stroke={activeNode === "pytest" ? "url(#activeCyanLine)" : "url(#cyanLine)"}
                strokeWidth={activeNode === "pytest" ? "2.5" : "1.5"}
                className={activeNode === "pytest" ? "animate-cable-flow-fast" : "animate-cable-flow"}
              />

              {/* TF-IDF (380, 400) to Core (250, 250) */}
              <line
                x1="380" y1="400" x2="250" y2="250"
                stroke={activeNode === "tfidf" ? "url(#activeCyanLine)" : "url(#cyanLine)"}
                strokeWidth={activeNode === "tfidf" ? "2.5" : "1.5"}
                className={activeNode === "tfidf" ? "animate-cable-flow-fast" : "animate-cable-flow"}
              />

              {/* OpenCV (120, 390) to Core (250, 250) */}
              <line
                x1="120" y1="390" x2="250" y2="250"
                stroke={activeNode === "opencv" ? "url(#activeCyanLine)" : "url(#cyanLine)"}
                strokeWidth={activeNode === "opencv" ? "2.5" : "1.5"}
                className={activeNode === "opencv" ? "animate-cable-flow-fast" : "animate-cable-flow"}
              />

              {/* MongoDB (70, 250) to Core (250, 250) */}
              <line
                x1="70" y1="250" x2="250" y2="250"
                stroke={activeNode === "mongodb" ? "url(#activeCyanLine)" : "url(#cyanLine)"}
                strokeWidth={activeNode === "mongodb" ? "2.5" : "1.5"}
                className={activeNode === "mongodb" ? "animate-cable-flow-fast" : "animate-cable-flow"}
              />

              {/* Peripheral Cross Connectors */}
              <line x1="100" y1="110" x2="390" y2="110" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              <line x1="390" y1="110" x2="430" y2="260" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              <line x1="430" y1="260" x2="380" y2="400" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              <line x1="380" y1="400" x2="120" y2="390" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              <line x1="120" y1="390" x2="70" y2="250" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              <line x1="70" y1="250" x2="100" y2="110" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />

              {/* Animated Traveling Data Packet Pulses */}
              <circle r="3" fill="#00D4FF">
                <animateMotion
                  path="M 100 110 L 250 250"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#00D4FF">
                <animateMotion
                  path="M 390 110 L 250 250"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#38BDF8">
                <animateMotion
                  path="M 430 260 L 250 250"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#00D4FF">
                <animateMotion
                  path="M 380 400 L 250 250"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#38BDF8">
                <animateMotion
                  path="M 120 390 L 250 250"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            {/* Interactive Network Nodes with Badges */}
            {/* Node 1: FastAPI */}
            <div
              onMouseEnter={() => setActiveNode("fastapi")}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute top-12 sm:top-16 left-2 sm:left-4 z-20 flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#00D4FF] shadow-[0_0_12px_#00D4FF] group-hover:scale-125 transition-transform"></span>
              <span className={`text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0D203B] border transition-all ${
                activeNode === "fastapi" ? "border-[#00D4FF] text-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.4)]" : "border-[#203B5B] text-[#F5F8FF]"
              }`}>
                FastAPI
              </span>
            </div>

            {/* Node 2: Gemini API */}
            <div
              onMouseEnter={() => setActiveNode("gemini")}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute top-12 sm:top-16 right-2 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
            >
              <span className={`text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0D203B] border transition-all ${
                activeNode === "gemini" ? "border-[#00D4FF] text-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.4)]" : "border-[#203B5B] text-[#00D4FF]"
              }`}>
                Gemini API
              </span>
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#00D4FF] shadow-[0_0_12px_#00D4FF] group-hover:scale-125 transition-transform"></span>
            </div>

            {/* Node 3: Pytest (238) */}
            <div
              onMouseEnter={() => setActiveNode("pytest")}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 z-20 flex items-center gap-1 sm:gap-2 cursor-pointer group"
            >
              <span className={`text-[8px] min-[380px]:text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-[#0D203B] border transition-all ${
                activeNode === "pytest" ? "border-emerald-400 text-emerald-400" : "border-[#203B5B] text-emerald-400"
              }`}>
                Pytest (238)
              </span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] group-hover:scale-125 transition-transform"></span>
            </div>

            {/* Node 4: TF-IDF + LogReg */}
            <div
              onMouseEnter={() => setActiveNode("tfidf")}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute bottom-10 sm:bottom-14 right-4 sm:right-8 z-20 flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
            >
              <span className={`text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0D203B] border transition-all ${
                activeNode === "tfidf" ? "border-[#00D4FF] text-[#00D4FF]" : "border-[#203B5B] text-[#B4C3D8]"
              }`}>
                TF-IDF + NLP
              </span>
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#1677FF] shadow-[0_0_10px_#1677FF] group-hover:scale-125 transition-transform"></span>
            </div>

            {/* Node 5: OpenCV Vision */}
            <div
              onMouseEnter={() => setActiveNode("opencv")}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute bottom-10 sm:bottom-14 left-4 sm:left-8 z-20 flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#00D4FF] shadow-[0_0_12px_#00D4FF] group-hover:scale-125 transition-transform"></span>
              <span className={`text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0D203B] border transition-all ${
                activeNode === "opencv" ? "border-[#00D4FF] text-[#00D4FF]" : "border-[#203B5B] text-[#F5F8FF]"
              }`}>
                OpenCV
              </span>
            </div>

            {/* Node 6: MongoDB & Vector */}
            <div
              onMouseEnter={() => setActiveNode("mongodb")}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-2 z-20 flex items-center gap-1 sm:gap-2 cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF] group-hover:scale-125 transition-transform"></span>
              <span className={`text-[8px] min-[380px]:text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-[#0D203B] border transition-all ${
                activeNode === "mongodb" ? "border-[#00D4FF] text-[#00D4FF]" : "border-[#203B5B] text-[#B4C3D8]"
              }`}>
                MongoDB RAG
              </span>
            </div>

            {/* Center Core Monogram Card (AP V2) */}
            <motion.div
              onMouseEnter={() => setActiveNode("core")}
              onMouseLeave={() => setActiveNode(null)}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="relative z-30 w-32 h-32 min-[380px]:w-36 min-[380px]:h-36 sm:w-44 sm:h-44 rounded-2xl bg-[#0D203B] border border-[#00D4FF]/50 p-2 sm:p-4 shadow-[0_0_40px_rgba(0,212,255,0.25)] flex flex-col items-center justify-center text-center hover:border-[#00D4FF] transition-all cursor-pointer group"
            >
              {/* Corner tech notches */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#00D4FF]"></div>
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#00D4FF]"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#00D4FF]"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#00D4FF]"></div>

              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[#00D4FF]/60 flex items-center justify-center mb-1 sm:mb-2 shadow-[0_0_20px_rgba(0,212,255,0.35)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all bg-[#0B1F3A]">
                <img
                  src={PORTFOLIO_DATA.profile.avatarUrl}
                  alt={PORTFOLIO_DATA.profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#F5F8FF] uppercase">ANSH PRATAP</span>
              <span className="text-[9px] sm:text-[10px] text-[#00D4FF] font-mono mt-0.5">Autonomous Core V2</span>
              <span className="text-[8px] sm:text-[9px] text-[#8EA3BE] font-mono hidden min-[360px]:block">4th Year · Final Year CSE</span>
            </motion.div>

            {/* Floating Test Metrics Chip */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#0A1930] border border-[#00D4FF]/60 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-[0_0_20px_rgba(0,212,255,0.3)] flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] sm:text-xs font-mono font-medium text-[#00D4FF]">238 passing regression tests</span>
            </motion.div>

            {/* Active Node Live Telemetry HUD */}
            {activeNode && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0D203B]/95 border border-[#00D4FF] px-4 py-2.5 rounded-xl text-xs text-[#E2EDF8] shadow-[0_0_30px_rgba(0,212,255,0.4)] max-w-sm text-center whitespace-normal pointer-events-none transition-all backdrop-blur-md">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#00D4FF] mb-1 pb-1 border-b border-[#203B5B]">
                  <span>NODE: {activeNode.toUpperCase()}</span>
                  <span>LATENCY: {nodeDetails[activeNode].latency}</span>
                  <span className="text-emerald-400">{nodeDetails[activeNode].status}</span>
                </div>
                <p className="text-[11px] text-[#B4C3D8] leading-tight">
                  {nodeDetails[activeNode].desc}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
