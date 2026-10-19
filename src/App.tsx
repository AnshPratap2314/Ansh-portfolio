/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TechTicker } from "./components/TechTicker";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceEducationSection } from "./components/ExperienceEducationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { InteractiveDemoModal } from "./components/InteractiveDemoModal";
import { ResumeModal } from "./components/ResumeModal";
import { SkillPreviewModal } from "./components/SkillPreviewModal";
import { fastScrollTo } from "./utils/scrollHelper";

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [selectedSkillPreview, setSelectedSkillPreview] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleOpenContact = () => {
    fastScrollTo("contact");
  };

  return (
    <div className="min-h-screen bg-[#061329] text-[#F5F8FF] selection:bg-[#00D4FF]/30 selection:text-[#00D4FF] relative overflow-x-hidden font-sans">
      {/* Background GPU-accelerated radial ambient lights (Zero frame drop) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,85,255,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <TechTicker />
          <AboutSection />
          <SkillsSection onOpenSkillPreview={(name) => setSelectedSkillPreview(name)} />
          <ProjectsSection
            onOpenCaseStudy={(id) => setSelectedCaseStudy(id)}
            onOpenDemo={(id) => setSelectedDemo(id)}
            onOpenSkillPreview={(name) => setSelectedSkillPreview(name)}
          />
          <ExperienceEducationSection onOpenSkillPreview={(name) => setSelectedSkillPreview(name)} />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onOpenResume={() => setIsResumeOpen(true)} />

        {/* Modals */}
        <CaseStudyModal
          projectId={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onOpenDemo={(id) => {
            setSelectedCaseStudy(null);
            setSelectedDemo(id);
          }}
        />

        <InteractiveDemoModal
          projectId={selectedDemo}
          onClose={() => setSelectedDemo(null)}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        <SkillPreviewModal
          skillName={selectedSkillPreview}
          onClose={() => setSelectedSkillPreview(null)}
          onOpenDemo={(id) => {
            setSelectedSkillPreview(null);
            setSelectedDemo(id);
          }}
        />
      </div>
    </div>
  );
}
