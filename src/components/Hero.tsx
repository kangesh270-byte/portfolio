import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown, Download, Briefcase, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioData } from '../../server-db';

interface HeroProps {
  portfolio: PortfolioData;
  onNavigateToContact: () => void;
  darkMode: boolean;
}

export default function Hero({ portfolio, onNavigateToContact, darkMode }: HeroProps) {
  const [typedTitle, setTypedTitle] = useState('');
  const titles = [
    'AI Developer',
    'Full-Stack Developer',
    'Hackathon Winner',
    'Computer Science Engineering Student'
  ];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentFullTitle = titles[titleIdx];
    let typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIdx === currentFullTitle.length) {
      typingSpeed = 1500; // Hold full title
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
      typingSpeed = 300;
    }

    const timer = setTimeout(() => {
      setTypedTitle(
        isDeleting 
          ? currentFullTitle.substring(0, charIdx - 1) 
          : currentFullTitle.substring(0, charIdx + 1)
      );
      setCharIdx((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, titleIdx]);

  const handleResumeDownload = () => {
    // Analytics call to server
    fetch('/api/analytics/resume', { method: 'POST' })
      .catch((err) => console.error('Resume tracing error:', err));

    // Open a beautifully pre-formatted mock professional resume in PDF/Print dialog
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Kangeshwaran_Resume</title>
            <style>
              body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; line-height: 1.5; }
              h1 { margin-bottom: 5px; color: #111; }
              .title { font-weight: bold; color: #0d9488; margin-bottom: 20px; }
              .section { margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
              .section-title { font-weight: bold; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px; color: #111;}
              .item { margin-top: 15px; }
              .item-header { display: flex; justify-content: space-between; font-weight: bold; }
              ul { padding-left: 20px; margin-top: 8px; }
              li { margin-bottom: 4px; }
            </style>
          </head>
          <body>
            <h1>KANGESHWARAN</h1>
            <div class="title">Computer Science Engineering Student | AI & Full-Stack Developer</div>
            <p>Erode, Tamil Nadu | kangesh270@gmail.com | LinkedIn: company/kangeshwaran | GitHub: kangesh270</p>
            
            <div class="section">
              <div class="section-title">Education</div>
              <div class="item">
                <div class="item-header">
                  <span>B.E. Computer Science and Engineering</span>
                  <span>CGPA: 7.6</span>
                </div>
                <div>Nandha College of Technology, Erode (2022 - 2026)</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Technical Expertise</div>
              <p><strong>Languages:</strong> Python, Java, TypeScript, JavaScript, C</p>
              <p><strong>Frontend:</strong> React, Tailwind CSS, HTML5, CSS3</p>
              <p><strong>Backend & Databases:</strong> FastAPI, REST APIs, MongoDB, MySQL</p>
              <p><strong>Tools:</strong> Git, GitHub, VS Code, Google AI Studio</p>
            </div>

            <div class="section">
              <div class="section-title">Key Projects</div>
              <div class="item">
                <strong>AI CropDoc:</strong> AI-based crop disease detection platform with immediate diagnostics. Tech: Python, FastAPI, MongoDB, React.
              </div>
              <div class="item">
                <strong>Placement Booster:</strong> Student interactive placement boost vault featuring mock tests. Tech: React, FastAPI, MongoDB.
              </div>
              <div class="item">
                <strong>Online Library System:</strong> Automated user borrowing catalog platform. Tech: React, FastAPI, MongoDB.
              </div>
            </div>

            <div class="section">
              <div class="section-title">Key Achievements</div>
              <ul>
                <li>First Prize: 30-Hour Hackathon, SNS College of Technology</li>
                <li>First Prize: AI Web Craft Event, Hindustan College</li>
                <li>Second Prize: Online Library System Project Expo</li>
                <li>NPTEL Affective Computing (Elite + Silver, 76%)</li>
              </ul>
            </div>

            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center py-20 px-6 overflow-hidden"
    >
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      
      <div className="relative text-center max-w-4xl mx-auto z-10 flex flex-col items-center">
        {/* Profile Image Mock Container */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 group"
        >
          {/* Glowing Ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative w-32 h-32 rounded-3xl p-1 bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-2xl shadow-indigo-500/20">
            <div className="w-full h-full rounded-[20px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
              {/* Elegant Letter Avatar representing premium aesthetic */}
              <span className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-200 via-indigo-300 to-cyan-400">
                K
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-cyan-400 font-bold mt-1">CSE Student</span>
            </div>
          </div>
        </motion.div>

        {/* Name and Greet */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SYSTEM INTEGRITY SECURE
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-4">
            Hi, I am{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-300 font-extrabold">
              {portfolio.name}
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-12 flex items-center justify-center mb-6"
        >
          <span className={`text-xl md:text-2xl font-mono font-medium ${darkMode ? 'text-slate-350' : 'text-slate-700'}`}>
            &gt; <span className="border-r-2 border-cyan-400 pr-1 py-1 text-cyan-400 font-bold">{typedTitle}</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-sans ${darkMode ? 'text-slate-400' : 'text-slate-650'}`}
        >
          &ldquo;{portfolio.tagline}&rdquo;
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={onNavigateToContact}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-display font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Briefcase className="w-5 h-5" />
            Hire Me
          </button>
          
          <button
            onClick={handleResumeDownload}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-display font-semibold transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer hover:border-cyan-400/40 hover:bg-cyan-500/5 ${
              darkMode 
                ? 'border-white/10 bg-white/5 text-slate-200' 
                : 'border-slate-300 bg-white text-slate-800 shadow-sm'
            }`}
          >
            <Download className="w-5 h-5 text-cyan-400" />
            Resume.pdf
          </button>
        </motion.div>

        {/* Social Coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-6 items-center"
        >
          <a
            href="https://github.com/kangesh270"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-transparent hover:border-cyan-400/20 hover:bg-cyan-500/5 transition-all text-slate-400 hover:text-cyan-400 duration-300"
            title="GitHub Profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/kangeshwaran-v-7b96bb316"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-transparent hover:border-cyan-400/20 hover:bg-cyan-500/5 transition-all text-slate-400 hover:text-cyan-400 duration-300"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:kangesh270@gmail.com"
            className="p-3 rounded-full border border-transparent hover:border-cyan-400/20 hover:bg-cyan-500/5 transition-all text-slate-400 hover:text-cyan-400 duration-300"
            title="Send Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
        <span className="font-mono text-[10px] tracking-wider text-slate-400">SCROLL DOWN</span>
        <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
}
