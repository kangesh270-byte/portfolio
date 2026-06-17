import { GraduationCap, Award, MapPin, Stars } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioData } from '../../server-db';

interface AboutProps {
  portfolio: PortfolioData;
  darkMode: boolean;
}

export default function About({ portfolio, darkMode }: AboutProps) {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden border-t border-slate-500/10">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Stars className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">About Me</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Background & Mission
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Card 1: Interactive Intro Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 p-8 md:p-10 rounded-3xl border backdrop-blur-xl ${
              darkMode 
                ? 'bg-slate-900/40 border-white/5' 
                : 'bg-white border-slate-200/80 shadow-md'
            }`}
          >
            <h3 className="text-xl md:text-2xl font-display font-semibold mb-6 text-cyan-400 flex items-center gap-2">
              <span>My Career Vision</span>
            </h3>
            
            <p className={`text-base md:text-lg mb-6 leading-relaxed ${darkMode ? 'text-slate-350' : 'text-slate-700'}`}>
              {portfolio.aboutMe}
            </p>

            <p className={`text-base leading-relaxed mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              I thrive in competitive landscapes like 30-hour hackathons and technological expositions. 
              My objective is to bridge the gap between heavy cloud backend ecosystems and ultra-scalable frontend layers while embedding highly actionable cognitive outputs powered by the latest Generative AI architectures.
            </p>

            {/* Quick Stats Grid representing achievements in clear visual cards */}
            <div className={`grid grid-cols-3 gap-4 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'} text-center`}>
              <div className={`p-3 rounded-xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-xl md:text-2xl font-display font-extrabold text-cyan-400">4+</div>
                <div className="text-[9px] uppercase tracking-tighter text-slate-400">Awards</div>
              </div>
              <div className={`p-3 rounded-xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-xl md:text-2xl font-display font-extrabold text-cyan-400">12+</div>
                <div className="text-[9px] uppercase tracking-tighter text-slate-400">Projects</div>
              </div>
              <div className={`p-3 rounded-xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-xl md:text-2xl font-display font-extrabold text-cyan-400">7.6</div>
                <div className="text-[9px] uppercase tracking-tighter text-slate-400">CGPA</div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Education & Fast stats */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Education Card */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between backdrop-blur-xl ${
              darkMode 
                ? 'bg-slate-900/40 border-white/5' 
                : 'bg-white border-slate-200/80 shadow-md'
            }`}>
              <div className="flex gap-4">
                <div className="w-1 h-14 bg-cyan-500/20 rounded-full flex flex-col justify-between">
                  <div className="w-1 h-5 bg-cyan-500 rounded-full"></div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest font-bold">Education Journey</span>
                  <h3 className="text-lg font-display font-bold mt-1 text-white">
                    {portfolio.education.degree}
                  </h3>
                  <p className={`text-xs font-mono font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {portfolio.education.institution}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className={darkMode ? 'text-slate-350' : 'text-slate-600'}>Erode, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className={darkMode ? 'text-slate-350' : 'text-slate-650'}>Weighted CGPA: <strong>{portfolio.education.cgpa} / 10</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-md">2022 - 2026 Batch</span>
                </div>
              </div>
            </div>

            {/* Core Pillars box */}
            <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
              darkMode 
                ? 'bg-slate-900/40 border-white/5' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold uppercase block mb-3">Core Specialties</span>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Intelligent API services</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Modern UI layouts</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Real-time storage</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> High performance</li>
              </ul>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
