import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const TechTicker: React.FC = () => {
  const items = PORTFOLIO_DATA.tickerItems;
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#EAF0F8] dark:bg-[#07162E] border-y border-[#CBD6E6] dark:border-[#203B5B]/80 py-3.5 overflow-hidden relative select-none shadow-inner">
      {/* Subtle circuit scan overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0369A1]/5 dark:via-[#00D4FF]/5 to-transparent pointer-events-none animate-pulse-dot" />

      {/* Left and Right ambient fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#F4F7FB] via-[#F4F7FB]/90 dark:from-[#061329] dark:via-[#061329]/90 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#F4F7FB] via-[#F4F7FB]/90 dark:from-[#061329] dark:via-[#061329]/90 to-transparent z-10" />

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
            className="flex items-center gap-3 shrink-0 text-xs sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#2B3B52] dark:text-[#B4C3D8]/90 hover:text-[#0369A1] dark:hover:text-[#00D4FF] transition-colors cursor-default"
          >
            <span className="text-[#0369A1] dark:text-[#00D4FF] dark:drop-shadow-[0_0_8px_rgba(0,212,255,0.7)] text-xs">◆</span>
            <span className="font-semibold">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
