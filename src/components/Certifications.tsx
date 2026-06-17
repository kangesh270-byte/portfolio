import { Award, ShieldCheck, Calendar, Grid } from 'lucide-react';
import { motion } from 'motion/react';
import { Certification } from '../types';

interface CertificationsProps {
  certifications: Certification[];
  darkMode: boolean;
}

export default function Certifications({ certifications, darkMode }: CertificationsProps) {
  return (
    <section id="certifications" className="py-24 px-6 relative overflow-hidden border-t border-white/5">
      <div className="absolute bottom-[10%] left-[-5%] w-60 h-60 bg-cyan-500/5 rounded-full blur-[90px] animate-pulse-slow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">Credentials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Certifications & Training
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={cert.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/35 hover:scale-[1.01] backdrop-blur-xl ${
                darkMode
                  ? 'bg-slate-950/80 border-white/5 hover:bg-slate-900/50 shadow-lg'
                  : 'bg-white border-slate-200 hover:shadow-lg hover:shadow-slate-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  {cert.date && (
                    <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {cert.date}
                    </div>
                  )}
                </div>

                <h3 className="text-base font-display font-semibold mb-1">
                  {cert.title}
                </h3>
                
                <p className={`text-xs font-mono mb-4 text-cyan-400 font-bold`}>
                  {cert.issuer}
                </p>
              </div>

              <div className={`pt-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'} flex items-center justify-between text-[11px] font-mono text-slate-500`}>
                <span>Verified Authority</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
