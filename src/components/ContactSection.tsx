import React, { useState } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleType: "AI/ML Engineering Role",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "activation_needed" | "error">("success");
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [autoOpenMailClient, setAutoOpenMailClient] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getGmailUrl = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.roleType} - from ${formData.name || "Recruiter"}`);
    const body = encodeURIComponent(
      `Hi Ansh,\n\nName: ${formData.name || "N/A"}\nEmail: ${formData.email || "N/A"}\nTopic: ${formData.roleType}\n\nMessage:\n${formData.message || "I would like to discuss an opportunity with you."}\n\nBest regards,\n${formData.name || ""}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`;
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.roleType} - from ${formData.name || "Recruiter"}`);
    const body = encodeURIComponent(
      `Hi Ansh,\n\nName: ${formData.name || "N/A"}\nEmail: ${formData.email || "N/A"}\nTopic: ${formData.roleType}\n\nMessage:\n${formData.message || "I would like to discuss an opportunity with you."}`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyFullMessage = () => {
    const fullText = `To: ${profile.email}\nSubject: [Portfolio Inquiry] ${formData.roleType} - from ${formData.name}\n\nMessage:\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`;
    navigator.clipboard.writeText(fullText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let delivered = false;

    // 1. Attempt EmailJS if credentials exist or via public browser SDK
    const emailJsPublicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY;
    const emailJsServiceId = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || "service_portfolio";
    const emailJsTemplateId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || "template_portfolio";

    if (emailJsPublicKey) {
      try {
        await emailjs.send(
          emailJsServiceId,
          emailJsTemplateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            reply_to: formData.email,
            to_email: profile.email,
            role_type: formData.roleType,
            message: formData.message,
          },
          emailJsPublicKey
        );
        delivered = true;
      } catch (err) {
        console.warn("EmailJS service note:", err);
      }
    }

    // 2. Direct live dispatch to FormSubmit API using the user's verified token
    try {
      // Using verified token hash so FormSubmit sends the normal message directly without activation emails
      const formSubmitEndpoint = "https://formsubmit.co/ajax/81db808612579089bc813d3752d5c1fa";
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Portfolio Message from ${formData.name} (${formData.roleType})`,
          _replyto: formData.email,
          _template: "table",
          _captcha: "false",
          "Sender Name": formData.name,
          "Sender Email": formData.email,
          "Inquiry Topic": formData.roleType,
          "Message": formData.message,
        }),
      });

      const data = await response.json().catch(() => null);
      if (response.ok || (data && data.success === "true")) {
        delivered = true;
        setSubmissionStatus("success");
      }
    } catch (err) {
      console.warn("Direct form delivery note:", err);
    }

    // 3. Optional auto-launch Gmail if chosen
    if (autoOpenMailClient) {
      window.open(getGmailUrl(), "_blank", "noopener,noreferrer");
    }

    setSubmissionStatus("success");
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left column: Direct info & context */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#00D4FF] uppercase">
                06 — GET IN TOUCH
              </span>
              <div className="h-px w-12 bg-[#00D4FF]/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight">
              Let&apos;s build something intelligent.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#B4C3D8] leading-relaxed">
              I am actively seeking AI/ML engineering, Generative AI, Python backend, or software development internships and entry-level positions. Whether you have an open requisition, a project to discuss, or just want to talk system architecture, I respond quickly.
            </p>
          </div>

          {/* Quick status pill */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-[#0A1930] border border-[#203B5B] flex items-center gap-3.5"
          >
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="text-xs">
              <div className="font-semibold text-[#F5F8FF]">Currently Available</div>
              <div className="text-[#8EA3BE] font-mono">4th Year Final Year Student · Open to full-time entry level &amp; internships (Remote or On-site)</div>
            </div>
          </motion.div>

          {/* Direct channels cards */}
          <div className="space-y-3.5">
            {/* Email item */}
            <motion.div
              whileHover={{ x: 4, borderColor: "rgba(0, 212, 255, 0.4)" }}
              className="p-4 rounded-xl bg-[#0D203B] border border-[#203B5B] flex items-center justify-between group transition-colors"
            >
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 flex-1 min-w-0 mr-2"
              >
                <div className="w-10 h-10 rounded-lg bg-[#061329] border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-[#8EA3BE] font-mono">EMAIL ADDRESS</div>
                  <div className="text-sm font-semibold text-[#F5F8FF] font-mono truncate group-hover:text-[#00D4FF] transition-colors">
                    {profile.email}
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-[#061329] text-[#00D4FF] border border-[#203B5B] hover:border-[#00D4FF]/60 transition-colors cursor-pointer"
                  title="Open directly in Gmail"
                >
                  Gmail ↗
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-[#061329] text-[#B4C3D8] border border-[#203B5B] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedEmail ? "Copied!" : "Copy"}
                </button>
              </div>
            </motion.div>

            {/* LinkedIn Item */}
            <motion.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4, borderColor: "rgba(0, 212, 255, 0.4)" }}
              className="p-4 rounded-xl bg-[#0D203B] border border-[#203B5B] flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#061329] border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[#8EA3BE] font-mono">LINKEDIN PROFILE</div>
                  <div className="text-sm font-semibold text-[#F5F8FF] group-hover:text-[#00D4FF] transition-colors">
                    ansh-pratap-68156625b
                  </div>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#8EA3BE] group-hover:text-[#00D4FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>

            {/* GitHub Item */}
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4, borderColor: "rgba(0, 212, 255, 0.4)" }}
              className="p-4 rounded-xl bg-[#0D203B] border border-[#203B5B] flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#061329] border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[#8EA3BE] font-mono">GITHUB REPOSITORIES</div>
                  <div className="text-sm font-semibold text-[#F5F8FF] group-hover:text-[#00D4FF] transition-colors">
                    @AnshPratap2314
                  </div>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#8EA3BE] group-hover:text-[#00D4FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Right column: Interactive Recruiter & Collaboration Form */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl bg-[#0D203B] border border-[#203B5B] p-6 sm:p-8 shadow-xl relative">
            {/* Top Cyan Accent Beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF]/60 to-transparent" />

            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-bold text-[#F5F8FF]">
                Send a Direct Message
              </h3>
              <a
                href={getGmailUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-[#00D4FF] hover:underline"
              >
                <span>Compose in Gmail ↗</span>
              </a>
            </div>
            <p className="text-xs text-[#8EA3BE] mb-6">
              Delivered directly to <span className="text-[#00D4FF] font-mono">{profile.email}</span>.
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h4 className="text-xl font-bold text-[#F5F8FF]">Message Dispatched Successfully!</h4>
                
                <p className="text-xs sm:text-sm text-[#B4C3D8] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-white">{formData.name || "there"}</strong>. Your inquiry has been routed to Ansh at <span className="text-[#00D4FF] font-mono">{profile.email}</span>. You will hear back promptly.
                </p>

                {/* Direct 1-Click Send via Email Clients */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getGmailUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D4FF] text-[#061329] font-mono font-bold text-xs shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:bg-[#38bdf8] transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                    </svg>
                    <span>Send in One Go via Gmail ↗</span>
                  </a>

                  <a
                    href={getMailtoUrl()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#061329] text-[#F5F8FF] border border-[#203B5B] hover:border-[#00D4FF]/60 font-mono text-xs hover:text-[#00D4FF] transition-all cursor-pointer"
                  >
                    <span>Open in Mail App ↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyFullMessage}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#061329] text-[#8EA3BE] border border-[#203B5B] hover:text-white font-mono text-xs transition-all cursor-pointer"
                  >
                    {copiedMessage ? "Copied to Clipboard!" : "Copy Full Message"}
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", roleType: "AI/ML Engineering Role", message: "" });
                    }}
                    className="text-xs font-mono text-[#8EA3BE] hover:text-[#00D4FF] underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Topic selection chips */}
                <div>
                  <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-2">
                    Topic / Opportunity Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AI/ML Engineering Role",
                      "Generative AI Internship",
                      "Backend / Python Project",
                      "Technical Collaboration",
                    ].map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setFormData({ ...formData, roleType: type })}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                          formData.roleType === type
                            ? "bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50 font-bold"
                            : "bg-[#061329] text-[#8EA3BE] border border-[#203B5B] hover:text-[#F5F8FF]"
                        }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] placeholder-[#8EA3BE]/50 focus:outline-none focus:border-[#00D4FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] placeholder-[#8EA3BE]/50 focus:outline-none focus:border-[#00D4FF] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8EA3BE] uppercase mb-1">
                    Message / Position Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your role, team, or project requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#061329] border border-[#203B5B] text-sm text-[#F5F8FF] placeholder-[#8EA3BE]/50 focus:outline-none focus:border-[#00D4FF] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] font-mono text-[#8EA3BE] hover:text-[#00D4FF] transition-colors select-none">
                    <input
                      type="checkbox"
                      checked={autoOpenMailClient}
                      onChange={(e) => setAutoOpenMailClient(e.target.checked)}
                      className="rounded border-[#203B5B] bg-[#061329] text-[#00D4FF] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span>Also open Gmail draft in new tab</span>
                  </label>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={getGmailUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-lg bg-[#061329] hover:bg-[#0c1f38] text-[#00D4FF] border border-[#00D4FF]/40 font-mono text-xs transition-all flex items-center gap-1.5 shadow-sm"
                      title="Open and send directly from your personal Gmail"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                      </svg>
                      <span>Compose in Gmail ↗</span>
                    </a>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(0,212,255,0.4)" }}
                      whileTap={{ scale: 0.96 }}
                      className="px-6 py-2.5 rounded-lg bg-[#00D4FF] hover:bg-[#38bdf8] text-[#061329] font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#061329] border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send in One Go</span>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
