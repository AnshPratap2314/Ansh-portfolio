import interviewSimImg from '../assets/images/interview_sim_live.png';
import studyverseImg from '../assets/images/studyverse_live.png';
import aishieImg from '../assets/images/aishie_voice_preview.jpg';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  description: string;
  approach: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  isFlagship?: boolean;
}

export interface CaseStudySection {
  heading: string;
  body: string;
  highlights?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  architectureDetails: string;
  sections: CaseStudySection[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  isRecent?: boolean;
  role: string;
  company: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export interface SkillItem {
  name: string;
  percentage?: number;
  highlight?: boolean;
  bold?: boolean;
}

export interface SkillGroup {
  title: string;
  isFullWidth?: boolean;
  description?: string;
  items: SkillItem[];
  footer?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
  description: string;
  isLinked?: boolean;
  verifyUrl?: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Ansh Pratap",
    title: "AI · ML DEVELOPER",
    headline: "Building Intelligent Software.",
    subheadline: "Turning AI into real applications.",
    availability: "OPEN TO AI/ML INTERNSHIPS & ENTRY-LEVEL ROLES",
    tracks: "AI/ML · GENERATIVE AI · SOFTWARE ENGINEERING",
    bio: "I'm Ansh Pratap, a 4th-year (final year) Computer Science and Engineering student focused on AI/ML, Generative AI and backend development. I build practical AI-powered applications using Python, machine learning, APIs and LLM integrations.",
    extendedBio: [
      "I'm a 4th-year (final year) Computer Science and Engineering student at Mewar University, Rajasthan. My work sits where machine learning meets real software: I train NLP classifiers, wire them into FastAPI backends, and ship them as applications people can actually open in a browser.",
      "That shows up in the things I've built — MindCare AI, a safety-first mental-health NLP platform with an independent risk layer and 238 passing regression tests; an AI Interview Simulator that evaluates answers through strictly structured Gemini outputs; and Aishie, a local-first voice and face-recognition desktop assistant. I care about the unglamorous parts too: input validation, session management, tests and deployment.",
      "Right now I'm looking for AI/ML engineering, Generative AI, Python or software engineering internships and entry-level roles — where I can keep turning models into reliable products."
    ],
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxQCvEyw4C9_qTZw1rAN_uxGeaVVNs5WXSn_hR0WW1wVDjCcVX3Vn5YLtwIJ4_kYih9niEny7x1QwVk50mgGrKdQatqLwU_KT8FDwt3VB8TD5Kt-RINIM6D5uB4szQfIKeeTSvwLTm5aNDByNDf1-mMaCtTvhiBHaFx-jXkkN0EvekIxBWc750SU0i86tfes2xGPnOr7UgYUBcQQkWGi5PMx-Zdxmzg6jjKdFBcGYS13H-ySSRFwk_jhZyfRSV434KRqk",
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Mewar University, Chittorgarh, Rajasthan",
      expectedGraduation: "2027",
      cgpa: "7.8 / 10",
      status: "4th Year Undergraduate (Final Year Student)",
      accreditation: "NAAC 'A' Grade University",
      curriculum:
        "Curriculum focused on algorithms, data structures, operating systems, database management systems, artificial intelligence, discrete mathematics, and computer networks.",
      note: "Per latest academic record — subject to confirmation"
    },
    location: "Chittorgarh, Rajasthan, India",
    email: "shakyaansh9756@gmail.com",
    githubUrl: "https://github.com/AnshPratap2314",
    linkedinUrl: "https://linkedin.com/in/ansh-pratap-68156625b"
  },

  stats: [
    {
      value: "238",
      label: "pytest tests in MindCare AI's regression suite"
    },
    {
      value: "5",
      label: "featured builds — 10 public repositories on GitHub"
    },
    {
      value: "3",
      label: "internships & industry training programs"
    },
    {
      value: "4th Yr",
      label: "Final Year B.Tech CSE, Mewar University"
    }
  ],

  tickerItems: [
    "FASTAPI BACKENDS",
    "NLP CLASSIFICATION",
    "COMPUTER VISION",
    "SCIKIT-LEARN",
    "PROMPT ENGINEERING",
    "PYTHON 3.12",
    "GEMINI API"
  ],

  skills: [
    {
      title: "AI & Machine Learning",
      items: [
        { name: "Scikit-learn" },
        { name: "NumPy" },
        { name: "Pandas" },
        { name: "TF-IDF", highlight: true },
        { name: "Logistic Regression" },
        { name: "NLP" },
        { name: "Text Classification" },
        { name: "Computer Vision" },
        { name: "OpenCV", highlight: true },
        { name: "Keras" }
      ],
      footer: "Shipped in MindCare AI & PCA"
    },
    {
      title: "Generative AI",
      items: [
        { name: "Google Gemini API", highlight: true },
        { name: "LLM Integration" },
        { name: "Prompt Engineering" },
        { name: "Structured LLM Outputs", highlight: true },
        { name: "RAG Fundamentals" }
      ],
      footer: "Shipped in AI Interview OS & StudyVerse"
    },
    {
      title: "Programming",
      items: [
        { name: "Python", highlight: true },
        { name: "C" },
        { name: "C++" },
        { name: "JavaScript" },
        { name: "SQL" }
      ],
      footer: "Core engineering fundamentals"
    },
    {
      title: "Backend",
      items: [
        { name: "FastAPI", highlight: true },
        { name: "REST APIs" },
        { name: "Pydantic", highlight: true },
        { name: "Node.js" },
        { name: "Express.js" }
      ],
      footer: "High throughput, typed schemas"
    },
    {
      title: "Databases",
      items: [
        { name: "SQLite" },
        { name: "MongoDB", highlight: true },
        { name: "Mongoose" },
        { name: "MySQL" }
      ],
      footer: "Session storage & vector/document docs"
    },
    {
      title: "Web",
      items: [
        { name: "Responsive UI Development", highlight: true },
        { name: "HTML5" },
        { name: "CSS3 & Tailwind" },
        { name: "JavaScript" }
      ],
      footer: "Production interface styling"
    },
    {
      title: "Testing & Tools",
      isFullWidth: true,
      description:
        "Rigorous testing frameworks ensuring production stability across model evaluations and endpoints.",
      items: [
        { name: "Pytest (238 suites)", highlight: true, bold: true },
        { name: "Git & GitHub" },
        { name: "Docker Fundamentals" },
        { name: "Render Cloud" },
        { name: "Uvicorn" },
        { name: "VS Code & PyCharm" }
      ],
      footer: "Production readiness & test discipline"
    }
  ],

  projects: [
    {
      id: "mindcare",
      title: "MindCare AI",
      subtitle: "Safety-first supportive conversation engine",
      badge: "DEPLOYED ON RENDER — LIVE DEMO",
      category: "AI/ML · NLP · BACKEND ENGINEERING",
      description:
        "Generic chatbots answer everything with one model — including messages that signal distress. In a mental-health context that is a serious flaw: a generative model should never be the system deciding how to respond to a risk signal.",
      approach:
        "MindCare separates the pipeline. A scikit-learn NLP layer classifies intent, mood, topic and risk; an independent rule-based safety layer with negation-aware phrase handling escalates before any generated response is shown; FastAPI serves session-based chat endpoints behind API safeguards.",
      tags: [
        "Python",
        "FastAPI",
        "Scikit-learn",
        "TF-IDF",
        "Uvicorn",
        "Pydantic",
        "Pytest (238)",
        "Docker"
      ],
      githubUrl: "https://github.com/AnshPratap2314/AI-Mental-health-chatbot",
      demoUrl: "https://mindcare-ai-o1e5.onrender.com",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQwzi_vX0I_wmjAhbssa4fumkP8rf6aUPz8oECvpsK6O_bQNiEXUF1WH_Ds62fqO7r4bBFot02DGzQbGWwfYvq-sv7_WMosixOE7tuoqykHQikolhNi1ZPRduukyfreysgCZt1GA_5r9iNI7t-3NHhKsPQw_VG8YLKiJlttUxW9lURyMXmoetByyoKlX7IJQ9g3WWJFETe3Zx7Y77IayijRJMeIgT1q3Wr685BcmUazh39csfwsJbQSHrN46K26rhwZ0",
      isFlagship: true
    },
    {
      id: "interview",
      title: "AI Interview Simulator",
      subtitle: "Interview preparation OS with structured AI evaluation",
      badge: "DEPLOYED ON RENDER — LIVE DEMO",
      category: "GENERATIVE AI · PYTHON · API ENGINEERING",
      description:
        "Interview practice needs good questions and honest feedback. Static question banks repeat themselves, and raw LLM output is unstructured and inconsistent — impossible to score fairly or compare across sessions.",
      approach:
        "An API-first FastAPI platform: curated question banks across technical, HR and AI/ML tracks at multiple difficulty levels, with question-history tracking to avoid immediate repeats. Free-text answers are evaluated by the Google Gemini API under strict structured-output validation, returning reproducible scores and actionable feedback.",
      tags: [
        "Python",
        "FastAPI",
        "Pydantic",
        "SQLite",
        "Google Gemini API",
        "Pytest"
      ],
      githubUrl: "https://github.com/AnshPratap2314/ai-based-interview-simulator",
      demoUrl: "https://ai-based-interview-simulator-1.onrender.com",
      imageUrl: interviewSimImg,
      isFlagship: true
    },
    {
      id: "studyverse",
      title: "StudyVerse AI",
      subtitle: "Full-stack AI study platform with RAG document intelligence",
      badge: "LIVE ON VERCEL — COLLABORATIVE BUILD",
      category: "FULL-STACK DEVELOPMENT · GENERATIVE AI",
      description:
        "Students juggle PDFs, slides and notes across disconnected tools. Study material stays static, and getting help means context-switching between a chatbot and your documents.",
      approach:
        "StudyVerse puts the material and the tutor in one place: documents are extracted, chunked and indexed for retrieval-augmented Q&A, and an AI tutor answers with modes for beginner explanations, exam prep, Socratic revision and interview practice. AI traffic routes through a provider gateway with fallback, so a provider outage degrades gracefully.",
      tags: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Google GenAI SDK",
        "WebSockets"
      ],
      githubUrl: "https://github.com/AnshPratap2314/StudyVerse-AI",
      demoUrl: "https://study-verse-ai-eight.vercel.app/",
      imageUrl: studyverseImg,
      isFlagship: true
    },
    {
      id: "pca",
      title: "PCA Face Recognition",
      subtitle: "Eigenfaces from scratch — dimensionality reduction meets classification",
      badge: "ACADEMIC IMPLEMENTATION — DATASET & EVALUATION INCLUDED",
      category: "COMPUTER VISION · MACHINE LEARNING FUNDAMENTALS",
      description:
        "Raw face images are high-dimensional and highly redundant. PCA poses a sharp question: how much of a face's identity survives when you compress it to k principal components?",
      approach:
        "A from-scratch implementation: preprocessing and normalisation, covariance-based eigenface extraction for dimensionality reduction, and an MLP classifier on the reduced features — with an evaluation sweep across k to balance compression against recognition accuracy. The dataset ships with the repository.",
      tags: [
        "Python",
        "NumPy",
        "Scikit-learn",
        "Matplotlib",
        "PCA",
        "MLP"
      ],
      githubUrl: "https://github.com/AnshPratap2314/Implementation-of-PCA-for-face-recognition",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzcZC3TkqHGVqay1NS6x7CRG4u3FXvPxg_Obz1-W7X3Bu1muLX2LQtyZ7CHbGYQZyEXMTgt5YrtBh6GaMakJh8aXYml8azrAGSOXmlOf8BbEwJz7_aW0sbe2j9KrTf0b5_1SzD-ZsyQ7NKVxXxGHWu2fQG-Mb1nKFOzk3RpOpc3bi0WTR6hD7q-rC9dhEZM02kcdFPFN7d8DBOjwt2SNvkvZ_BWnC2jRIWMX-uy27PXI9qVl8Cfjy6AUruV7ArqrfeWAc"
    },
    {
      id: "aishie",
      title: "Aishie",
      subtitle: "Local-first voice & vision desktop assistant",
      badge: "PROTOTYPE — RUNS FULLY ON-DEVICE",
      category: "PYTHON · VOICE AUTOMATION · COMPUTER VISION",
      description:
        "Consumer voice assistants hand every word to the cloud. I wanted to explore how far a fully local Python stack could go: face-authenticated access, speech I/O, and real desktop automation — no cloud dependency.",
      approach:
        "Aishie unlocks only when it recognises your face (OpenCV + face_recognition), listens via SpeechRecognition, answers with pyttsx3, automates apps and system tasks with PyAutoGUI/AppleScript, sends messages via smtplib and WhatsApp automation, looks things up on Wikipedia, and remembers preferences and task history in local JSON files.",
      tags: [
        "Python",
        "SpeechRecognition",
        "PyAudio",
        "pyttsx3",
        "OpenCV",
        "face_recognition"
      ],
      githubUrl: "https://github.com/AnshPratap2314/Aishie-AI-Assistant",
      imageUrl: aishieImg
    }
  ],

  moreExperiments: [
    {
      title: "CodeTrace AI",
      description:
        "Repository intelligence platform reconstructing the decisions behind a codebase with Knowledge Graphs, GraphRAG and temporal reasoning.",
      url: "https://github.com/AnshPratap2314/CodeTrace-AI"
    },
    {
      title: "Clinexa AI",
      description:
        "Clinical intelligence concept exploring health-risk prediction, explainable AI and patient triage.",
      url: "https://github.com/AnshPratap2314/Clinexa-AI"
    },
    {
      title: "CivicResolve",
      description:
        "AI-powered civic complaint resolution platform concept for faster, more transparent public services.",
      url: "https://github.com/AnshPratap2314/CivicResolve"
    }
  ],

  experience: [
    {
      id: "istudio",
      period: "Oct 2025 – Jan 2026",
      isRecent: true,
      role: "Artificial Intelligence Intern",
      company: "iStudio",
      location: "Remote",
      bullets: [
        "Automated data-preprocessing steps in Python, cutting training-iteration time by a reported ~30% (as documented on my GitHub profile).",
        "Improved LLM prompt templates for consistent, structured inference outputs.",
        "Worked on exploratory data analysis and handling of class imbalance in training data."
      ],
      tags: ["Python", "Prompt Engineering", "Data Cleaning", "Pipeline Optimization"]
    },
    {
      id: "cttc",
      period: "Apr 2025 – May 2025",
      isRecent: false,
      role: "AI/ML Industrial Trainee",
      company: "CTTC Bhubaneswar (MSME Tool Room, Govt. of India)",
      location: "Bhubaneswar, Odisha",
      bullets: [
        "Intensive training across Python, machine learning, NLP algorithms and computer vision fundamentals.",
        "Built a face-recognition attendance project from scratch in ~3 weeks using OpenCV.",
        "Benchmarked SVM, KNN, Decision Trees and baseline neural networks; implemented and evaluated Local Binary Patterns Histograms (LBPH)."
      ],
      tags: ["OpenCV", "LBPH", "Scikit-learn", "Model Benchmarking"]
    },
    {
      id: "codealpha",
      period: "2025",
      isRecent: false,
      role: "Frontend Development Intern",
      company: "CodeAlpha",
      location: "Remote",
      bullets: [
        "Built a responsive multi-page web application conforming strictly to modular layout practices.",
        "Applied lazy loading and asset optimisation, noticeably improving mobile first-paint time (as documented on my GitHub profile)."
      ],
      tags: ["Responsive UI", "JavaScript", "Web Standards"]
    }
  ],

  achievements: [
    {
      title: "Gemini Enterprise Agent Ready",
      issuer: "GOOGLE DEVELOPER PROGRAM",
      year: "2026",
      description:
        "Developer-program badge demonstrating completion of the associated agent-readiness activity."
    },
    {
      title: "Google Cloud Innovator",
      issuer: "GOOGLE DEVELOPER PROGRAM",
      year: "2025",
      description:
        "Recognition of participation in the Google Cloud developer ecosystem."
    },
    {
      title: "Google Cloud & NVIDIA Community",
      issuer: "GOOGLE DEVELOPER PROGRAM",
      year: "2026",
      description:
        "Community affiliation related to Google Cloud and NVIDIA."
    }
  ],

  certifications: [
    {
      title: "Google Prompting Essentials",
      issuer: "GOOGLE · COURSERA",
      year: "2026",
      description:
        "Prompt engineering, advanced reasoning techniques, AI-assisted workflows, and automated problem-solving.",
      isLinked: true,
      verifyUrl: "https://coursera.org/share/42e34346badc3ffe88f2c35acbc473d3"
    },
    {
      title: "Google AI Essentials",
      issuer: "GOOGLE · COURSERA",
      year: "2026",
      description:
        "Practical AI toolchains, responsible AI development principles, and AI-accelerated productivity.",
      isLinked: true,
      verifyUrl: "https://coursera.org/share/1720f8da7e0094ed2783760a90e0499e"
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM",
      year: "2025",
      description:
        "Foundations of artificial intelligence — ML algorithms, deep neural representations, and ethical model deployment.",
      isLinked: true,
      verifyUrl: "https://skills.yourlearning.ibm.com/certificate/PLAN-7913EE1DB030"
    },
    {
      title: "AI Readiness",
      issuer: "GOOGLE · IICT",
      year: "2025",
      description:
        "Foundational AI readiness and modern technological competencies certified under the GOOGLE-IICT initiative.",
      isLinked: true
    },
    {
      title: "HP LIFE — Data Science & Analytics",
      issuer: "HP LIFE",
      year: "2025",
      description: "Applied statistical workflows, predictive metrics, and real-world analytical modeling.",
      isLinked: true,
      verifyUrl: "https://www.life-global.org/certificate/72e5d446-42f5-411f-95ab-c27a256fd613"
    },
    {
      title: "AI/ML Industrial Training",
      issuer: "CTTC BHUBANESWAR",
      year: "2025",
      description:
        "Course-completion credential for the AI/ML industrial training programme.",
      isLinked: true
    },
    {
      title: "NVIDIA 6G Developer Program",
      issuer: "NVIDIA — SELECTED",
      year: "2025",
      description: "Selected developer participant exploring next-gen network AI.",
      isLinked: false
    }
  ],

  // USER NOTE: "just remove certificate image in the beyond the classroom section left only mention and keep text"
  beyondClassroom: [
    {
      id: "mu-hackathon-2026",
      title: "MU HACKATHON 2026 — 'The Smart Campus'",
      subtitle: "Dept. of Computer Science & Engineering and Computer Application, Mewar University (17 Oct 2026)",
      badge: "CAMPUS LEADERSHIP",
      description:
        "Certificate of Appreciation awarded in sincere recognition for outstanding leadership and valuable contribution as an Organizing Coordinator for MU HACKATHON 2026 on the theme 'The Smart Campus', organized by the Department of Computer Science & Engineering, and Computer Application on 17 October 2026 at Mewar University, Chittorgarh (Sr. No. MU/CSE&CA/261710/125)."
    },
    {
      id: "bgmi",
      title: "BGMI Tournament — Mewar Pro Series",
      subtitle: "Technical Today Club, Mewar University",
      badge: "CAMPUS LEADERSHIP",
      description:
        "Certificate of appreciation for exceptional coordination and efforts in organising the BGMI Tournament — Technical Today Club, Mewar University."
    },
    {
      id: "aagaaz",
      title: "Fresher's Day 'AAGAAZ 2K25'",
      subtitle: "Organised by Mewar University on 21 September 2025",
      badge: "CAMPUS LEADERSHIP",
      description:
        "Certificate of appreciation for enthusiastic coordination — organised by Mewar University on 21 September 2025."
    }
  ],

  caseStudies: {
    mindcare: {
      id: "mindcare",
      title: "MindCare AI — Architecture Deep Dive",
      subtitle: "Safety-first mental health conversational system with 238 passing tests",
      architectureDetails:
        "Separation of concerns between probabilistic generation and deterministic triage. Before an LLM is ever consulted, incoming user utterances flow through normalization, regex escalation guards, and a calibrated scikit-learn NLP pipeline.",
      metrics: [
        { label: "Regression Test Suite", value: "238 passing tests" },
        { label: "Classification Latency", value: "<15ms per utterance" },
        { label: "Safety Pipeline", value: "Negation-aware rule layer" },
        { label: "Deployment", value: "Docker on Render Cloud" }
      ],
      sections: [
        {
          heading: "1. The Safety Challenge",
          body: "Standard LLMs generate probabilistic outputs that cannot guarantee safe triage under self-harm queries. In healthcare and supportive conversational agents, a model hallucinating or encouraging harmful thoughts is a critical failure. MindCare enforces deterministic rule-based safety interception using custom negation-handling lexicons before passing prompts to ML layers.",
          highlights: [
            "Deterministic escalation on flagged phrase patterns",
            "Contextual negation parsing (e.g., distinguishing 'I am not thinking about ending it' from 'I am thinking about ending it')",
            "Emergency crisis helpline injection without LLM interference"
          ]
        },
        {
          heading: "2. NLP Pipeline & Classification",
          body: "Text classification pipeline implemented in scikit-learn utilizing TF-IDF n-gram vectorization and Logistic Regression for instantaneous intent classification with latency under 15ms. It identifies mood states (anxious, depressed, neutral, positive) and conversational topics (academic stress, relationship, loneliness).",
          highlights: [
            "TF-IDF word & character n-grams (1-3)",
            "Calibrated probability thresholds for multi-class routing",
            "Memory-efficient serialization via Joblib"
          ]
        },
        {
          heading: "3. Test Suite Quality & Invariants",
          body: "Over 238 rigorous pytest cases validating negation handling, edge inputs, malformed payload injections, and session state serialization. Every build is automatically tested against prompt injection attempts and boundary edge cases.",
          highlights: [
            "238 unit and integration regression suites",
            "Mocked generative fallbacks to test safety degradation paths",
            "Pydantic runtime request & response validation"
          ]
        }
      ],
      tags: ["Python", "FastAPI", "Scikit-learn", "TF-IDF", "Pytest", "Docker", "Render"],
      githubUrl: "https://github.com/AnshPratap2314/AI-MentalHealth-Assistant"
    },

    interview: {
      id: "interview",
      title: "AI Interview Simulator — Structured Evaluation Engine",
      subtitle: "Pydantic-validated output parsing via Google Gemini API",
      architectureDetails:
        "Wraps Google Gemini LLM with Pydantic JSON schema constraints, enforcing reproducible category scores, question deduplication in SQLite, and concrete candidate action items.",
      metrics: [
        { label: "Evaluation Strictness", value: "100% Schema Validated" },
        { label: "Question Tracks", value: "Tech, HR & AI/ML Tracks" },
        { label: "State Persistence", value: "Session-scoped SQLite" },
        { label: "Scoring Consistency", value: "Calibrated rubric metrics" }
      ],
      sections: [
        {
          heading: "1. Problem & Schema-Enforced Architecture",
          body: "Free-form chat prompts create drifting scores and unhelpful generic praise. This engine wraps Google Gemini with Pydantic schemas forcing responses into strict score metrics, category breakdowns, and concrete bullet suggestions.",
          highlights: [
            "Pydantic model validation on raw LLM output stream",
            "Structured score extraction across Technical Depth, Clarity, and STAR format",
            "Actionable improvement bullets rather than vague summaries"
          ]
        },
        {
          heading: "2. Session Memory & Question Variety",
          body: "SQLite database tracks question frequencies so repetitive technical and HR questions are suppressed within rotating session windows. Candidates get progressive difficulty tailored to their target role.",
          highlights: [
            "Sliding window deduplication per user session",
            "Multi-difficulty ladders (Junior, Mid, Senior, Specialist)",
            "Dynamic follow-up questions generated from candidate answers"
          ]
        }
      ],
      tags: ["Python", "FastAPI", "Pydantic", "SQLite", "Google Gemini API", "Pytest"],
      githubUrl: "https://github.com/AnshPratap2314/AI-Interview-Preparation-System"
    },

    studyverse: {
      id: "studyverse",
      title: "StudyVerse AI — Full-Stack RAG & Document Intelligence",
      subtitle: "Document chunking, multi-provider fallbacks and real-time interactive tutors",
      architectureDetails:
        "A full-stack learning platform connecting uploaded PDF documents with an AI tutor through text extraction, chunking with overlap, and a multi-provider gateway with automatic failover.",
      metrics: [
        { label: "Tutor Modes", value: "4 Adaptive Persona Engines" },
        { label: "Document Ingestion", value: "Overlapping Chunks & Indexing" },
        { label: "Reliability", value: "Graceful Multi-Provider Failover" },
        { label: "Communication", value: "Real-time WebSockets" }
      ],
      sections: [
        {
          heading: "1. Chunking & Retrieval-Augmented Q&A",
          body: "Extracts textual contents from user-uploaded PDFs, chunking paragraphs with overlap for semantic indexing and contextual question answering. Students query complex lecture notes directly in natural language.",
          highlights: [
            "Document parsing and boundary-aware chunking",
            "Context synthesis before querying the LLM",
            "Direct page reference citation in tutor answers"
          ]
        },
        {
          heading: "2. High Availability Provider Gateway",
          body: "Implements automated failover across primary and secondary generative providers so API rate limits don't interrupt active student study sprints. If one model quotas or errors, the backup takes over transparently.",
          highlights: [
            "Dual-provider architecture with health checks",
            "Exponential backoff retry policy",
            "Interactive adaptive revision and flashcard generators"
          ]
        }
      ],
      tags: ["Node.js", "Express.js", "MongoDB", "Google GenAI SDK", "WebSockets"],
      githubUrl: "https://github.com/AnshPratap2314/StudyVerse-AI",
      demoUrl: "https://studyverse-ai-three.vercel.app/"
    },

    pca: {
      id: "pca",
      title: "PCA Face Recognition — Mathematical Deep Dive",
      subtitle: "Eigenfaces from scratch — covariance matrix decomposition & classification",
      architectureDetails:
        "From-scratch linear algebra pipeline implementing Eigenface decomposition on face image datasets, evaluating dimensionality reduction against classification accuracy.",
      metrics: [
        { label: "Algorithm", value: "Eigenface PCA from scratch" },
        { label: "Mathematics", value: "Covariance decomposition" },
        { label: "Classifier", value: "Multi-Layer Perceptron (MLP)" },
        { label: "Benchmark", value: "k-component accuracy sweep" }
      ],
      sections: [
        {
          heading: "1. Dimensionality Reduction Mathematical Foundation",
          body: "Raw image vectors contain high dimensional collinearity. By calculating the covariance matrix and finding the eigenvectors corresponding to the largest eigenvalues, the facial features are compressed into an orthogonal subspace.",
          highlights: [
            "Centering and normalization of grayscale image vectors",
            "Efficient covariance calculation via snapshot method",
            "Visualization of top principal eigenvectors (Eigenfaces)"
          ]
        },
        {
          heading: "2. Classification & Empirical Evaluation",
          body: "Evaluated using an MLP classifier trained on compressed coefficients. Demonstrated how small subspace projections (retaining ~40-60 components) achieve comparable recognition accuracy with orders-of-magnitude lower memory and compute requirements.",
          highlights: [
            "Comparative sweep across k = 10 to 150 components",
            "Reconstruction error calculation vs recognition accuracy",
            "Complete reproducible dataset and Jupyter notebooks included"
          ]
        }
      ],
      tags: ["Python", "NumPy", "Scikit-learn", "Matplotlib", "PCA", "Linear Algebra"],
      githubUrl: "https://github.com/AnshPratap2314/PCA-Face-Recognition"
    },

    aishie: {
      id: "aishie",
      title: "Aishie — Local-First Voice & Vision Assistant",
      subtitle: "On-device desktop automation with biometric authentication",
      architectureDetails:
        "Completely offline automation assistant combining OpenCV face verification, local speech synthesis, and desktop OS automation without sending user data to cloud servers.",
      metrics: [
        { label: "Cloud Dependency", value: "0% — 100% Local Execution" },
        { label: "Authentication", value: "Facial Biometric Lock" },
        { label: "Speech Engine", value: "Offline pyttsx3 + SpeechRecognition" },
        { label: "Automation", value: "PyAutoGUI & OS scripts" }
      ],
      sections: [
        {
          heading: "1. Biometric Gatekeeping & Privacy",
          body: "Consumer voice assistants stream ambient audio to external servers. Aishie enforces privacy by requiring visual biometric verification through webcam before listening for commands.",
          highlights: [
            "HOG-based face detection and 128-d face embedding matching",
            "Immediate access revocation when user leaves viewport",
            "Encrypted local embedding storage"
          ]
        },
        {
          heading: "2. Native OS Automation",
          body: "Interprets natural spoken requests into desktop automation commands: launching applications, adjusting system settings, reading local documents, and scheduling reminders.",
          highlights: [
            "Offline speech recognition fallback pipelines",
            "PyAutoGUI native desktop workflow execution",
            "Local JSON persistence for preferences and command history"
          ]
        }
      ],
      tags: ["Python", "OpenCV", "face_recognition", "SpeechRecognition", "PyAutoGUI", "pyttsx3"],
      githubUrl: "https://github.com/AnshPratap2314/Aishie-Voice-Vision-Assistant"
    }
  }
};
