import { useState } from 'react';
import { Terminal, Layout, Database, Sliders, Cpu, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioData } from '../../server-db';

interface SkillsProps {
  portfolio: PortfolioData;
  darkMode: boolean;
}

export default function Skills({ portfolio, darkMode }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools'>('All');

  const categories = [
    { name: 'All', icon: Cpu },
    { name: 'Languages', icon: Terminal },
    { name: 'Frontend', icon: Layout },
    { name: 'Backend', icon: Sliders },
    { name: 'Database', icon: Database },
    { name: 'Tools', icon: Sliders }, // Can map tools as useful items!
  ];

  const filteredSkills = portfolio.skills.filter(
    (skill) => selectedCategory === 'All' || skill.category === selectedCategory
  );

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">Abilities</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Technical Stack
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10'
                    : darkMode
                      ? 'border-white/5 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Skills Display Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 backdrop-blur-md ${
                darkMode
                  ? 'bg-slate-900/40 border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/60'
                  : 'bg-white border-slate-200 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-base font-display font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md font-bold">
                  {skill.proficiency || 80}%
                </span>
              </div>

              {/* Progress Line */}
              <div className="h-1.5 w-full bg-slate-500/15 rounded-full overflow-hidden mb-3">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency || 80}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full"
                ></motion.div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{skill.category}</span>
                <span className="flex items-center gap-1 text-cyan-400/80 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info box emphasizing engineering excellence */}
        <div className={`mt-12 p-6 rounded-3xl border text-center max-w-2xl mx-auto backdrop-blur-xl ${
          darkMode 
            ? 'bg-cyan-500/5 border-cyan-500/10' 
            : 'bg-teal-50/20 border-teal-500/20 shadow-inner'
        }`}>
          <p className="text-sm font-sans text-slate-400">
            <strong className="text-cyan-400">Continuous Growth:</strong> Actively exploring and configuring agent architectures, real-time sync systems using MongoDB streams, and deployment pipelines using modern Docker workflows.
          </p>
        </div>

      </div>
    </section>
  );
}
