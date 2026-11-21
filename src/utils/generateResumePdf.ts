import { jsPDF } from "jspdf";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const generateAndDownloadResumePdf = (): void => {
  const { profile, experience, projects } = PORTFOLIO_DATA;
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

  const drawSectionHeader = (title: string) => {
    checkPageBreak(12);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(14, 73, 133);
    doc.text(title.toUpperCase(), margin, y);

    y += 1.5;
    doc.setDrawColor(200, 215, 230);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + contentWidth, y);
    y += 4;
  };

  // 1. Header Block
  doc.setFillColor(8, 26, 52);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(255, 255, 255);
  doc.text(profile.name.toUpperCase(), margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(0, 212, 255);
  doc.text("Final-Year B.Tech CSE | AI/ML & Generative AI | Python, FastAPI, LLM Applications", margin, 17.5);

  doc.setFontSize(8);
  doc.setTextColor(215, 230, 245);
  doc.text(`+91 9520458452  |  ${profile.email}  |  ${profile.location}  |  github.com/AnshPratap2314`, margin, 23);

  y = 33;

  // 2. Professional Summary
  drawSectionHeader("Professional Summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(40, 45, 55);
  const bioLines = doc.splitTextToSize(
    "Final-year B.Tech Computer Science and Engineering student (expected graduation 2027) with practical AI/ML and Generative AI experience gained through a 3-month AI internship, an AI & ML industrial training program, and a current AI data operations internship. Builds and deploys Python and FastAPI applications that integrate LLMs through the Google Gemini API, with structured-output prompt design. Has developed machine learning models using TF-IDF and Logistic Regression and built an OpenCV-based face recognition system.",
    contentWidth
  );
  doc.text(bioLines, margin, y);
  y += bioLines.length * 4 + 2;

  // 3. Technical Skills
  drawSectionHeader("Technical Skills");
  const skillCategories = [
    { label: "Programming Languages", value: "Python, JavaScript, C, C++, SQL, HTML, CSS" },
    { label: "AI/ML & Data Science", value: "Machine Learning, NLP, Scikit-learn, TF-IDF, Logistic Regression, Text Classification, SVM, KNN, Decision Trees, Neural Networks, Computer Vision, OpenCV, Keras, NumPy, Pandas" },
    { label: "Generative AI & LLMs", value: "Google Gemini API, Google GenAI SDK, LLM Integration, Prompt Engineering, Structured Output Handling, RAG (Fundamentals)" },
    { label: "Backend & API Engineering", value: "FastAPI, REST API Development, Node.js, Express.js, Pydantic, Input Validation, Session Management, API Security & Documentation" },
    { label: "AI Engineering", value: "AI/ML Integration, API Development" },
    { label: "Databases", value: "SQLite, MongoDB, Mongoose" },
    { label: "Testing, Deployment & Tools", value: "Pytest, Node.js Test Runner, Git, GitHub, Uvicorn, Render, Docker (basic configuration), VS Code" }
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

  // 4. Internship Experience
  drawSectionHeader("Internship Experience");
  experience.forEach((exp) => {
    checkPageBreak(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(20, 25, 35);
    const titleStr = `${exp.role} | ${exp.company}`;
    doc.text(titleStr, margin, y);

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

  // 5. Selected Projects
  drawSectionHeader("Selected Projects");
  projects.filter((p) => p.id !== "pca").forEach((p) => {
    checkPageBreak(16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 25, 35);
    doc.text(p.title, margin, y);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 110, 125);
    doc.text(`— ${p.subtitle}`, margin + doc.getTextWidth(p.title) + 2, y);

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
    doc.text(`Tech: ${p.tags.join(", ")}`, margin, y);
    y += 5;
  });

  // 6. Education
  drawSectionHeader("Education");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 25, 35);
  doc.text("B.Tech, Computer Science and Engineering | Mewar University, Chittorgarh, Rajasthan", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(90, 100, 115);
  const eduDates = "2023 – 2027 (Expected)";
  doc.text(eduDates, margin + contentWidth - doc.getTextWidth(eduDates), y);
  y += 5;

  // 7. Certifications
  drawSectionHeader("Certifications");
  const certItems = [
    { title: "Google AI Essentials | Google (Coursera)", date: "Aug 2026" },
    { title: "Google Prompting Essentials | Google (Coursera)", date: "Sep 2026" },
    { title: "Artificial Intelligence Fundamentals | IBM SkillsBuild", date: "Oct 2026" },
    { title: "Data Science & Analytics | HP LIFE", date: "Sep 2025" },
  ];
  certItems.forEach((c) => {
    checkPageBreak(5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(25, 30, 40);
    doc.text(c.title, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(90, 100, 115);
    doc.text(c.date, margin + contentWidth - doc.getTextWidth(c.date), y);
    y += 4;
  });

  doc.save("Ansh_Pratap_Resume.pdf");
};
