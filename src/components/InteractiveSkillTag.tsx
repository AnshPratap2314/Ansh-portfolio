import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveSkillTagProps {
  name: string;
  highlight?: boolean;
  bold?: boolean;
  onPreview?: (skillName: string) => void;
  className?: string;
}

export const InteractiveSkillTag: React.FC<InteractiveSkillTagProps> = ({
  name,
  highlight = false,
  bold = false,
  onPreview,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPreview) {
      onPreview(name);
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{
          y: -3,
          scale: 1.02,
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`relative z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer select-none ${
          isHovered
            ? "border-[#00D4FF] text-white bg-[#0A1930] shadow-[0_12px_24px_-4px_rgba(0,212,255,0.65),0_4px_12px_rgba(0,212,255,0.35)]"
            : highlight
            ? "bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/45 font-semibold shadow-[0_0_12px_rgba(0,212,255,0.15)]"
            : "bg-[#061329] text-[#B4C3D8] border border-[#203B5B]/85 hover:border-[#00D4FF]/60 hover:text-white"
        } ${bold ? "font-bold" : ""}`}
      >
        {highlight && (
          <motion.span
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] text-[#00D4FF]"
          >
            ✦
          </motion.span>
        )}
        <span>{name}</span>
      </motion.button>

      {/* Floating Preview Pill underneath when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={handleClick}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-40 pointer-events-auto cursor-pointer hidden sm:block"
          >
            <div className="bg-[#E2EDF8] hover:bg-white text-[#061329] text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-md shadow-xl border border-white/70 select-none whitespace-nowrap transition-transform hover:scale-105 active:scale-95 flex items-center gap-1">
              <span>Preview</span>
              <span className="text-[10px] text-[#00D4FF] font-bold">↗</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
