import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { generateAndDownloadResumePdf } from "../utils/generateResumePdf";
import latestResumePdfUrl from "../assets/Ansh_Pratap_Resume.pdf";
import previousResumePdfUrl from "../assets/Ansh_Pratap_Resume_Previous.pdf";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResumeVersionKey = "latest" | "previous";

interface SkillGroup {
  label: string;
  value: string;
}

interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

interface ProjectEntry {
  id: string;
  title: string;
  subtitle: string;
  tech: string;
  liveUrl?: string;
  githubUrl: string;
  bullets: string[];
}

interface ResumeVersionData {
  label: string;
  badge: string;
  fileName: string;
  pdfUrl: string;
  summary: string;
  skills: SkillGroup[];
  internships: ExperienceEntry[];
  industrialTraining?: ExperienceEntry[];
  projectsHeading: string;
  techPrefix: string;
  projects: ProjectEntry[];
}

const RESUME_CERTIFICATIONS = [
  { title: "Google AI Essentials", issuer: "Google (Coursera)", date: "Aug 2026" },
  { title: "Google Prompting Essentials", issuer: "Google (Coursera)", date: "Sep 2026" },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "Oct 2026" },
  { title: "Data Science & Analytics", issuer: "HP LIFE", date: "Sep 2025" },
];

const RESUME_VERSIONS: Record<ResumeVersionKey, ResumeVersionData> = {
  latest: {
    label: "Latest Resume",
    badge: "Updated",
    fileName: "Ansh_Pratap_Resume.pdf",
    pdfUrl: latestResumePdfUrl,
    summary:
      "Final-year B.Tech Computer Science and Engineering student (expected graduation 2027) with practical AI/ML and Generative AI experience gained through a 3-month AI internship, an AI & ML industrial training program, and a current AI data operations internship. Builds and deploys Python and FastAPI applications that integrate LLMs through the Google Gemini API, with structured-output prompt design. Has developed machine learning models using TF-IDF and Logistic Regression and built an OpenCV-based face recognition system.",
    skills: [
      {
        label: "Programming Languages",
        value: "Python, JavaScript, C, C++, SQL, HTML, CSS",
      },
      {
        label: "AI/ML & Data Science",
        value:
          "Machine Learning, NLP, Scikit-learn, TF-IDF, Logistic Regression, Text Classification, SVM, KNN, Decision Trees, Neural Networks, Computer Vision, OpenCV, Keras, NumPy, Pandas",
      },
      {
        label: "Generative AI & LLMs",
        value:
          "Google Gemini API, Google GenAI SDK, LLM Integration, Prompt Engineering, Structured Output Handling, RAG (Fundamentals)",
      },
      {
        label: "Backend Development & API Engineering",
        value:
          "FastAPI, REST API Development, Node.js, Express.js, Pydantic, Input Validation, Session Management, API Security & Documentation",
      },
      {
        label: "AI Engineering",
        value: "AI/ML Integration, API Development",
      },
      {
        label: "Databases",
        value: "SQLite, MongoDB, Mongoose",
      },
      {
        label: "Testing, Deployment & Developer Tools",
        value:
          "Pytest, Node.js Test Runner, Git, GitHub, Uvicorn, Render, Docker (basic configuration), VS Code",
      },
    ],
    internships: [
      {
        id: "renan",
        role: "Artificial Intelligence Data Operations Intern",
        company: "Renan Partners Private Limited (Remote)",
        period: "Nov 2026 – Present",
        bullets: [
          "Deliver assigned AI data operations tasks for the Project Delivery team, meeting defined quality standards and timelines.",
          "Work remotely under the Project Lead, following project requirements and communication protocols.",
        ],
      },
      {
        id: "istudio",
        role: "Artificial Intelligence Intern",
        company: "Internship Studio (iStudio)",
        period: "Oct 2025 – Jan 2026",
        bullets: [
          "Redesigned LLM prompt templates to enforce a structured output schema, eliminating a manual post-processing step.",
          "Automated recurring data-preprocessing steps in the model training pipeline using Python.",
          "Conducted exploratory data analysis that surfaced label noise and class imbalance, informing a revision to the model architecture.",
        ],
      },
    ],
    industrialTraining: [
      {
        id: "cttc",
        role: "AI & ML Industrial Trainee",
        company: "Central Tool Room & Training Centre (CTTC), Bhubaneswar",
        period: "Apr 2025 – May 2025",
        bullets: [
          "Completed 1-month industrial training covering Python, supervised and unsupervised learning, NLP, computer vision, and Keras.",
          "Built a face detection and recognition attendance system using OpenCV, SVM, and LBPH on a self-collected dataset.",
          "Benchmarked four classifiers (SVM, KNN, Decision Tree, Neural Network) on identical data, weighing accuracy against inference speed.",
        ],
      },
    ],
    projectsHeading: "PROJECTS",
    techPrefix: "Technologies:",
    projects: [
      {
        id: "mindcare",
        title: "MindCare AI",
        subtitle: "Safety-Oriented Mental Health Support Chatbot",
        tech: "Python, FastAPI, scikit-learn, TF-IDF, Logistic Regression, Joblib, JavaScript, HTML/CSS, Docker, Render",
        liveUrl: "https://mindcare-ai-o1e5.onrender.com",
        githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot",
        bullets: [
          "Trained TF-IDF and Logistic Regression models (persisted with Joblib) on a 50,000-example synthetic dataset for intent, mood, topic, and risk classification. The models are not clinically validated, and the application is not a diagnostic tool.",
          "Designed a safety layer in which rule-based risk analysis takes precedence over LLM-generated responses; wrote automated tests.",
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
        subtitle: "AI Learning and Productivity Workspace (Team Project)",
        tech: "Node.js, Express.js, MongoDB (Mongoose), JavaScript, Google GenAI SDK",
        liveUrl: "https://study-verse-ai-eight.vercel.app/",
        githubUrl: "https://github.com/AnshPratap2314/StudyVerse-AI",
        bullets: [
          "Contributed to a team-built full-stack application with user accounts, an AI tutor, AI-generated study packs, flashcards, and quizzes.",
          "Contributed to an AI provider gateway (adapters, fallback handling) and document-processing and retrieval modules.",
        ],
      },
      {
        id: "aishie",
        title: "Aishie",
        subtitle: "Voice-Controlled Desktop AI Assistant (Prototype)",
        tech: "Python, SpeechRecognition, pyttsx3, AppleScript, PyAutoGUI, OpenCV, face_recognition, JSON",
        githubUrl: "https://github.com/AnshPratap2314/Aishie-AI-Assistant",
        bullets: [
          "Prototyped a Python voice assistant (SpeechRecognition, pyttsx3) with macOS automation (AppleScript, PyAutoGUI), face recognition (OpenCV, face_recognition), local JSON memory, and messaging integrations.",
        ],
      },
    ],
  },
  previous: {
    label: "Previous Resume",
    badge: "Archive",
    fileName: "Ansh_Pratap_Resume_Previous.pdf",
    pdfUrl: previousResumePdfUrl,
    summary:
      "Final-year B.Tech CSE student (graduating 2027) with a 3-month AI internship and hands-on experience building ML and LLM-powered applications in Python. Redesigned LLM prompts for structured output, trained TF-IDF/Logistic Regression classifiers, built OpenCV face recognition, and integrated the Gemini API into a deployed FastAPI app.",
    skills: [
      { label: "Programming", value: "Python, JavaScript, C, C++, SQL" },
      {
        label: "Generative AI",
        value:
          "Google Gemini API, LLM Integration, Prompt Engineering, Structured Output Handling, RAG (fundamentals)",
      },
      {
        label: "ML & Data",
        value:
          "Scikit-learn, NLP, TF-IDF, Logistic Regression, Text Classification, OpenCV, Computer Vision, Keras, NumPy, Pandas",
      },
      {
        label: "Backend & APIs",
        value:
          "FastAPI, REST APIs, Pydantic, Node.js, Express.js, Input Validation, Session Management",
      },
      { label: "Databases", value: "SQLite, MongoDB (Mongoose)" },
      {
        label: "Testing & Tools",
        value:
          "Pytest, Node.js Test Runner, Git, GitHub, Uvicorn, Render, Docker (basic configuration), VS Code",
      },
    ],
    internships: [
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
    ],
    projectsHeading: "SELECTED PROJECTS",
    techPrefix: "Tech:",
    projects: [
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
    ],
  },
};

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeVersion, setActiveVersion] = useState<ResumeVersionKey>("latest");
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { profile } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const activeResume = RESUME_VERSIONS[activeVersion];

  const handleCopySummary = () => {
    const expLines = [
      ...activeResume.internships,
      ...(activeResume.industrialTraining ?? []),
    ]
      .map((item, idx) => `${idx + 1}. ${item.role} | ${item.company} (${item.period})`)
      .join("\n");

    const summary = `${profile.name} — Final-Year B.Tech CSE | AI/ML & Generative AI | Python, FastAPI, LLM Applications
+91 9520458452 | ${profile.email} | ${profile.githubUrl}

PROFESSIONAL SUMMARY:
${activeResume.summary}

EXPERIENCE & TRAINING:
${expLines}

EDUCATION:
B.Tech, Computer Science and Engineering | Mewar University, Chittorgarh, Rajasthan (2023 – 2027 Expected)`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = async (versionKey: ResumeVersionKey = activeVersion) => {
    const targetResume = RESUME_VERSIONS[versionKey];
    try {
      setIsDownloading(true);
      const response = await fetch(targetResume.pdfUrl);
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok || !contentType.includes("pdf")) {
        throw new Error(`Unexpected response: HTTP ${response.status} (${contentType})`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = targetResume.fileName;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 dark:bg-[#061329]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0B1B34] border border-[#CBD6E6] dark:border-[#203B5B] rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3.5 sm:p-6 bg-[#EAF0F8] dark:bg-[#0D203B] border-b border-[#CBD6E6] dark:border-[#203B5B] flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl object-cover border border-[#0369A1]/40 dark:border-[#00D4FF]/40 shadow-md"
              loading="lazy"
            />
            <div className="min-w-0">
              <h2 className="text-sm sm:text-xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] truncate">
                {profile.name} — CV
              </h2>
              <p className="text-[10px] sm:text-xs font-mono text-[#0369A1] dark:text-[#00D4FF] truncate">
                AI/ML &amp; Generative AI · Final-Year B.Tech CSE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] text-[11px] sm:text-xs font-mono text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#0369A1] dark:hover:text-[#00D4FF] hover:border-[#0369A1]/50 dark:hover:border-[#00D4FF]/40 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={() => handleDownloadPdf(activeVersion)}
              disabled={isDownloading}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0369A1] hover:bg-[#075985] dark:bg-[#00D4FF] dark:hover:bg-[#38bdf8] text-white dark:text-[#061329] font-mono font-bold text-[11px] sm:text-xs transition-all shadow-md shadow-[#0369A1]/25 dark:shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-60"
              title={`Download ${activeResume.label} as PDF`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF] bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Resume Version Switcher */}
        <div className="px-3.5 sm:px-6 py-2.5 bg-[#F4F7FB] dark:bg-[#091830] border-b border-[#CBD6E6] dark:border-[#203B5B]/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#4A5D78] dark:text-[#8EA3BE]">
              Version:
            </span>
            <div className="inline-flex p-0.5 rounded-lg bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B]">
              {(["latest", "previous"] as ResumeVersionKey[]).map((key) => {
                const ver = RESUME_VERSIONS[key];
                const isSelected = activeVersion === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveVersion(key)}
                    className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#0369A1]/10 dark:bg-[#00D4FF]/15 text-[#0369A1] dark:text-[#00D4FF] border border-[#0369A1]/40 dark:border-[#00D4FF]/40 font-semibold"
                        : "text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF] border border-transparent"
                    }`}
                  >
                    <span>{ver.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        key === "latest"
                          ? "bg-[#0369A1]/15 dark:bg-[#00D4FF]/20 text-[#0369A1] dark:text-[#00D4FF]"
                          : "bg-[#EAF0F8] dark:bg-[#203B5B]/60 text-[#4A5D78] dark:text-[#8EA3BE]"
                      }`}
                    >
                      {ver.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <a
            href={activeResume.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-mono text-[#0369A1] dark:text-[#00D4FF] hover:underline flex items-center gap-1 font-medium"
          >
            <span>Open {activeResume.label} PDF ↗</span>
          </a>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-7 flex-1 text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8]">
          {/* Header block */}
          <div className="border-b border-[#CBD6E6] dark:border-[#203B5B]/60 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] tracking-tight">ANSH PRATAP</h1>
                <p className="text-xs sm:text-sm font-semibold text-[#0369A1] dark:text-[#00D4FF] mt-1">
                  Final-Year B.Tech CSE | AI/ML &amp; Generative AI | Python, FastAPI, LLM Applications
                </p>
                <p className="text-xs text-[#4A5D78] dark:text-[#8EA3BE] mt-1 font-mono">
                  Chittorgarh, Rajasthan, India · +91 9520458452 · {profile.email}
                </p>
              </div>
              <div className="font-mono text-xs text-[#4A5D78] dark:text-[#8EA3BE] space-y-1 sm:text-right shrink-0">
                <p>
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#0369A1] dark:text-[#00D4FF] hover:underline">
                    linkedin.com/in/ansh-pratap-68156625b
                  </a>
                </p>
                <p>
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-[#0369A1] dark:text-[#00D4FF] hover:underline">
                    github.com/AnshPratap2314
                  </a>
                </p>
                <p>
                  <a href="https://ansh-portfolio-rho-seven.vercel.app" target="_blank" rel="noreferrer" className="text-[#0369A1] dark:text-[#00D4FF] hover:underline">
                    ansh-portfolio-rho-seven.vercel.app
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] tracking-wider uppercase border-b border-[#CBD6E6] dark:border-[#203B5B]/40 pb-1">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-xs leading-relaxed text-[#2B3B52] dark:text-[#B4C3D8]">{activeResume.summary}</p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2.5">
            <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] tracking-wider uppercase border-b border-[#CBD6E6] dark:border-[#203B5B]/40 pb-1">
              TECHNICAL SKILLS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeResume.skills.map((skill) => (
                <div key={skill.label}>
                  <span className="font-semibold text-[#09111E] dark:text-[#F5F8FF]">{skill.label}:</span>
                  <p className="text-[#4A5D78] dark:text-[#8EA3BE] mt-0.5">{skill.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Internship Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] tracking-wider uppercase border-b border-[#CBD6E6] dark:border-[#203B5B]/40 pb-1">
              INTERNSHIP EXPERIENCE
            </h3>
            {activeResume.internships.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                  <div>
                    <span className="font-bold text-[#09111E] dark:text-[#F5F8FF] text-sm">{exp.role}</span>
                    <span className="text-[#0369A1] dark:text-[#00D4FF] font-medium ml-2">| {exp.company}</span>
                  </div>
                  <span className="font-mono text-[#4A5D78] dark:text-[#8EA3BE] shrink-0">{exp.period}</span>
                </div>
                <ul className="space-y-1 mt-1 text-xs text-[#2B3B52] dark:text-[#B4C3D8]">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-[#0369A1] dark:text-[#00D4FF]">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Industrial Training (Latest Resume) */}
          {activeResume.industrialTraining && activeResume.industrialTraining.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] tracking-wider uppercase border-b border-[#CBD6E6] dark:border-[#203B5B]/40 pb-1">
                INDUSTRIAL TRAINING
              </h3>
              {activeResume.industrialTraining.map((train) => (
                <div key={train.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div>
                      <span className="font-bold text-[#09111E] dark:text-[#F5F8FF] text-sm">{train.role}</span>
                      <span className="text-[#0369A1] dark:text-[#00D4FF] font-medium ml-2">| {train.company}</span>
                    </div>
                    <span className="font-mono text-[#4A5D78] dark:text-[#8EA3BE] shrink-0">{train.period}</span>
                  </div>
                  <ul className="space-y-1 mt-1 text-xs text-[#2B3B52] dark:text-[#B4C3D8]">
                    {train.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <span className="text-[#0369A1] dark:text-[#00D4FF]">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] tracking-wider uppercase border-b border-[#CBD6E6] dark:border-[#203B5B]/40 pb-1">
              {activeResume.projectsHeading}
            </h3>
            {activeResume.projects.map((proj) => (
              <div key={proj.id} className="space-y-1.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-bold text-[#09111E] dark:text-[#F5F8FF]">
                    {proj.title} <span className="text-[#4A5D78] dark:text-[#8EA3BE] font-normal">— {proj.subtitle}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono shrink-0">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
                      >
                        Live ↗
                      </a>
                    )}
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0369A1] dark:text-[#00D4FF] hover:underline font-medium"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>
                <div className="font-mono text-[11px] text-[#4A5D78] dark:text-[#8EA3BE]">
                  {activeResume.techPrefix} {proj.tech}
                </div>
                <ul className="space-y-1 text-xs text-[#2B3B52] dark:text-[#B4C3D8]">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-[#0369A1] dark:text-[#00D4FF]">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] tracking-wider uppercase border-b border-[#CBD6E6] dark:border-[#203B5B]/40 pb-1">
              EDUCATION
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div>
                <span className="font-bold text-[#09111E] dark:text-[#F5F8FF] text-sm">B.Tech, Computer Science and Engineering</span>
                <span className="text-[#0369A1] dark:text-[#00D4FF] ml-2">| Mewar University, Chittorgarh, Rajasthan</span>
              </div>
              <span className="font-mono text-[#4A5D78] dark:text-[#8EA3BE] shrink-0">2023 – 2027 (Expected)</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] tracking-wider uppercase border-b border-[#CBD6E6] dark:border-[#203B5B]/40 pb-1">
              CERTIFICATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {RESUME_CERTIFICATIONS.map((cert, cIdx) => (
                <div key={cIdx} className="p-2.5 rounded bg-[#F4F7FB] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B]/60 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#09111E] dark:text-[#F5F8FF]">{cert.title}</div>
                    <div className="text-[11px] text-[#0369A1] dark:text-[#00D4FF] font-mono">{cert.issuer}</div>
                  </div>
                  <span className="text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE] shrink-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#EAF0F8] dark:bg-[#0D203B] border-t border-[#CBD6E6] dark:border-[#203B5B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#4A5D78] dark:text-[#8EA3BE]">
          <span>
            Viewing: <strong className="text-[#09111E] dark:text-[#F5F8FF]">{activeResume.label}</strong> · Mewar University B.Tech CSE
          </span>
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => handleDownloadPdf(activeVersion === "latest" ? "previous" : "latest")}
              disabled={isDownloading}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#061329] text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#0369A1] dark:hover:text-[#00D4FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1]/50 dark:hover:border-[#00D4FF]/40 text-xs transition-all cursor-pointer disabled:opacity-60"
            >
              Download {activeVersion === "latest" ? "Previous" : "Latest"} PDF
            </button>
            <button
              type="button"
              onClick={() => handleDownloadPdf(activeVersion)}
              disabled={isDownloading}
              className="px-3.5 py-1.5 rounded-lg bg-[#0369A1] hover:bg-[#075985] dark:bg-[#00D4FF] text-white dark:text-[#061329] font-bold text-xs dark:hover:bg-[#38bdf8] transition-all shadow-md shadow-[#0369A1]/25 dark:shadow-[0_0_15px_rgba(0,212,255,0.35)] cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-60"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>
                {isDownloading ? "Downloading PDF..." : `Download ${activeResume.label} (PDF)`}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#061329] text-[#09111E] dark:text-[#F5F8FF] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1]/50 dark:hover:border-[#00D4FF]/40 cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
