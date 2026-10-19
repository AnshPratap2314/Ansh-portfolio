import { jsPDF } from "jspdf";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const generateAndDownloadResumePdf = (): void => {
  const { profile, experience, projects, certifications } = PORTFOLIO_DATA;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Section Heading Helper
  const drawSectionHeader = (title: string) => {
    checkPageBreak(12);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(14, 73, 133); // Executive navy/slate
    doc.text(title.toUpperCase(), margin, y);

    y += 1.5;
    doc.setDrawColor(200, 215, 230);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + contentWidth, y);
    y += 4;
  };

  // 1. Header Block (Top Name & Title)
  doc.setFillColor(8, 26, 52); // Dark navy banner
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(255, 255, 255);
  doc.text(profile.name.toUpperCase(), margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(0, 212, 255); // Cyan subtitle
  doc.text("AI/ML & Generative AI Developer · Final Year B.Tech CSE (Expected 2027)", margin, 17.5);

  doc.setFontSize(8);
  doc.setTextColor(215, 230, 245);
  doc.text(`${profile.email}  |  ${profile.location}  |  github.com/AnshPratap2314`, margin, 23);

  y = 33;

  // 2. Summary
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(40, 45, 55);
  const bioLines = doc.splitTextToSize(
    "Final-year Computer Science & Engineering student specializing in AI/ML, Generative AI systems, and Python backend engineering. Experienced in engineering deterministic NLP safety layers, structured Google Gemini API integrations, asynchronous FastAPI services, and 238-suite automated Pytest regression frameworks.",
    contentWidth
  );
  doc.text(bioLines, margin, y);
  y += bioLines.length * 4 + 2;

  // 3. Education
  drawSectionHeader("Education");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 25, 35);
  doc.text(profile.education.institution, margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(70, 80, 95);
  const gradText = `Expected Graduation: ${profile.education.expectedGraduation}  |  CGPA: ${profile.education.cgpa}`;
  const gradTextWidth = doc.getTextWidth(gradText);
  doc.text(gradText, margin + contentWidth - gradTextWidth, y);

  y += 4;
  doc.setFont("helvetica", "italic");
  doc.setTextColor(40, 100, 160);
  doc.text(`${profile.education.degree} (${profile.education.accreditation})`, margin, y);

  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 80, 95);
  const curLines = doc.splitTextToSize(`Core Coursework: ${profile.education.curriculum}`, contentWidth);
  doc.text(curLines, margin, y);
  y += curLines.length * 3.8 + 2;

  // 4. Technical Competencies
  drawSectionHeader("Core Technical Competencies");
  const skillCategories = [
    { label: "Machine Learning & AI", value: "Scikit-learn, NumPy, Pandas, TF-IDF Vectorization, Logistic Regression, OpenCV, NLP" },
    { label: "Generative AI & LLMs", value: "Google Gemini API, Structured Pydantic JSON Schemas, Multi-Turn Prompting, RAG" },
    { label: "Backend Engineering", value: "Python 3.11/3.12, FastAPI, Asyncio, RESTful APIs, Node.js, Express.js, MongoDB, SQLite" },
    { label: "Quality & Testing", value: "Pytest (238 automated regression test suites), Git & GitHub, Docker Fundamentals, Render Cloud" }
  ];

  skillCategories.forEach((sc) => {
    checkPageBreak(6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(25, 30, 40);
    const prefix = `${sc.label}: `;
    doc.text(prefix, margin, y);
    const prefixW = doc.getTextWidth(prefix);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 70, 80);
    const skillLines = doc.splitTextToSize(sc.value, contentWidth - prefixW);
    doc.text(skillLines, margin + prefixW, y);
    y += Math.max(4.5, skillLines.length * 4);
  });

  // 5. Work Experience
  drawSectionHeader("Industry Experience & Internships");
  experience.forEach((exp) => {
    checkPageBreak(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 25, 35);
    doc.text(exp.role, margin, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(14, 73, 133);
    const companyText = `@ ${exp.company} (${exp.location})`;
    doc.text(companyText, margin + doc.getTextWidth(exp.role) + 2, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(90, 100, 115);
    const dateWidth = doc.getTextWidth(exp.period);
    doc.text(exp.period, margin + contentWidth - dateWidth, y);

    y += 4;
    exp.bullets.forEach((b) => {
      checkPageBreak(6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      doc.setTextColor(50, 60, 70);
      doc.text("•", margin + 1.5, y);
      const bLines = doc.splitTextToSize(b, contentWidth - 5);
      doc.text(bLines, margin + 5, y);
      y += bLines.length * 3.8 + 0.5;
    });
    y += 2;
  });

  // 6. Featured Engineering Projects
  drawSectionHeader("Featured Engineering Projects");
  projects.slice(0, 3).forEach((p) => {
    checkPageBreak(16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 25, 35);
    doc.text(p.title, margin, y);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 110, 125);
    doc.text(`— ${p.subtitle}`, margin + doc.getTextWidth(p.title) + 2, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(14, 73, 133);
    const ghText = "Code: " + p.githubUrl.replace("https://", "");
    const ghW = doc.getTextWidth(ghText);
    doc.text(ghText, margin + contentWidth - ghW, y);

    y += 3.8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor(50, 60, 70);
    const descLines = doc.splitTextToSize(p.approach || p.description, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 3.8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(90, 105, 125);
    doc.text(`Tech Stack: ${p.tags.join(" • ")}`, margin, y);
    y += 5;
  });

  // 7. Certifications
  drawSectionHeader("Verified Credentials & Certifications");
  const certItems = certifications.slice(0, 5);
  certItems.forEach((c) => {
    checkPageBreak(5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(25, 30, 40);
    doc.text(`• ${c.title}`, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(14, 73, 133);
    const issuerYear = `${c.issuer} (${c.year || "2026"})`;
    const iyW = doc.getTextWidth(issuerYear);
    doc.text(issuerYear, margin + contentWidth - iyW, y);
    y += 4;
  });

  // Footer metadata on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(150, 160, 175);
    doc.text(
      `Ansh Pratap — Engineering Resume  |  Page ${i} of ${totalPages}`,
      margin,
      pageHeight - 6
    );
    const dateStr = "Updated 2026";
    doc.text(dateStr, margin + contentWidth - doc.getTextWidth(dateStr), pageHeight - 6);
  }

  // Trigger browser download
  doc.save("Ansh_Pratap_Resume.pdf");
};
