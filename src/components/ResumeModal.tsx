import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { generateAndDownloadResumePdf } from "../utils/generateResumePdf";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { profile, experience, projects, certifications } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const summary = `${profile.name} — ${profile.title}\n${profile.email} | ${profile.githubUrl}\n\nEDUCATION:\n${profile.education.degree} (${profile.education.institution})\nCGPA: ${profile.education.cgpa} | Expected: ${profile.education.expectedGraduation}\n\nCORE STACK:\nPython, FastAPI, Scikit-learn, Google Gemini API, Pytest (238 suites), OpenCV, Docker\n\nFEATURED WORK:\n1. MindCare AI — NLP Mental Health Assistant (FastAPI, 238 Pytest cases)\n2. AI Interview Simulator — Structured Gemini API Evaluation\n3. StudyVerse AI — RAG Document Intelligence Platform`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    try {
      setIsDownloading(true);
      generateAndDownloadResumePdf();
      setTimeout(() => setIsDownloading(false), 800);
    } catch (err) {
      console.warn("PDF download error:", err);
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#061329]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0B1B34] border border-[#203B5B] rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3.5 sm:p-6 bg-[#0D203B] border-b border-[#203B5B] flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl object-cover border border-[#00D4FF]/40 shadow-md"
              loading="lazy"
            />
            <div className="min-w-0">
              <h2 className="text-sm sm:text-xl font-extrabold text-[#F5F8FF] truncate">
                {profile.name} — CV
              </h2>
              <p className="text-[10px] sm:text-xs font-mono text-[#00D4FF] truncate">
                {profile.title} · {profile.education.status}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#061329] border border-[#203B5B] text-[11px] sm:text-xs font-mono text-[#8EA3BE] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#00D4FF] hover:bg-[#38bdf8] text-[#061329] font-mono font-bold text-[11px] sm:text-xs transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-60"
              title="Download resume as PDF"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#8EA3BE] hover:text-[#F5F8FF] bg-[#061329] border border-[#203B5B] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 text-xs sm:text-sm text-[#B4C3D8]">
          {/* Header block */}
          <div className="border-b border-[#203B5B]/60 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#F5F8FF]">{profile.name}</h1>
                <p className="text-sm font-semibold text-[#00D4FF] mt-0.5">
                  AI/ML &amp; Generative AI Developer · B.Tech CSE (Expected 2027)
                </p>
              </div>
              <div className="font-mono text-xs text-[#8EA3BE] space-y-1 sm:text-right">
                <p>{profile.email}</p>
                <p>{profile.location}</p>
                <p>
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-[#00D4FF] hover:underline">
                    github.com/AnshPratap2314
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              EDUCATION
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <div className="font-bold text-[#F5F8FF] text-sm">{profile.education.institution}</div>
                <div className="text-xs text-[#00D4FF]">{profile.education.degree}</div>
                <p className="text-xs text-[#8EA3BE] mt-1">{profile.education.curriculum}</p>
              </div>
              <div className="font-mono text-xs text-[#8EA3BE] shrink-0 sm:text-right">
                <div>CGPA: {profile.education.cgpa}</div>
                <div>Graduation: {profile.education.expectedGraduation}</div>
              </div>
            </div>
          </div>

          {/* Core Skills */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              CORE TECHNICAL COMPETENCIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#F5F8FF]">Machine Learning &amp; AI:</span>
                <p className="text-[#8EA3BE] mt-0.5">Scikit-learn, NumPy, Pandas, TF-IDF, Logistic Regression, OpenCV, NLP</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">Generative AI:</span>
                <p className="text-[#8EA3BE] mt-0.5">Google Gemini API, Prompt Engineering, Structured LLM Outputs, RAG</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">Backend &amp; Infrastructure:</span>
                <p className="text-[#8EA3BE] mt-0.5">Python 3.12, FastAPI, Pydantic, REST APIs, Docker, Linux, Render Cloud</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">Quality Assurance:</span>
                <p className="text-[#8EA3BE] mt-0.5">Pytest (238 automated regression test suites), Git &amp; GitHub, CI workflows</p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              APPLIED INDUSTRY EXPERIENCE
            </h3>
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#F5F8FF] text-sm">{exp.role}</span>
                    <span className="text-[#00D4FF] font-medium ml-2">@ {exp.company}</span>
                  </div>
                  <span className="font-mono text-[#8EA3BE]">{exp.period}</span>
                </div>
                <ul className="space-y-1 mt-1 text-xs text-[#B4C3D8]">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-[#00D4FF]">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              FLAGSHIP ENGINEERING PROJECTS
            </h3>
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="font-bold text-[#F5F8FF]">
                    {proj.title} <span className="text-[#8EA3BE] font-normal">— {proj.subtitle}</span>
                  </div>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[#00D4FF] hover:underline"
                  >
                    GitHub Code ↗
                  </a>
                </div>
                <p className="text-[#B4C3D8]">{proj.approach}</p>
                <div className="font-mono text-[11px] text-[#8EA3BE]">
                  Tech Stack: {proj.tags.join(", ")}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              KEY CERTIFICATIONS &amp; CREDENTIALS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certifications.slice(0, 6).map((cert, cIdx) => (
                <div key={cIdx} className="p-2 rounded bg-[#061329] border border-[#203B5B]/60">
                  <div className="font-semibold text-[#F5F8FF]">{cert.title}</div>
                  <div className="text-[11px] text-[#00D4FF] font-mono">{cert.issuer} {cert.year ? `· ${cert.year}` : ""}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#0D203B] border-t border-[#203B5B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8EA3BE]">
          <span>Mewar University · Expected B.Tech CSE 2027</span>
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-3.5 py-1.5 rounded-lg bg-[#00D4FF] text-[#061329] font-bold text-xs hover:bg-[#38bdf8] transition-all shadow-[0_0_15px_rgba(0,212,255,0.35)] cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-60"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isDownloading ? "Generating PDF..." : "Download Resume (PDF)"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-[#061329] text-[#F5F8FF] border border-[#203B5B] hover:border-[#00D4FF]/40 cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
