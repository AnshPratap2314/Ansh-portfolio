import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { InteractiveSkillTag } from "./InteractiveSkillTag";

interface ExperienceEducationSectionProps {
  onOpenSkillPreview?: (skillName: string) => void;
}

export const ExperienceEducationSection: React.FC<ExperienceEducationSectionProps> = ({ onOpenSkillPreview }) => {
  const { experience, profile, achievements, certifications, beyondClassroom } = PORTFOLIO_DATA;

  return (
    <div id="experience" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 border-b border-[#203B5B]/50 tech-grid-bg relative overflow-hidden">
      {/* 04 — EXPERIENCE SECTION */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#00D4FF] uppercase">
              04 — INDUSTRY EXPERIENCE &amp; INTERNSHIPS
            </span>
            <div className="h-px w-12 bg-[#00D4FF]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight mb-2">
            Work History &amp; Applied Engineering.
          </h2>
          <p className="text-sm sm:text-base text-[#B4C3D8] max-w-2xl">
            From optimizing Python data pipelines to prototyping computer vision models under government-supervised industrial training.
          </p>
        </motion.div>

        {/* Animated Connected Timeline */}
        <div className="relative ml-2 sm:ml-6 space-y-12">
          {/* Continuous Animated Vertical Connector Cable */}
          <div className="absolute left-[15px] sm:left-[21px] top-4 bottom-4 w-0.5 pointer-events-none">
            <svg className="h-full w-2" preserveAspectRatio="none" viewBox="0 0 2 100">
              <line
                x1="1" y1="0" x2="1" y2="100"
                stroke="#00D4FF"
                strokeWidth="2"
                strokeDasharray="4 3"
                className="animate-cable-flow"
              />
            </svg>
          </div>

          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex items-start gap-4 sm:gap-8 group"
            >
              {/* Connector Node & Branch Line */}
              <div className="relative z-10 flex flex-col items-center shrink-0 pt-2">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#061329] border-2 border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center justify-center group-hover:scale-110 group-hover:border-[#38bdf8] transition-all">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#00D4FF] animate-pulse-dot" />
                </div>
              </div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(0, 212, 255, 0.5)" }}
                className="flex-1 rounded-2xl bg-[#0D203B]/90 border border-[#203B5B] p-6 sm:p-7 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(0,212,255,0.08)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#F5F8FF]">
                        {item.role}
                      </h3>
                      {item.isRecent && (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
                          RECENT ENGAGEMENT
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-[#00D4FF] flex items-center gap-2 mt-1 font-mono">
                      <span>{item.company}</span>
                      <span className="text-[#8EA3BE]">·</span>
                      <span className="text-xs text-[#8EA3BE]">{item.location}</span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#00D4FF] bg-[#061329] px-3.5 py-1.5 rounded-lg border border-[#203B5B] self-start sm:self-auto shadow-inner">
                    {item.period}
                  </span>
                </div>

                <ul className="space-y-2.5 mt-4 text-xs sm:text-sm text-[#B4C3D8]">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-[#00D4FF] mt-1 shrink-0 font-bold">▹</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2.5 mt-6 pt-4 border-t border-[#203B5B]/50 pb-2">
                  {item.tags.map((tag, tIdx) => (
                    <InteractiveSkillTag
                      key={tIdx}
                      name={tag}
                      onPreview={onOpenSkillPreview}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 05 — EDUCATION & CREDENTIALS SECTION */}
      <div id="education">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#00D4FF] uppercase">
              05 — EDUCATION &amp; CREDENTIALS
            </span>
            <div className="h-px w-12 bg-[#00D4FF]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight mb-2">
            Academic Foundation &amp; Certifications.
          </h2>
          <p className="text-sm sm:text-base text-[#B4C3D8] max-w-2xl">
            Formal engineering coursework combined with industry certifications from Google, IBM, HP LIFE, and NVIDIA.
          </p>
        </motion.div>

        {/* Education Highlight Card with Tech Gradients */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ borderColor: "rgba(0, 212, 255, 0.5)" }}
          className="rounded-2xl bg-gradient-to-r from-[#0D203B] via-[#0B1E37] to-[#08182D] border border-[#203B5B] p-6 sm:p-8 mb-12 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,255,0.12),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30">
                  UNDERGRADUATE DEGREE
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#061329] text-[#8EA3BE] border border-[#203B5B]">
                  {profile.education.accreditation}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#F5F8FF]">
                  {profile.education.degree}
                </h3>
                <p className="text-base font-semibold text-[#00D4FF] mt-1">
                  {profile.education.institution}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#B4C3D8] leading-relaxed">
                {profile.education.curriculum}
              </p>

              <div className="text-[11px] font-mono text-[#8EA3BE] pt-2">
                Note: {profile.education.note}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between p-5 rounded-xl bg-[#061329]/90 border border-[#203B5B] shadow-inner">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-[#8EA3BE] uppercase">Cumulative GPA</span>
                  <div className="text-3xl font-extrabold text-[#00D4FF] font-mono mt-0.5">
                    {profile.education.cgpa}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-[#8EA3BE] uppercase">Expected Graduation</span>
                  <div className="text-xl font-bold text-[#F5F8FF] font-mono mt-0.5">
                    {profile.education.expectedGraduation}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-[#8EA3BE] uppercase">Current Standing</span>
                  <div className="text-sm font-semibold text-[#F5F8FF] mt-0.5">
                    {profile.education.status}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#203B5B]/60 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Enrolled &amp; Active Student</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications & Badges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Industry Achievements & Developer Program Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-[#0D203B]/80 border border-[#203B5B] p-6 space-y-4 shadow-lg"
          >
            <h3 className="font-mono text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>Developer Program Recognitions</span>
            </h3>

            <div className="space-y-3">
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 4, borderColor: "rgba(0, 212, 255, 0.4)" }}
                  className="p-4 rounded-lg bg-[#061329] border border-[#203B5B] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-[#00D4FF] font-semibold">{ach.issuer}</span>
                    <span className="font-mono text-[10px] text-[#8EA3BE]">{ach.year}</span>
                  </div>
                  <div className="text-sm font-bold text-[#F5F8FF]">{ach.title}</div>
                  <p className="text-xs text-[#8EA3BE] mt-1">{ach.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl bg-[#0D203B]/80 border border-[#203B5B] p-6 space-y-4 shadow-lg"
          >
            <h3 className="font-mono text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Certified Coursework</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2, borderColor: "rgba(0, 212, 255, 0.4)" }}
                  className="p-3.5 rounded-lg bg-[#061329] border border-[#203B5B] flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#00D4FF] mb-1">
                      <span>{cert.issuer}</span>
                      {cert.year && <span className="text-[#8EA3BE]">{cert.year}</span>}
                    </div>
                    <div className="text-xs font-bold text-[#F5F8FF] leading-snug">{cert.title}</div>
                    <p className="text-[11px] text-[#8EA3BE] mt-1 line-clamp-2">{cert.description}</p>
                  </div>
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 pt-2 border-t border-[#203B5B]/60 text-[10px] font-mono text-[#00D4FF] hover:text-[#38bdf8] flex items-center justify-between group/cert"
                    >
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Verified Credential
                      </span>
                      <span className="text-[10px] text-[#00D4FF] font-bold underline group-hover/cert:text-[#F5F8FF] flex items-center gap-0.5">
                        {cert.issuer.includes("COURSERA")
                          ? "Verify on Coursera ↗"
                          : cert.issuer.includes("IBM")
                          ? "Verify on IBM ↗"
                          : cert.issuer.includes("HP")
                          ? "Verify on HP LIFE ↗"
                          : "Verify Credential ↗"}
                      </span>
                    </a>
                  ) : cert.isLinked ? (
                    <div className="mt-2 pt-2 border-t border-[#203B5B]/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span>✓ Verified Credential</span>
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BEYOND THE CLASSROOM SECTION
            IMPORTANT REQUIREMENT FROM USER:
            "just remove certificate image in the beyond the classroom section left only mention and keep text"
            NO CERTIFICATE IMAGES HERE! Only clean mention, badges, and all textual content preserved.
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#09182D] border border-[#203B5B] p-6 sm:p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#00D4FF] uppercase">
                  LEADERSHIP &amp; COMMUNITY
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F8FF]">
                Beyond the Classroom
              </h3>
              <p className="text-xs sm:text-sm text-[#8EA3BE] mt-1">
                Co-curricular engagement, university leadership roles, and technical club coordination.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beyondClassroom.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, borderColor: "rgba(0, 212, 255, 0.4)" }}
                className="rounded-xl bg-[#0D203B] border border-[#203B5B] p-6 transition-all flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Badge & Trophy Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30 tracking-wide uppercase">
                      {item.badge}
                    </span>
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>

                  {/* Title and Organization */}
                  <h4 className="text-lg font-bold text-[#F5F8FF] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs font-medium text-[#00D4FF] mb-3 font-mono">
                    {item.subtitle}
                  </p>

                  {/* Full Textual Description (Preserved, strictly no certificate images) */}
                  <p className="text-xs sm:text-sm text-[#B4C3D8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#203B5B]/50 flex items-center justify-between text-[11px] font-mono text-[#8EA3BE]">
                  <span>Status: Officially Appreciated</span>
                  <span className="text-emerald-400">Institutional Record</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
