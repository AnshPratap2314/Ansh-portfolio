export interface SkillPreviewInfo {
  name: string;
  category: string;
  projectTitle: string;
  projectId: string;
  role: string;
  description: string;
  codeSnippet?: string;
  metrics?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const SKILL_PREVIEWS: Record<string, SkillPreviewInfo> = {
  "Render Cloud": {
    name: "Render Cloud",
    category: "Cloud & Production CI/CD",
    projectTitle: "MindCare AI & AI Interview Simulator",
    projectId: "mindcare",
    role: "Production Microservice Hosting & Continuous Deployment",
    description: "Deployed containerized FastAPI backends on Render Cloud with automated Git push triggers, isolated environment variable secrets, Docker build caching, and sub-20ms HTTP endpoints.",
    metrics: ["HTTPS / SSL Terminated", "Auto-deploy on GitHub push", "Sub-20ms endpoint latency"],
    liveUrl: "https://mindcare-ai-o1e5.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot"
  },
  "Docker Fundamentals": {
    name: "Docker Fundamentals",
    category: "DevOps & Containerization",
    projectTitle: "MindCare AI Microservice",
    projectId: "mindcare",
    role: "Multi-Stage Docker Packaging",
    description: "Built lightweight, reproducible container images using multi-stage Python 3.11 Alpine/Slim bases, caching pip requirements layers, and running secure non-root processes.",
    metrics: ["Multi-stage Dockerfile", "Pinned dependencies", "Zero environment drift"],
    liveUrl: "https://mindcare-ai-o1e5.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot"
  },
  "Git & GitHub": {
    name: "Git & GitHub",
    category: "Version Control & Collaboration",
    projectTitle: "All Engineering Projects",
    projectId: "mindcare",
    role: "Repository Architecture & CI Automation",
    description: "Structured modular Git workflows with semantic commits, pull request isolation, and public open-source repositories showcasing clean software engineering standards.",
    metrics: ["Active GitHub profile: AnshPratap2314", "Automated GitHub Actions CI", "Deterministic branches"],
    githubUrl: "https://github.com/AnshPratap2314"
  },
  "Uvicorn": {
    name: "Uvicorn",
    category: "Async Server Architecture",
    projectTitle: "MindCare AI & FastAPI Backends",
    projectId: "mindcare",
    role: "Asynchronous ASGI Server Engine",
    description: "Configured Uvicorn ASGI workers running uvloop for non-blocking I/O event loops, concurrency handling across concurrent client chat sessions, and graceful shutdowns.",
    metrics: ["uvloop accelerated", "Non-blocking async I/O", "High concurrent throughput"],
    liveUrl: "https://mindcare-ai-o1e5.onrender.com"
  },
  "VS Code & PyCharm": {
    name: "VS Code & PyCharm",
    category: "Development Environments",
    projectTitle: "Daily Engineering Stack",
    projectId: "mindcare",
    role: "Interactive Debugging & Virtualenvs",
    description: "Leveraged PyCharm and VS Code for strict static type checking with Mypy, live debugging breakpoints, virtual environment isolation (venv/conda), and automated test running.",
    metrics: ["Mypy type linting", "Interactive call stack tracing", "Integrated Pytest test runner"]
  },
  "Pytest (238 suites)": {
    name: "Pytest (238 suites)",
    category: "Quality Assurance & Regression Guard",
    projectTitle: "MindCare AI Safety Suite",
    projectId: "mindcare",
    role: "238 Deterministic Safety Regression Tests",
    description: "Engineered 238 exhaustive automated test suites verifying edge-case inputs, linguistic negation parsing (e.g. 'I am not thinking about ending it' vs affirmative distress), and escalation triggers.",
    metrics: ["238 passing regression tests", "Negation logic coverage", "Zero safety regressions"],
    liveUrl: "https://mindcare-ai-o1e5.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot"
  },
  "FastAPI": {
    name: "FastAPI",
    category: "High-Performance Backend",
    projectTitle: "MindCare AI & Interview OS",
    projectId: "mindcare",
    role: "Asynchronous REST API Endpoints",
    description: "Engineered async routing endpoints with typed dependency injection, Pydantic v2 request/response serialization, CORS middleware, and automatic OpenAPI schema documentation.",
    metrics: ["Sub-18ms p95 latency", "Pydantic v2 validation", "Async non-blocking endpoints"],
    liveUrl: "https://mindcare-ai-o1e5.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot"
  },
  "Python": {
    name: "Python",
    category: "Core Programming Language",
    projectTitle: "Full Portfolio Architecture",
    projectId: "mindcare",
    role: "Core Machine Learning & Backend Logic",
    description: "Primary language used across machine learning pipelines, asynchronous web backends, automated test frameworks, data transformations, and computer vision systems.",
    metrics: ["Python 3.11+", "Type annotated with Pydantic", "Object-oriented and functional patterns"],
    githubUrl: "https://github.com/AnshPratap2314"
  },
  "Scikit-learn": {
    name: "Scikit-learn",
    category: "Machine Learning & NLP",
    projectTitle: "MindCare AI & PCA Face Biometrics",
    projectId: "mindcare",
    role: "Statistical Classifiers & Dimensional Reduction",
    description: "Trained TF-IDF vectorizers, Multinomial Naive Bayes, Logistic Regression for intent detection, and PCA decomposition for facial recognition eigenface projections.",
    metrics: ["Calibrated probability outputs", "TF-IDF n-gram tokenization", "Sub-15ms ML inference"],
    liveUrl: "https://mindcare-ai-o1e5.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot"
  },
  "Google Gemini API": {
    name: "Google Gemini API",
    category: "Generative AI & LLMs",
    projectTitle: "AI Interview Simulator & StudyVerse",
    projectId: "interview",
    role: "Structured LLM Reasoning Engine",
    description: "Integrated Gemini 2.5 Flash with strict JSON schema response validation, role-based system prompts, temperature tuning, and hallucination guardrails for mock evaluations.",
    metrics: ["Structured JSON schema output", "Multi-turn interview dialogue", "Socratic tutoring engine"],
    liveUrl: "https://ai-based-interview-simulator-1.onrender.com",
    githubUrl: "https://github.com/AnshPratap2314/ai-based-interview-simulator"
  },
  "Structured LLM Outputs": {
    name: "Structured LLM Outputs",
    category: "Generative AI & Reliability",
    projectTitle: "AI Interview Simulator",
    projectId: "interview",
    role: "Guaranteed Pydantic JSON Responses",
    description: "Enforced strict output schemas on LLM generations so that evaluation scores, technical critique points, and action items always conform to validated types without JSON parse errors.",
    metrics: ["Zero parse failure SLA", "Type-safe front/backend contract", "Deterministic scoring radar"],
    liveUrl: "https://ai-based-interview-simulator-1.onrender.com"
  },
  "TF-IDF": {
    name: "TF-IDF",
    category: "Natural Language Processing",
    projectTitle: "MindCare AI",
    projectId: "mindcare",
    role: "N-Gram Vocabulary & Feature Extraction",
    description: "Constructed sub-linear TF-IDF term frequency weighting across unigram and bigram lexicons to capture crucial mental health distress keywords with low computational overhead.",
    metrics: ["Sub-8ms tokenization", "Calibrated confidence score", "Negation phrase preserving"],
    liveUrl: "https://mindcare-ai-o1e5.onrender.com"
  },
  "OpenCV": {
    name: "OpenCV",
    category: "Computer Vision",
    projectTitle: "PCA Face Recognition & Aishie",
    projectId: "pca",
    role: "Haar Cascades, Image Preprocessing & Biometrics",
    description: "Implemented real-time face detection with Haar Cascades, image normalization (grayscale, histogram equalization), and biometric facial projection onto eigenface subspace.",
    metrics: ["Real-time 30fps webcam feed", "Eigenface projection matrix", "Biometric authentication"],
    githubUrl: "https://github.com/AnshPratap2314/Implementation-of-PCA-for-face-recognition"
  },
  "MongoDB": {
    name: "MongoDB",
    category: "Database & Document Store",
    projectTitle: "StudyVerse AI",
    projectId: "studyverse",
    role: "Document Chunking & Revision Notebook Persistence",
    description: "Architected MongoDB Atlas document schemas for student study guides, syllabus PDF chunks, interactive quiz scorecards, and session persistence.",
    metrics: ["Atlas Cloud Cluster", "Flexible JSON document schemas", "Fast index lookups"],
    liveUrl: "https://study-verse-ai-eight.vercel.app/",
    githubUrl: "https://github.com/AnshPratap2314/StudyVerse-AI"
  },
  "Pydantic": {
    name: "Pydantic",
    category: "Data Validation & Typing",
    projectTitle: "FastAPI Services & Gemini Schemas",
    projectId: "mindcare",
    role: "Strict Runtime Type Enforcement",
    description: "Used Pydantic v2 BaseModel classes for incoming request payload validation, error message formatting, and LLM structured response verification.",
    metrics: ["Pydantic v2 core in Rust", "Strict schema contracts", "Zero type coercion bugs"]
  },
  "NumPy": {
    name: "NumPy",
    category: "Mathematical Computing",
    projectTitle: "PCA Face Biometrics & Model Matrices",
    projectId: "pca",
    role: "Covariance Matrices & Eigen Decomposition",
    description: "Calculated multi-dimensional covariance matrices, eigenvectors, and eigenvalues for dimensionality reduction from high-res image vectors to compact 50-dimensional latent spaces.",
    metrics: ["Vectorized array operations", "Eigenvalue decomposition", "Zero Python loop overhead"]
  },
  "Pandas": {
    name: "Pandas",
    category: "Data Engineering",
    projectTitle: "Data Pipelines & Training Corpora",
    projectId: "mindcare",
    role: "Corpus Cleaning & Dataset Preparation",
    description: "Preprocessed training text datasets, handled missing values, applied string sanitization transformations, and structured conversational intent labels.",
    metrics: ["DataFrame vector operations", "Categorical label encoding", "Stratified dataset splitting"]
  },
  "Responsive UI Development": {
    name: "Responsive UI Development",
    category: "Frontend Engineering",
    projectTitle: "Portfolio & Web Applications",
    projectId: "studyverse",
    role: "Modern Responsive Web Design",
    description: "Crafted accessible, mobile-first responsive user interfaces with Tailwind CSS, Framer Motion animations, high-contrast dark themes, and zero layout thrashing.",
    metrics: ["100% mobile & desktop responsive", "Hardware-accelerated animations", "Clean typography hierarchy"]
  }
};

export const getSkillPreview = (skillName: string): SkillPreviewInfo => {
  // Direct match
  if (SKILL_PREVIEWS[skillName]) {
    return SKILL_PREVIEWS[skillName];
  }

  // Normalized search
  const cleanName = skillName.toLowerCase();
  for (const [key, value] of Object.entries(SKILL_PREVIEWS)) {
    if (cleanName.includes(key.toLowerCase()) || key.toLowerCase().includes(cleanName)) {
      return value;
    }
  }

  // Fallback default
  return {
    name: skillName,
    category: "Technical Capability",
    projectTitle: "Ansh Pratap's Production Engineering Stack",
    projectId: "mindcare",
    role: "Applied Engineering Competency",
    description: `Applied ${skillName} in production-ready software architectures, combining machine learning algorithms, asynchronous backend endpoints, and strict testing discipline.`,
    metrics: ["Verified in codebase", "Production-tested", "Modern industry standards"],
    githubUrl: "https://github.com/AnshPratap2314"
  };
};
