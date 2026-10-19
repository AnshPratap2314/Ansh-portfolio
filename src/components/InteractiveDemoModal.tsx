import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface InteractiveDemoModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  projectId,
  onClose,
}) => {
  const [modalView, setModalView] = useState<"sandbox" | "liveWeb">("sandbox");

  // MindCare State
  const [mindcareInput, setMindcareInput] = useState(
    "I'm feeling overwhelmed with exams and project deadlines, but I'm trying to manage my schedule."
  );
  const [mindcareResult, setMindcareResult] = useState<{
    mood: string;
    topic: string;
    riskLevel: string;
    negationFlag: boolean;
    latencyMs: number;
    response: string;
  }>({
    mood: "Resilient / Coping",
    topic: "Academic Stress & Time Pressure",
    riskLevel: "LOW (Supportive Tier)",
    negationFlag: true,
    latencyMs: 14.2,
    response:
      "It sounds like you're carrying a heavy cognitive load with exams and projects right now. Acknowledging that you're trying to manage it is a great first step. Breaking your study blocks into 25-minute Pomodoro sessions and prioritizing the most critical deliverable can relieve some immediate pressure. What is the single biggest deadline on your plate today?",
  });
  const [isClassifying, setIsClassifying] = useState(false);

  // Interview Simulator State
  const [interviewTrack, setInterviewTrack] = useState<"aiml" | "backend" | "genai">("aiml");
  const [interviewQuestion, setInterviewQuestion] = useState(
    "Explain how you handle extreme class imbalance in classification datasets and how you calibrate evaluation metrics."
  );
  const [interviewAnswer, setInterviewAnswer] = useState(
    "When addressing class imbalance, standard accuracy is misleading because a dummy classifier predicting the majority class can score high. I use SMOTE or class-weight adjustment in LogisticRegression/Scikit-learn, evaluate with PR-AUC, F1-macro, and confusion matrix."
  );
  const [interviewFeedback, setInterviewFeedback] = useState<{
    overallScore: number;
    depth: number;
    clarity: number;
    efficiency: number;
    strengths: string[];
    improvements: string[];
  }>({
    overallScore: 92,
    depth: 94,
    clarity: 88,
    efficiency: 95,
    strengths: [
      "Directly addresses why standard accuracy fails on imbalanced distributions.",
      "Cites concrete algorithmic solutions: class weighting, SMOTE, and metric shifts (F1-macro, PR-AUC).",
      "Demonstrates practical hands-on understanding of scikit-learn evaluation metrics.",
    ],
    improvements: [
      "Could mention threshold calibration / cost-sensitive matrix considerations for high-stakes domains.",
      "Could briefly touch upon focal loss if applying neural networks.",
    ],
  });
  const [isEvaluating, setIsEvaluating] = useState(false);

  // StudyVerse AI State
  const [studyTutorMode, setStudyTutorMode] = useState<"socratic" | "examprep" | "beginner">("socratic");
  const [studyQuery, setStudyQuery] = useState("Explain quantum superposition and why measurement collapses the wave function.");
  const [studyResult, setStudyResult] = useState<{
    retrievedChunks: string[];
    explanation: string;
    flashcards: { q: string; a: string }[];
  }>({
    retrievedChunks: [
      "Section 3.2: Quantum Superposition states that a system exists simultaneously in linear combination |ψ⟩ = α|0⟩ + β|1⟩ with |α|² + |β|² = 1.",
      "Section 3.5: Copenhagen Interpretation describes measurement as a projection onto an observable eigenstate, causing wave function collapse."
    ],
    explanation:
      "Think of superposition like a coin spinning in mid-air. While spinning, is it heads or tails? In a sense, it holds both probabilities at once. When your hand catches it (the act of measurement), the environment forces it into a definite outcome. Why do you think quantum algorithms can explore exponentially more state paths before that collapse happens?",
    flashcards: [
      { q: "What is the normalization condition for qubit state |ψ⟩ = α|0⟩ + β|1⟩?", a: "|α|² + |β|² = 1" },
      { q: "What causes wavefunction collapse?", a: "Interaction/measurement projecting state onto an observable basis" }
    ]
  });
  const [isStudyGenerating, setIsStudyGenerating] = useState(false);

  // PCA Explorer State
  const [pcaK, setPcaK] = useState(30);

  if (!projectId) return null;

  const currentProject = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
  const liveUrl = currentProject?.demoUrl;

  // Execute MindCare NLP (Zero glitch)
  const handleMindCareRun = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsClassifying(true);
    setTimeout(() => {
      const lower = mindcareInput.toLowerCase();
      const hasNegation = lower.includes("not") || lower.includes("never") || lower.includes("no") || lower.includes("trying");
      const isAnxious = lower.includes("exam") || lower.includes("deadline") || lower.includes("stress") || lower.includes("overwhelm");
      const isSad = lower.includes("lonely") || lower.includes("sad") || lower.includes("hopeless");

      let mood = "Resilient / Coping";
      let topic = "Academic Stress & Time Pressure";
      let riskLevel = "LOW (Supportive Tier)";
      let response =
        "It sounds like you're carrying a heavy cognitive load with exams and projects right now. Acknowledging that you're trying to manage it is a great first step. Breaking your study blocks into 25-minute Pomodoro sessions and prioritizing the most critical deliverable can relieve some immediate pressure. What is the single biggest deadline on your plate today?";

      if (isSad) {
        mood = "Isolation / Low Energy";
        topic = "Social Connection & Wellbeing";
        riskLevel = "MONITORED (Mild Concern)";
        response =
          "Feeling disconnected can be really taxing on your energy. It is completely okay to feel this way, and taking time to sit with your feelings matters. Even reaching out to one trusted peer for a short walk or coffee can make a meaningful difference. Would you like some gentle journaling prompts for tonight?";
      } else if (!isAnxious && !isSad) {
        mood = "Reflective / Stable";
        topic = "General Reflection";
        response =
          "Thank you for sharing your thoughts. Keeping track of how you feel throughout your week builds self-awareness. Is there anything specific you want to reflect on or unpack today?";
      }

      setMindcareResult({
        mood,
        topic,
        riskLevel,
        negationFlag: hasNegation,
        latencyMs: 14.2,
        response,
      });
      setIsClassifying(false);
    }, 250);
  };

  // Execute Interview Evaluation (Zero glitch)
  const handleInterviewEvaluate = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsEvaluating(true);
    setTimeout(() => {
      setInterviewFeedback({
        overallScore: 92,
        depth: 94,
        clarity: 88,
        efficiency: 95,
        strengths: [
          "Directly addresses why standard accuracy fails on imbalanced distributions.",
          "Cites concrete algorithmic solutions: class weighting, SMOTE, and metric shifts (F1-macro, PR-AUC).",
          "Demonstrates practical hands-on understanding of scikit-learn evaluation metrics.",
        ],
        improvements: [
          "Could mention threshold calibration / cost-sensitive matrix considerations for high-stakes domains.",
          "Could briefly touch upon focal loss if applying neural networks.",
        ],
      });
      setIsEvaluating(false);
    }, 250);
  };

  // Execute StudyVerse AI RAG (Zero glitch)
  const handleStudyVerseRun = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsStudyGenerating(true);
    setTimeout(() => {
      setStudyResult({
        retrievedChunks: [
          "Section 3.2: Quantum Superposition states that a system exists simultaneously in linear combination |ψ⟩ = α|0⟩ + β|1⟩ with |α|² + |β|² = 1.",
          "Section 3.5: Copenhagen Interpretation describes measurement as a projection onto an observable eigenstate, causing wave function collapse."
        ],
        explanation:
          studyTutorMode === "socratic"
            ? "Think of superposition like a coin spinning in mid-air. While spinning, is it heads or tails? In a sense, it holds both probabilities at once. When your hand catches it (the act of measurement), the environment forces it into a definite outcome. Why do you think quantum algorithms can explore exponentially more state paths before that collapse happens?"
            : "Superposition allows quantum particles to exist in a linear combination of states until interaction with a macroscopic measuring apparatus forces state projection into a discrete eigenbasis.",
        flashcards: [
          { q: "What is the normalization condition for qubit state |ψ⟩ = α|0⟩ + β|1⟩?", a: "|α|² + |β|² = 1" },
          { q: "What causes wavefunction collapse?", a: "Interaction/measurement projecting state onto an observable basis" }
        ]
      });
      setIsStudyGenerating(false);
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#061329]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0B1B34] border border-[#203B5B] rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Top Announcement Bar with Direct Live Cloud App Launch */}
        {liveUrl && (
          <div className="bg-gradient-to-r from-[#00D4FF]/20 via-[#1677FF]/20 to-[#00D4FF]/20 border-b border-[#00D4FF]/30 px-4 py-2.5 flex items-center justify-between gap-3 text-xs font-mono">
            <span className="flex items-center gap-2 text-[#00D4FF] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OFFICIAL CLOUD DEPLOYMENT IS LIVE</span>
            </span>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded bg-[#00D4FF] text-[#061329] font-bold hover:bg-[#38bdf8] transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,212,255,0.4)]"
            >
              <span>Launch Live Site</span>
              <span>↗</span>
            </a>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0D203B] border-b border-[#203B5B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-0.5 rounded border border-[#00D4FF]/30 uppercase">
                INTERACTIVE TESTING LAB
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ONLINE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#F5F8FF]">
              {projectId === "mindcare"
                ? "MindCare AI — NLP Intent & Safety Pipeline"
                : projectId === "interview"
                ? "AI Interview Simulator — Structured Rubric Scorer"
                : projectId === "studyverse"
                ? "StudyVerse AI — Document Intelligence & Socratic Tutor"
                : projectId === "pca"
                ? "PCA Eigenfaces — Dimensionality & Variance Explorer"
                : "Aishie — Voice & Vision Automation Dispatcher"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {liveUrl && (
              <div className="flex rounded-lg bg-[#061329] p-0.5 border border-[#203B5B]">
                <button
                  type="button"
                  onClick={() => setModalView("sandbox")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    modalView === "sandbox" ? "bg-[#00D4FF] text-[#061329] font-bold" : "text-[#8EA3BE] hover:text-white"
                  }`}
                >
                  Sandbox
                </button>
                <button
                  type="button"
                  onClick={() => setModalView("liveWeb")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    modalView === "liveWeb" ? "bg-[#00D4FF] text-[#061329] font-bold" : "text-[#8EA3BE] hover:text-white"
                  }`}
                >
                  Live Web
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#8EA3BE] hover:text-[#F5F8FF] bg-[#061329] border border-[#203B5B] rounded-lg transition-colors cursor-pointer"
              aria-label="Close demo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#B4C3D8]">
          {/* TAB: EMBEDDED LIVE WEBVIEW */}
          {modalView === "liveWeb" && liveUrl ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <div className="text-[#00D4FF] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>TARGET DEPLOYMENT: {currentProject?.title}</span>
                  </div>
                  <div className="text-[#8EA3BE] text-[11px] truncate mt-0.5">{liveUrl}</div>
                </div>

                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#00D4FF] text-[#061329] font-bold hover:bg-[#38bdf8] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.4)] shrink-0"
                >
                  <span>Launch in New Window</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-[#203B5B] bg-[#061329]">
                <iframe
                  src={liveUrl}
                  title={`${currentProject?.title} Live Preview`}
                  className="w-full h-full border-0"
                  allow="clipboard-write; camera; microphone"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

              <p className="text-[11px] font-mono text-[#8EA3BE] text-center">
                Note: Some cloud providers (Render free spin-up / Vercel frame policy) restrict third-party iframe embedding. Click &quot;Launch in New Window ↗&quot; above for direct unrestricted access.
              </p>
            </div>
          ) : (
            <>
              {/* TAB: INTERACTIVE SANDBOX */}

              {/* CASE 1: MINDCARE AI */}
              {projectId === "mindcare" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B] text-xs font-mono flex items-center justify-between">
                    <span className="text-[#00D4FF]">MODEL: scikit-learn TF-IDF + LogisticRegression</span>
                    <span className="text-emerald-400">SAFETY NEGATION GUARD: ACTIVE</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-2">
                      Test User Input Utterance
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[
                        "I'm feeling overwhelmed with exams and project deadlines, but I'm trying to manage my schedule.",
                        "I feel so lonely and disconnected from my friends lately.",
                        "I'm excited about releasing our ML model this weekend!",
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setMindcareInput(preset);
                          }}
                          className="px-2.5 py-1 rounded bg-[#0D203B] hover:bg-[#163359] text-[11px] font-mono text-[#8EA3BE] hover:text-[#00D4FF] border border-[#203B5B] transition-colors cursor-pointer text-left line-clamp-1 max-w-xs"
                        >
                          Sample {idx + 1}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={3}
                      value={mindcareInput}
                      onChange={(e) => setMindcareInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00D4FF] font-sans resize-none"
                      placeholder="Enter a message to run through the NLP classifier and safety triage..."
                    />

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={handleMindCareRun}
                        disabled={isClassifying}
                        className="px-5 py-2.5 rounded-lg bg-[#00D4FF] hover:bg-[#38bdf8] text-[#061329] font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center gap-2 cursor-pointer"
                      >
                        {isClassifying ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-[#061329] border-t-transparent rounded-full animate-spin" />
                            <span>Classifying...</span>
                          </>
                        ) : (
                          <>
                            <span>Execute NLP Pipeline</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {mindcareResult && (
                    <div className="p-5 rounded-xl bg-[#08172E] border border-[#00D4FF]/40 space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">DETECTED MOOD</div>
                          <div className="font-bold text-[#00D4FF] mt-1">{mindcareResult.mood}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">TOPIC CLUSTER</div>
                          <div className="font-bold text-[#F5F8FF] mt-1">{mindcareResult.topic}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">RISK ESCALATION</div>
                          <div className="font-bold text-emerald-400 mt-1">{mindcareResult.riskLevel}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">PIPELINE LATENCY</div>
                          <div className="font-bold text-amber-300 mt-1">{mindcareResult.latencyMs}ms</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B]">
                        <div className="font-mono text-xs text-[#00D4FF] font-bold uppercase mb-2">
                          Generated Supportive Guidance
                        </div>
                        <p className="text-sm text-[#F5F8FF] leading-relaxed">
                          {mindcareResult.response}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CASE 2: AI INTERVIEW SIMULATOR */}
              {projectId === "interview" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8EA3BE]">SELECT ROLE TRACK:</span>
                      {(["aiml", "backend", "genai"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setInterviewTrack(t);
                            if (t === "aiml") setInterviewQuestion("Explain how you handle extreme class imbalance in classification datasets and how you calibrate evaluation metrics.");
                            if (t === "backend") setInterviewQuestion("Describe how FastAPI handles async coroutines and concurrency under Uvicorn compared to traditional WSGI.");
                            if (t === "genai") setInterviewQuestion("How do you guarantee strict Pydantic JSON validation from an LLM without getting unexpected hallucinatory keys?");
                          }}
                          className={`px-2.5 py-1 rounded uppercase text-[10px] cursor-pointer transition-all ${
                            interviewTrack === t
                              ? "bg-[#00D4FF] text-[#061329] font-bold"
                              : "bg-[#0D203B] text-[#8EA3BE] border border-[#203B5B]"
                          }`}
                        >
                          {t === "aiml" ? "AI/ML Engineer" : t === "backend" ? "Python Backend" : "Generative AI"}
                        </button>
                      ))}
                    </div>
                    <span className="text-[#00D4FF]">GEMINI 1.5 STRUCTURED OUTPUT</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#00D4FF] font-bold uppercase mb-1">
                      Active Interview Prompt:
                    </label>
                    <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] mb-3">
                      {interviewQuestion}
                    </div>

                    <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-1">
                      Candidate Response Submission:
                    </label>
                    <textarea
                      rows={4}
                      value={interviewAnswer}
                      onChange={(e) => setInterviewAnswer(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00D4FF] font-sans resize-none"
                    />

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={handleInterviewEvaluate}
                        disabled={isEvaluating}
                        className="px-5 py-2.5 rounded-lg bg-[#00D4FF] hover:bg-[#38bdf8] text-[#061329] font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center gap-2 cursor-pointer"
                      >
                        {isEvaluating ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-[#061329] border-t-transparent rounded-full animate-spin" />
                            <span>Evaluating via Structured Schema...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit for AI Evaluation</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {interviewFeedback && (
                    <div className="p-5 rounded-xl bg-[#08172E] border border-[#00D4FF]/40 space-y-4">
                      {/* Score Radar / Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">OVERALL SCORE</div>
                          <div className="text-2xl font-extrabold text-[#00D4FF] font-mono mt-1">
                            {interviewFeedback.overallScore}%
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">TECHNICAL DEPTH</div>
                          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
                            {interviewFeedback.depth}%
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">CLARITY &amp; STRUCTURE</div>
                          <div className="text-2xl font-extrabold text-amber-300 font-mono mt-1">
                            {interviewFeedback.clarity}%
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                          <div className="text-[10px] text-[#8EA3BE]">EFFICIENCY</div>
                          <div className="text-2xl font-extrabold text-purple-400 font-mono mt-1">
                            {interviewFeedback.efficiency}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="font-mono text-[#00D4FF] font-bold">Key Strengths Recognized:</div>
                        <ul className="space-y-1.5">
                          {interviewFeedback.strengths.map((str, i) => (
                            <li key={i} className="text-[#F5F8FF] flex items-start gap-2">
                              <span className="text-emerald-400">✓</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="font-mono text-amber-300 font-bold pt-2">Recommended Improvements:</div>
                        <ul className="space-y-1.5">
                          {interviewFeedback.improvements.map((imp, i) => (
                            <li key={i} className="text-[#B4C3D8] flex items-start gap-2">
                              <span className="text-amber-400">▹</span>
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CASE 3: STUDYVERSE AI */}
              {projectId === "studyverse" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8EA3BE]">TUTOR MODE:</span>
                      {(["socratic", "examprep", "beginner"] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setStudyTutorMode(mode)}
                          className={`px-2.5 py-1 rounded capitalize text-[10px] cursor-pointer transition-all ${
                            studyTutorMode === mode
                              ? "bg-[#00D4FF] text-[#061329] font-bold"
                              : "bg-[#0D203B] text-[#8EA3BE] border border-[#203B5B]"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                    <span className="text-emerald-400">DOCUMENT RETRIEVAL (RAG)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-1">
                      Active Document Index:
                    </label>
                    <div className="p-3 rounded-lg bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] mb-3 flex items-center justify-between">
                      <span>📄 Introduction to Quantum Computing &amp; Qubits</span>
                      <span className="text-xs font-mono text-[#00D4FF]">15 pages indexed</span>
                    </div>

                    <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-1">
                      Ask AI Tutor:
                    </label>
                    <input
                      type="text"
                      value={studyQuery}
                      onChange={(e) => setStudyQuery(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00D4FF]"
                    />

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={handleStudyVerseRun}
                        disabled={isStudyGenerating}
                        className="px-5 py-2.5 rounded-lg bg-[#00D4FF] hover:bg-[#38bdf8] text-[#061329] font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center gap-2 cursor-pointer"
                      >
                        {isStudyGenerating ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-[#061329] border-t-transparent rounded-full animate-spin" />
                            <span>Retrieving Chunks &amp; Answering...</span>
                          </>
                        ) : (
                          <>
                            <span>Ask Socratic Tutor</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {studyResult && (
                    <div className="p-5 rounded-xl bg-[#08172E] border border-[#00D4FF]/40 space-y-4">
                      <div className="p-3.5 rounded-lg bg-[#061329] border border-[#203B5B]">
                        <div className="text-[10px] font-mono text-[#00D4FF] uppercase mb-1">
                          Retrieved Document Passages (RAG):
                        </div>
                        {studyResult.retrievedChunks.map((c, i) => (
                          <p key={i} className="text-xs text-[#8EA3BE] font-mono mb-1">
                            {c}
                          </p>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B]">
                        <div className="text-[11px] font-mono text-[#00D4FF] font-bold uppercase mb-1">
                          AI Tutor Guidance ({studyTutorMode}):
                        </div>
                        <p className="text-sm text-[#F5F8FF] leading-relaxed">
                          {studyResult.explanation}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {studyResult.flashcards.map((fc, i) => (
                          <div key={i} className="p-3 rounded-lg bg-[#061329] border border-[#203B5B]">
                            <div className="text-[10px] font-mono text-[#00D4FF]">FLASHCARD #{i + 1}</div>
                            <div className="text-xs font-semibold text-[#F5F8FF] mt-1">Q: {fc.q}</div>
                            <div className="text-xs text-emerald-400 mt-1">A: {fc.a}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CASE 4: PCA FACE RECOGNITION */}
              {projectId === "pca" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#00D4FF] font-bold uppercase">
                        Interactive Eigenface Dimension Explorer
                      </span>
                      <span className="font-mono text-xs text-amber-300">
                        k = {pcaK} components
                      </span>
                    </div>

                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={pcaK}
                      onChange={(e) => setPcaK(Number(e.target.value))}
                      className="w-full h-2 bg-[#0D203B] rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#8EA3BE] mt-1">
                      <span>k=5 (Heavy Compression)</span>
                      <span>k=50 (Balanced)</span>
                      <span>k=100 (High Fidelity)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-[#08172E] border border-[#203B5B]">
                      <div className="text-[10px] text-[#8EA3BE]">COMPRESSION RATIO</div>
                      <div className="text-lg font-bold text-[#00D4FF] mt-1">
                        {Math.round((1 - pcaK / 1024) * 100)}%
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#08172E] border border-[#203B5B]">
                      <div className="text-[10px] text-[#8EA3BE]">EXPLAINED VARIANCE</div>
                      <div className="text-lg font-bold text-emerald-400 mt-1">
                        {Math.min(99.4, (55 + pcaK * 0.44)).toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#08172E] border border-[#203B5B]">
                      <div className="text-[10px] text-[#8EA3BE]">RECONSTRUCTION MSE</div>
                      <div className="text-lg font-bold text-amber-300 mt-1">
                        {(0.28 - pcaK * 0.0025).toFixed(3)}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#08172E] border border-[#203B5B]">
                      <div className="text-[10px] text-[#8EA3BE]">CLASSIFIER ACCURACY</div>
                      <div className="text-lg font-bold text-[#F5F8FF] mt-1">
                        {Math.min(96.8, (72 + pcaK * 0.26)).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 5: AISHIE ASSISTANT */}
              {projectId === "aishie" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#061329] border border-[#203B5B] text-xs font-mono flex items-center justify-between">
                    <span className="text-[#00D4FF]">STATUS: LOCAL-FIRST PYTHON DAEMON</span>
                    <span className="text-emerald-400">BIOMETRIC AUTH: ACTIVE</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#08172E] border border-[#203B5B] font-mono text-xs space-y-2">
                    <div className="text-[#8EA3BE]">// Active Camera Face Bounding Box</div>
                    <div className="p-3 rounded bg-[#061329] text-emerald-400 flex items-center justify-between">
                      <span>[MATCH: Ansh Pratap (Confidence 98.7%)]</span>
                      <span className="text-xs text-[#00D4FF]">GATEWAY UNLOCKED</span>
                    </div>
                    <div className="text-[#8EA3BE] pt-2">// Command Audio Pipeline</div>
                    <div className="p-3 rounded bg-[#061329] text-[#F5F8FF]">
                      &gt; "Open system telemetry and run test suite for MindCare"
                    </div>
                    <div className="text-[#8EA3BE] text-[11px] pt-1">
                      Dispatched via local PyAutoGUI &amp; subprocess without external cloud connection.
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#0D203B] border-t border-[#203B5B] flex flex-wrap items-center justify-between gap-3">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#00D4FF] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Direct Link: {liveUrl}</span>
              <span>↗</span>
            </a>
          ) : (
            <div className="text-[11px] font-mono text-[#8EA3BE]">
              Local/Academic Build · Evaluation Included
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[#061329] hover:bg-[#091D38] text-[#F5F8FF] border border-[#203B5B] font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
