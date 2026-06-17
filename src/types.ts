export interface Skill {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
  proficiency?: number; // percentage, optional
}

export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  link?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface Analytics {
  visitors: number;
  projectViews: { [projectId: string]: number };
  resumeDownloads: number;
}
