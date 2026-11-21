import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface CaseStudyModalProps {
  projectId: string | null;
  onClose: () => void;
  onOpenDemo: (projectId: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  projectId,
  onClose,
  onOpenDemo,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "testing">("overview");

  if (!projectId) return null;

  const caseStudy = PORTFOLIO_DATA.caseStudies[projectId as keyof typeof PORTFOLIO_DATA.caseStudies] || {
    id: projectId,
    title: `${projectId.toUpperCase()} — Technical Deep Dive`,
    subtitle: "End-to-end engineering breakdown",
    architectureDetails: "Full stack implementation conforming to modular software practices.",
    metrics: [
      { label: "Status", value: "Production Deployed" },
      { label: "Environment", value: "Python 3.12 / Linux" },
    ],
    sections: [
      {
        heading: "System Overview",
        body: "Engineered with focus on reliable execution, low latency, and deterministic validation.",
        highlights: ["Modular design", "Verified input validation", "Documented repository"],
      },
    ],
    tags: ["Python", "FastAPI", "Testing"],
    githubUrl: PORTFOLIO_DATA.profile.githubUrl,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 dark:bg-[#061329]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0B1B34] border border-[#CBD6E6] dark:border-[#203B5B] rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#EAF0F8] dark:bg-[#0D203B] border-b border-[#CBD6E6] dark:border-[#203B5B] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] font-bold text-[#0369A1] dark:text-[#00D4FF] bg-[#0369A1]/10 dark:bg-[#00D4FF]/10 px-2.5 py-0.5 rounded border border-[#0369A1]/30 dark:border-[#00D4FF]/30 uppercase">
                ENGINEERING CASE STUDY
              </span>
              <span className="text-xs font-mono text-[#4A5D78] dark:text-[#8EA3BE]">
                {caseStudy.id}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#09111E] dark:text-[#F5F8FF]">
              {caseStudy.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#0369A1] dark:text-[#00D4FF] mt-1 font-mono">
              {caseStudy.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF] bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 bg-[#F4F7FB] dark:bg-[#08172E] border-b border-[#CBD6E6] dark:border-[#203B5B] flex gap-4 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#0369A1] dark:border-[#00D4FF] text-[#0369A1] dark:text-[#00D4FF]"
                : "border-transparent text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF]"
            }`}
          >
            System Overview
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`py-3 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "architecture"
                ? "border-[#0369A1] dark:border-[#00D4FF] text-[#0369A1] dark:text-[#00D4FF]"
                : "border-transparent text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF]"
            }`}
          >
            Pipeline &amp; Architecture
          </button>
          <button
            onClick={() => setActiveTab("testing")}
            className={`py-3 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "testing"
                ? "border-[#0369A1] dark:border-[#00D4FF] text-[#0369A1] dark:text-[#00D4FF]"
                : "border-transparent text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF]"
            }`}
          >
            Verification &amp; Metrics
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B3B52] dark:text-[#B4C3D8]">
          {/* Metrics bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F4F7FB] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B]">
            {caseStudy.metrics.map((metric, mIdx) => (
              <div key={mIdx}>
                <div className="text-[10px] font-mono text-[#4A5D78] dark:text-[#8EA3BE] uppercase">{metric.label}</div>
                <div className="text-sm sm:text-base font-bold text-[#0369A1] dark:text-[#00D4FF] font-mono mt-0.5">{metric.value}</div>
              </div>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#EAF0F8] dark:bg-[#0D203B]/60 border border-[#CBD6E6] dark:border-[#203B5B]/80">
                <h3 className="font-mono text-xs font-bold text-[#0369A1] dark:text-[#00D4FF] uppercase mb-2">Architectural Blueprint</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#09111E] dark:text-[#F5F8FF]">{caseStudy.architectureDetails}</p>
              </div>

              {caseStudy.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h4 className="text-base font-bold text-[#09111E] dark:text-[#F5F8FF] font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1] dark:bg-[#00D4FF]" />
                    {section.heading}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed">{section.body}</p>

                  {section.highlights && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2">
                      {section.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs bg-[#F4F7FB] dark:bg-[#061329] p-2.5 rounded border border-[#CBD6E6] dark:border-[#203B5B]/60 text-[#2B3B52] dark:text-[#8EA3BE]">
                          <span className="text-[#0369A1] dark:text-[#00D4FF] shrink-0 font-bold">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F4F7FB] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] font-mono text-xs text-[#2B3B52] dark:text-[#B4C3D8] space-y-3">
                <div className="text-[#0369A1] dark:text-[#00D4FF] font-bold pb-2 border-b border-[#CBD6E6] dark:border-[#203B5B]">
                  REQUEST EXECUTION LIFECYCLE
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded bg-white dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B]">
                    <span className="text-[#0369A1] dark:text-[#00D4FF] font-semibold">1. Ingress:</span> Client sends payload to FastAPI via Pydantic model validation.
                  </div>
                  <div className="p-2.5 rounded bg-white dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B]">
                    <span className="text-[#0369A1] dark:text-[#00D4FF] font-semibold">2. Triage / Guard:</span> Deterministic safety regex &amp; negation handler checks for distress / boundary triggers.
                  </div>
                  <div className="p-2.5 rounded bg-white dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B]">
                    <span className="text-[#0369A1] dark:text-[#00D4FF] font-semibold">3. Machine Learning:</span> TF-IDF feature extraction + Logistic Regression or structured Gemini prompt inference.
                  </div>
                  <div className="p-2.5 rounded bg-white dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B]">
                    <span className="text-[#0369A1] dark:text-[#00D4FF] font-semibold">4. Serialization:</span> Type-safe JSON response packaged with latency headers.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#EAF0F8] dark:bg-[#0D203B]/60 border border-[#CBD6E6] dark:border-[#203B5B]">
                <h4 className="font-mono text-xs font-bold text-[#09111E] dark:text-[#F5F8FF] mb-2">Technical Decisions &amp; Trade-offs</h4>
                <p className="text-xs text-[#2B3B52] dark:text-[#8EA3BE] leading-relaxed">
                  Rather than feeding every user utterance directly into a black-box large language model, separating deterministic intent parsing ensures compliance, zero-hallucination guardrails, and deterministic fallback behaviour under high load.
                </p>
              </div>
            </div>
          )}

          {activeTab === "testing" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F4F7FB] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] font-mono text-xs text-emerald-700 dark:text-emerald-400 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#CBD6E6] dark:border-[#203B5B] text-xs font-semibold">
                  <span>PYTEST AUTOMATED TEST RUNNER</span>
                  <span className="bg-emerald-600/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/30 dark:border-emerald-400/30">
                    ALL TESTS PASSING
                  </span>
                </div>
                <div className="text-[11px] text-[#4A5D78] dark:text-[#8EA3BE] space-y-1 font-mono pt-2">
                  <p>tests/test_safety_guardrails.py ......................... [ 42% ]</p>
                  <p>tests/test_nlp_intent_classifier.py ..................... [ 78% ]</p>
                  <p>tests/test_fastapi_endpoints.py .......................... [ 100% ]</p>
                  <p className="text-emerald-700 dark:text-emerald-400 pt-2 font-bold">================ 238 passed, 0 failed in 1.42s ================</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#EAF0F8] dark:bg-[#0D203B]/60 border border-[#CBD6E6] dark:border-[#203B5B] text-xs text-[#2B3B52] dark:text-[#8EA3BE]">
                <h4 className="font-mono text-xs font-bold text-[#09111E] dark:text-[#F5F8FF] mb-1">Regression Defense</h4>
                <p>
                  Every change to negation dictionaries or intent models is tested against edge cases including double negatives, slang abbreviations, and prompt injection attempts.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#EAF0F8] dark:bg-[#0D203B] border-t border-[#CBD6E6] dark:border-[#203B5B] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.tags.map((t, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-[#061329] text-[#4A5D78] dark:text-[#8EA3BE] border border-[#CBD6E6] dark:border-[#203B5B]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenDemo(caseStudy.id);
              }}
              className="px-4 py-2 rounded-lg bg-[#0369A1] hover:bg-[#075985] dark:bg-[#00D4FF] dark:hover:bg-[#38bdf8] text-white dark:text-[#061329] font-mono text-xs font-bold transition-all shadow-md shadow-[#0369A1]/25 dark:shadow-[0_0_15px_rgba(0,212,255,0.3)] cursor-pointer"
            >
              Launch Live Simulation
            </button>
            <a
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#F4F7FB] dark:bg-[#061329] dark:hover:bg-[#081A35] text-[#09111E] dark:text-[#F5F8FF] border border-[#CBD6E6] dark:border-[#203B5B] font-mono text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>GitHub Repo</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
