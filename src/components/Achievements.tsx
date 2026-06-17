import { Award, Trophy, Medal, Stars } from 'lucide-react';
import { motion } from 'motion/react';
import { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  darkMode: boolean;
}

export default function Achievements({ achievements, darkMode }: AchievementsProps) {
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20'; // gold
      case 1:
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20'; // gold
      case 2:
        return 'text-slate-400 bg-slate-400/10 border-slate-400/20'; // silver
      default:
        return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    }
  };

  return (
    <section id="achievements" className="py-24 px-6 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-[30%] right-[-5%] w-64 h-64 bg-cyan-500/5 rounded-full blur-[90px] animate-pulse-slow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">Victories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Honors & Achievements
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline representation or Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={ach.id}
              className={`p-6 md:p-8 rounded-3xl border flex gap-6 items-start transition-all duration-300 hover:scale-[1.01] ${
                darkMode
                  ? 'bg-slate-950/80 border-white/5 hover:border-cyan-500/25 shadow-lg'
                  : 'bg-white border-slate-200/80 hover:border-cyan-500/25 shadow-md'
              }`}
            >
              {/* Badge Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${getMedalColor(idx)}`}>
                {idx < 2 ? <Trophy className="w-5 h-5" /> : <Medal className="w-5 h-5" />}
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase block">
                  {ach.organization}
                </span>
                
                <h3 className="text-lg font-display font-semibold mt-1 mb-2">
                  {ach.title}
                </h3>
                
                {ach.description && (
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                    {ach.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
