import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { generateAndDownloadResumePdf } from "../utils/generateResumePdf";
import resumePdfUrl from "../assets/Ansh_Pratap_Resume.pdf";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_EXPERIENCE = [
  {
    id: "renan",
    role: "Artificial Intelligence Data Operations Intern",
    company: "Renan Partners Private Limited",
    period: "Nov 2026 – Present",
    bullets: [
      "Completing assigned AI data operations deliverables for the Project Delivery team to quality standards and timelines.",
      "Working remotely under the Project Lead, following project requirements and communication protocols.",
    ],
  },
  {
    id: "istudio",
    role: "Artificial Intelligence Intern",
    company: "Internship Studio (iStudio)",
    period: "Oct 2025 – Jan 2026",
    bullets: [
      "Redesigned LLM prompt templates to enforce a structured output schema, eliminating a manual post-processing step.",
      "Automated recurring manual data-preprocessing steps in the training pipeline using Python.",
      "Ran exploratory data analysis that surfaced label noise and class imbalance, informing a model architecture revision.",
    ],
  },
  {
    id: "cttc",
    role: "AI & ML Industrial Trainee",
    company: "Central Tool Room & Training Centre (CTTC), Bhubaneswar",
    period: "Apr 2025 – May 2025",
    bullets: [
      "Completed 1-month industrial training in Python, supervised/unsupervised learning, NLP, computer vision, and Keras.",
      "Built a face detection and recognition attendance system with OpenCV, SVM, and LBPH on a self-collected dataset.",
      "Benchmarked four classifiers (SVM, KNN, Decision Tree, Neural Network) on identical data, weighing accuracy and inference speed.",
    ],
  },
];

const RESUME_PROJECTS = [
  {
    id: "mindcare",
    title: "MindCare AI",
    subtitle: "Safety-Oriented Mental Health Support Chatbot",
    tech: "Python, FastAPI, scikit-learn, TF-IDF, Logistic Regression, Joblib, JavaScript, Docker, Render",
    liveUrl: "https://mindcare-ai-o1e5.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot",
    bullets: [
      "Trained TF-IDF + Logistic Regression models (Joblib) on a 50,000-example synthetic dataset for intent, mood, topic, and risk classification. Not clinically validated and not a diagnostic tool.",
      "Designed a safety layer where rule-based risk analysis takes precedence over LLM-generated responses; wrote automated tests.",
      "Built a FastAPI backend with session handling and API safeguards behind an HTML/CSS/JavaScript chat interface; added Docker configuration and deployed on Render.",
    ],
  },
  {
    id: "interview",
    title: "AI Interview Simulator",
    subtitle: "AI Interview Preparation OS",
    tech: "Python, FastAPI, Pydantic, SQLite, Google Gemini API, JavaScript, Pytest, Render",
    liveUrl: "https://ai-based-interview-simulator-1.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/ai-based-interview-simulator",
    bullets: [
      "Integrated the Google Gemini API to generate questions across 3 interview tracks (Technical, HR, AI/ML) and 3 difficulty levels, and to evaluate candidate answers using validated structured output.",
      "Built FastAPI REST endpoints with Pydantic validation, SQLite persistence for sessions and candidate history, and session/candidate token handling.",
      "Wrote a Pytest backend test suite and setup documentation; deployed the application on Render.",
    ],
  },
  {
    id: "studyverse",
    title: "StudyVerse AI",
    subtitle: "AI Learning and Productivity Workspace (team project)",
    tech: "Node.js, Express.js, MongoDB (Mongoose), JavaScript, Google GenAI SDK",
    liveUrl: "https://study-verse-ai-eight.vercel.app/",
    githubUrl: "https://github.com/AnshPratap2314/StudyVerse-AI",
    bullets: [
      "Contributed to a team-built full-stack application with user accounts, an AI tutor, AI-generated study packs, flashcards, and quizzes.",
      "Contributed to an AI provider gateway (adapters, fallback handling) and document-processing/retrieval modules.",
    ],
  },
  {
    id: "aishie",
    title: "Aishie",
    subtitle: "Voice-Controlled Desktop AI Assistant (prototype)",
    tech: "Python, SpeechRecognition, pyttsx3, AppleScript, PyAutoGUI, OpenCV, face_recognition",
    githubUrl: "https://github.com/AnshPratap2314/Aishie-AI-Assistant",
    bullets: [
      "Prototyped a Python voice assistant (SpeechRecognition, pyttsx3) with macOS automation (AppleScript, PyAutoGUI), face recognition (OpenCV, face_recognition), local JSON memory, and messaging integrations.",
    ],
  },
];

const RESUME_CERTIFICATIONS = [
  { title: "Google AI Essentials", issuer: "Google (Coursera)", date: "Aug 2026" },
  { title: "Google Prompting Essentials", issuer: "Google (Coursera)", date: "Sep 2026" },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "Oct 2026" },
  { title: "Data Science & Analytics", issuer: "HP LIFE", date: "Sep 2025" },
];

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { profile } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const summary = `${profile.name} — Final-Year B.Tech CSE | AI/ML & Generative AI | Python, FastAPI, LLM Applications
+91 9520458452 | ${profile.email} | ${profile.githubUrl}

PROFESSIONAL SUMMARY:
Final-year B.Tech CSE student (graduating 2027) with a 3-month AI internship and hands-on experience building ML and LLM-powered applications in Python. Redesigned LLM prompts for structured output, trained TF-IDF/Logistic Regression classifiers, built OpenCV face recognition, and integrated the Gemini API into a deployed FastAPI app.

INTERNSHIP EXPERIENCE:
1. Artificial Intelligence Data Operations Intern | Renan Partners Private Limited (Nov 2026 – Present)
2. Artificial Intelligence Intern | Internship Studio (iStudio) (Oct 2025 – Jan 2026)
3. AI & ML Industrial Trainee | CTTC Bhubaneswar (Apr 2025 – May 2025)

EDUCATION:
B.Tech, Computer Science and Engineering | Mewar University, Chittorgarh, Rajasthan (2023 – 2027 Expected)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(resumePdfUrl);
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok || !contentType.includes("pdf")) {
        throw new Error(`Unexpected response: HTTP ${response.status} (${contentType})`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Ansh_Pratap_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      console.warn("Bundled PDF download fallback:", err);
      generateAndDownloadResumePdf();
    } finally {
      setTimeout(() => setIsDownloading(false), 600);
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
                AI/ML &amp; Generative AI · Final-Year B.Tech CSE
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-7 flex-1 text-xs sm:text-sm text-[#B4C3D8]">
          {/* Header block */}
          <div className="border-b border-[#203B5B]/60 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#F5F8FF] tracking-tight">ANSH PRATAP</h1>
                <p className="text-xs sm:text-sm font-semibold text-[#00D4FF] mt-1">
                  Final-Year B.Tech CSE | AI/ML &amp; Generative AI | Python, FastAPI, LLM Applications
                </p>
                <p className="text-xs text-[#8EA3BE] mt-1 font-mono">
                  Chittorgarh, Rajasthan, India · +91 9520458452 · {profile.email}
                </p>
              </div>
              <div className="font-mono text-xs text-[#8EA3BE] space-y-1 sm:text-right shrink-0">
                <p>
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#00D4FF] hover:underline">
                    linkedin.com/in/ansh-pratap-68156625b
                  </a>
                </p>
                <p>
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-[#00D4FF] hover:underline">
                    github.com/AnshPratap2314
                  </a>
                </p>
                <p>
                  <a href="https://ansh-portfolio-rho-seven.vercel.app" target="_blank" rel="noreferrer" className="text-[#00D4FF] hover:underline">
                    ansh-portfolio-rho-seven.vercel.app
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-xs leading-relaxed text-[#B4C3D8]">
              Final-year B.Tech CSE student (graduating 2027) with a 3-month AI internship and hands-on experience building ML and LLM-powered applications in Python. Redesigned LLM prompts for structured output, trained TF-IDF/Logistic Regression classifiers, built OpenCV face recognition, and integrated the Gemini API into a deployed FastAPI app.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2.5">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              TECHNICAL SKILLS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#F5F8FF]">Programming:</span>
                <p className="text-[#8EA3BE] mt-0.5">Python, JavaScript, C, C++, SQL</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">Generative AI:</span>
                <p className="text-[#8EA3BE] mt-0.5">Google Gemini API, LLM Integration, Prompt Engineering, Structured Output Handling, RAG (fundamentals)</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">ML &amp; Data:</span>
                <p className="text-[#8EA3BE] mt-0.5">Scikit-learn, NLP, TF-IDF, Logistic Regression, Text Classification, OpenCV, Computer Vision, Keras, NumPy, Pandas</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">Backend &amp; APIs:</span>
                <p className="text-[#8EA3BE] mt-0.5">FastAPI, REST APIs, Pydantic, Node.js, Express.js, Input Validation, Session Management</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">Databases:</span>
                <p className="text-[#8EA3BE] mt-0.5">SQLite, MongoDB (Mongoose)</p>
              </div>
              <div>
                <span className="font-semibold text-[#F5F8FF]">Testing &amp; Tools:</span>
                <p className="text-[#8EA3BE] mt-0.5">Pytest, Node.js Test Runner, Git, GitHub, Uvicorn, Render, Docker (basic configuration), VS Code</p>
              </div>
            </div>
          </div>

          {/* Internship Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              INTERNSHIP EXPERIENCE
            </h3>
            {RESUME_EXPERIENCE.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                  <div>
                    <span className="font-bold text-[#F5F8FF] text-sm">{exp.role}</span>
                    <span className="text-[#00D4FF] font-medium ml-2">| {exp.company}</span>
                  </div>
                  <span className="font-mono text-[#8EA3BE] shrink-0">{exp.period}</span>
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

          {/* Selected Projects */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              SELECTED PROJECTS
            </h3>
            {RESUME_PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-bold text-[#F5F8FF]">
                    {proj.title} <span className="text-[#8EA3BE] font-normal">— {proj.subtitle}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono shrink-0">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline"
                      >
                        Live ↗
                      </a>
                    )}
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00D4FF] hover:underline"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>
                <div className="font-mono text-[11px] text-[#8EA3BE]">
                  Tech: {proj.tech}
                </div>
                <ul className="space-y-1 text-xs text-[#B4C3D8]">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-[#00D4FF]">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              EDUCATION
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div>
                <span className="font-bold text-[#F5F8FF] text-sm">B.Tech, Computer Science and Engineering</span>
                <span className="text-[#00D4FF] ml-2">| Mewar University, Chittorgarh, Rajasthan</span>
              </div>
              <span className="font-mono text-[#8EA3BE] shrink-0">2023 – 2027 (Expected)</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-[#00D4FF] tracking-wider uppercase border-b border-[#203B5B]/40 pb-1">
              CERTIFICATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {RESUME_CERTIFICATIONS.map((cert, cIdx) => (
                <div key={cIdx} className="p-2.5 rounded bg-[#061329] border border-[#203B5B]/60 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#F5F8FF]">{cert.title}</div>
                    <div className="text-[11px] text-[#00D4FF] font-mono">{cert.issuer}</div>
                  </div>
                  <span className="text-[11px] font-mono text-[#8EA3BE] shrink-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#0D203B] border-t border-[#203B5B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8EA3BE]">
          <span>Mewar University · B.Tech CSE 2023 – 2027</span>
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
              <span>{isDownloading ? "Downloading PDF..." : "Download Resume (PDF)"}</span>
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
