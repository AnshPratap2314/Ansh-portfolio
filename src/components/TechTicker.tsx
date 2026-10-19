import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const TechTicker: React.FC = () => {
  const items = PORTFOLIO_DATA.tickerItems;
  // Repeat items 4 times to guarantee a seamless, gap-free infinite marquee across all screen sizes
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#07162E] border-y border-[#203B5B]/80 py-3.5 overflow-hidden relative select-none shadow-inner">
      {/* Subtle glowing circuit scan overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D4FF]/5 to-transparent pointer-events-none animate-pulse-dot" />

      {/* Left and Right ambient fade masks for clean visual entrance/exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#061329] via-[#061329]/90 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#061329] via-[#061329]/90 to-transparent z-10" />

      {/* Continuously moving infinite marquee track */}
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 28,
          repeat: Infinity,
        }}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 shrink-0 text-xs sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B4C3D8]/90 hover:text-[#00D4FF] transition-colors cursor-default"
          >
            <span className="text-[#00D4FF] drop-shadow-[0_0_8px_rgba(0,212,255,0.7)] text-xs">◆</span>
            <span className="font-semibold">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
