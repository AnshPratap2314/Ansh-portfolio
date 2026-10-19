import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getSkillPreview } from "../data/skillPreviews";

interface SkillPreviewModalProps {
  skillName: string | null;
  onClose: () => void;
  onOpenDemo?: (projectId: string) => void;
}

export const SkillPreviewModal: React.FC<SkillPreviewModalProps> = ({
  skillName,
  onClose,
  onOpenDemo,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (skillName) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [skillName, onClose]);

  if (!skillName) return null;

  const info = getSkillPreview(skillName);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040D1D]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#09182D] border border-[#00D4FF]/40 shadow-[0_0_50px_rgba(0,212,255,0.25)] p-4 sm:p-8 z-10"
        >
          {/* Top Edge Cyan Glow Beam */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent shadow-[0_0_15px_#00D4FF]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-[#8EA3BE] hover:text-white hover:bg-[#0D203B] transition-colors cursor-pointer"
            aria-label="Close Preview"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category kicker */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-wider font-semibold">
              {info.category}
            </span>
          </div>

          {/* Skill Title & Role */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FF] tracking-tight flex items-center gap-3">
            <span>{info.name}</span>
          </h3>
          <div className="text-sm font-mono text-[#8EA3BE] mt-1">
            {info.role}
          </div>

          {/* Project Association Box */}
          <div className="mt-5 p-3.5 rounded-xl bg-[#061329] border border-[#203B5B] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#8EA3BE] uppercase block">Demonstrated in Project</span>
              <span className="text-sm font-bold text-white">{info.projectTitle}</span>
            </div>
            {info.liveUrl && (
              <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                LIVE PRODUCTION
              </span>
            )}
          </div>

          {/* Technical Description */}
          <div className="mt-5 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-[#B4C3D8] uppercase tracking-wider">
              Engineering Implementation:
            </h4>
            <p className="text-sm text-[#E2EDF8] leading-relaxed bg-[#0D203B]/60 p-4 rounded-xl border border-[#203B5B]/60">
              {info.description}
            </p>
          </div>

          {/* Production Metrics */}
          {info.metrics && info.metrics.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-mono font-semibold text-[#B4C3D8] uppercase tracking-wider mb-2">
                Verified Capabilities:
              </h4>
              <div className="flex flex-wrap gap-2">
                {info.metrics.map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-[#061329] border border-[#203B5B] text-[#00D4FF]"
                  >
                    <span className="text-[10px]">✓</span>
                    <span>{m}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-7 pt-5 border-t border-[#203B5B]/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {info.liveUrl && (
                <a
                  href={info.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#00D4FF] text-[#061329] hover:bg-[#38bdf8] transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer"
                >
                  <span>Launch Live App</span>
                  <span>↗</span>
                </a>
              )}

              {info.githubUrl && (
                <a
                  href={info.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-[#0D203B] text-[#F5F8FF] border border-[#203B5B] hover:border-[#00D4FF]/60 hover:text-[#00D4FF] transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#00D4FF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>View Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-[#8EA3BE] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#061329] transition-colors cursor-pointer"
            >
              Done (ESC)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
