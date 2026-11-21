import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

export const AboutSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD6E6] dark:border-[#203B5B]/50 tech-grid-bg"
      data-purpose="about-narrative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Title and Bio Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#0369A1] dark:text-[#00D4FF] uppercase">
              01 — ABOUT
            </span>
            <div className="h-px w-12 bg-[#0369A1]/40 dark:bg-[#00D4FF]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] leading-tight mb-8">
            A builder with an <br />
            <span className="text-[#0369A1] dark:text-[#00D4FF]">AI/ML core.</span>
          </h2>

          {/* Mini Profile Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-2xl bg-white dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B] flex items-center gap-4 max-w-md mb-6 shadow-md dark:shadow-xl hover:border-[#0369A1]/60 dark:hover:border-[#00D4FF]/50 transition-colors"
          >
            <img
              src={PORTFOLIO_DATA.profile.avatarUrl}
              alt={PORTFOLIO_DATA.profile.name}
              className="w-16 h-16 rounded-xl object-cover border border-[#0369A1]/40 dark:border-[#00D4FF]/50 shadow-md"
              loading="lazy"
            />
            <div>
              <h3 className="font-bold text-base text-[#09111E] dark:text-white">{PORTFOLIO_DATA.profile.name}</h3>
              <p className="text-xs text-[#0369A1] dark:text-[#00D4FF] font-mono font-medium">B.Tech CSE (4th Final Year) · Mewar Univ</p>
              <p className="text-xs text-[#4A5D78] dark:text-[#B4C3D8] mt-1">{PORTFOLIO_DATA.profile.location}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Detailed Story & 4 Stats Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-6"
        >
          <p className="text-base sm:text-lg text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed">
            I'm a 4th-year (final year) Computer Science and Engineering student at Mewar University, Rajasthan. My work sits where machine learning meets real software: I train NLP classifiers, wire them into FastAPI backends, and ship them as applications people can actually open in a browser.
          </p>
          <p className="text-base sm:text-lg text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed">
            That shows up in the things I've built — <strong className="text-[#09111E] dark:text-white font-semibold">MindCare AI</strong>, a safety-first mental-health NLP platform with an independent risk layer and 238 passing regression tests; an <strong className="text-[#09111E] dark:text-white font-semibold">AI Interview Simulator</strong> that evaluates answers through strictly structured Gemini outputs; and <strong className="text-[#09111E] dark:text-white font-semibold">Aishie</strong>, a local-first voice and face-recognition desktop assistant. I care about the unglamorous parts too: input validation, session management, tests and deployment.
          </p>
          <p className="text-base sm:text-lg text-[#2B3B52] dark:text-[#B4C3D8] leading-relaxed">
            Right now I'm looking for AI/ML engineering, Generative AI, Python or software engineering internships and entry-level roles — where I can keep turning models into reliable products.
          </p>

          {/* 4 Quantified Achievement Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            {PORTFOLIO_DATA.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  y: -4,
                  borderColor: isDark ? "rgba(0, 212, 255, 0.5)" : "rgba(3, 105, 161, 0.55)",
                }}
                className="bg-white dark:bg-[#0D203B] p-5 rounded-xl border border-[#CBD6E6] dark:border-[#203B5B] transition-all shadow-sm dark:shadow-md"
              >
                <span className="block text-3xl font-extrabold text-[#0369A1] dark:text-[#00D4FF] font-mono tabular-nums">
                  {stat.value}
                </span>
                <span className="block text-xs text-[#2B3B52] dark:text-[#B4C3D8] mt-2 leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
