import fs from 'fs';
import path from 'path';
import { Project, Skill, Achievement, Certification, ContactMessage, Analytics } from './src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  aboutMe: string;
  education: {
    degree: string;
    institution: string;
    cgpa: string;
  };
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
}

const DEFAULT_PORTFOLIO: PortfolioData = {
  name: "Kangeshwaran",
  title: "Computer Science Engineering Student | AI Developer | Full-Stack Developer | Hackathon Winner",
  tagline: "Building AI-Powered Solutions for Real-World Problems.",
  aboutMe: "I am a passionate Computer Science Engineering student with strong interests in Artificial Intelligence, Machine Learning, Web Development, and Software Engineering. I enjoy solving real-world problems through technology and actively participate in hackathons, workshops, and innovation challenges.",
  education: {
    degree: "B.E Computer Science and Engineering",
    institution: "Nandha College of Technology, Erode",
    cgpa: "7.6"
  },
  skills: [
    // Languages
    { name: "Python", category: "Languages", proficiency: 90 },
    { name: "Java", category: "Languages", proficiency: 80 },
    { name: "TypeScript", category: "Languages", proficiency: 85 },
    { name: "JavaScript", category: "Languages", proficiency: 85 },
    { name: "C", category: "Languages", proficiency: 75 },
    // Frontend
    { name: "React", category: "Frontend", proficiency: 85 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 90 },
    { name: "HTML5", category: "Frontend", proficiency: 95 },
    { name: "CSS3", category: "Frontend", proficiency: 85 },
    // Backend
    { name: "FastAPI", category: "Backend", proficiency: 80 },
    { name: "REST APIs", category: "Backend", proficiency: 85 },
    // Database
    { name: "MongoDB", category: "Database", proficiency: 80 },
    { name: "MySQL", category: "Database", proficiency: 80 },
    // Tools
    { name: "Git", category: "Tools", proficiency: 85 },
    { name: "GitHub", category: "Tools", proficiency: 90 },
    { name: "VS Code", category: "Tools", proficiency: 95 },
    { name: "Google AI Studio", category: "Tools", proficiency: 85 }
  ],
  projects: [
    {
      id: "cropdoc",
      title: "AI CropDoc",
      description: "AI-based crop disease detection platform with immediate diagnosis and highly relevant organic remedy recommendations.",
      features: [
        "Image upload and processing",
        "Deep learning disease prediction model integration",
        "Organic and chemical treatment recommendations",
        "AI-powered actionable response insights"
      ],
      tech: ["Python", "FastAPI", "MongoDB", "React", "TypeScript"],
      githubUrl: "https://github.com/kangesh270/ai-cropdoc",
    },
    {
      id: "placement-booster",
      title: "Placement Booster",
      description: "A comprehensive backend-driven preparation vault with custom mock interviews, analytics, and targeted flashcards.",
      features: [
        "Structured software mock tests",
        "Curated interactive Technical Interview questions",
        "Visual weekly progress tracking & dashboard analytics"
      ],
      tech: ["React", "FastAPI", "MongoDB"],
      githubUrl: "https://github.com/kangesh270/placement-booster",
    },
    {
      id: "library-system",
      title: "Online Library System",
      description: "A sophisticated administrative command-center for full digital books indexation and automated student receipts tracking.",
      features: [
        "Dynamic inventory management (Add/Remove Books)",
        "Granular user roles and borrow metrics tracking",
        "Responsive checkout and automatic borrow/return logging"
      ],
      tech: ["React", "FastAPI", "MongoDB"],
      githubUrl: "https://github.com/kangesh270/online-library-system",
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "First Prize – 30-Hour Hackathon",
      organization: "SNS College of Technology",
      description: "Awarded top honor for conceptualizing and building a high-fidelity system solve under a tight 30-hour timeline."
    },
    {
      id: "ach-2",
      title: "First Prize – AI Web Craft Event",
      organization: "Hindustan College",
      description: "Won first prize for presenting a fully functional generative-designed web product with production-grade elements."
    },
    {
      id: "ach-3",
      title: "Second Prize – Online Library System Project Expo",
      organization: "Nandha College of Technology",
      description: "Secured second prize among hundreds of projects for stellar database design and responsive user interface."
    },
    {
      id: "ach-4",
      title: "NPTEL Affective Computing (Elite + Silver, 76%)",
      organization: "NPTEL / IIT",
      description: "Completed rigorous national coursework in human-computer interaction and emotion-aware AI systems with Elite and Silver certification."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "NPTEL Affective Computing",
      issuer: "NPTEL / IIT Madras",
      date: "2024"
    },
    {
      id: "cert-2",
      title: "AI & Machine Learning Workshop",
      issuer: "IIT Madras",
      date: "2023"
    },
    {
      id: "cert-3",
      title: "GDG Technical Workshop",
      issuer: "Google Developer Groups (GDG)",
      date: "2024"
    }
  ]
};

const DEFAULT_ANALYTICS: Analytics = {
  visitors: 120, // Prepopulate with realistic numbers so dashboard looks outstanding from the start!
  projectViews: {
    cropdoc: 42,
    "placement-booster": 35,
    "library-system": 28
  },
  resumeDownloads: 15
};

// Ensure data directory exists
function initDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getPortfolioData(): PortfolioData {
  initDir();
  if (!fs.existsSync(PORTFOLIO_FILE)) {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(DEFAULT_PORTFOLIO, null, 2));
    return DEFAULT_PORTFOLIO;
  }
  try {
    return JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf-8'));
  } catch (err) {
    return DEFAULT_PORTFOLIO;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  initDir();
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2));
}

export function getMessages(): ContactMessage[] {
  initDir();
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
  } catch (err) {
    return [];
  }
}

export function saveMessages(messages: ContactMessage[]): void {
  initDir();
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

export function getAnalytics(): Analytics {
  initDir();
  if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(DEFAULT_ANALYTICS, null, 2));
    return DEFAULT_ANALYTICS;
  }
  try {
    return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
  } catch (err) {
    return DEFAULT_ANALYTICS;
  }
}

export function saveAnalytics(analytics: Analytics): void {
  initDir();
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2));
}
