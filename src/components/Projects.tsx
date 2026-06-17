import { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Activity, 
  BookOpen, 
  Cpu, 
  Upload, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  TrendingUp,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  darkMode: boolean;
}

export default function Projects({ projects, darkMode }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  
  // CropDoc interactive state
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [symptoms, setSymptoms] = useState('Dark water-soaked leaf spots starting with yellow halos on lower branches.');
  const [loading, setLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const preSets = [
    { crop: 'Tomato', symptoms: 'Dark water-soaked leaf spots starting with yellow halos on lower branches.' },
    { crop: 'Rice', symptoms: 'Diamond-shaped brown leaf lesions with gray centers on seedling leaves.' },
    { crop: 'Potato', symptoms: 'Dry rot lesions on stems and brown sunken spots on tuber surfaces.' },
    { crop: 'Wheat', symptoms: 'Orange-brown powdery rust pustules erupting along the leaf veins.' }
  ];

  const triggerTrace = (projectId: string) => {
    // Increment project view count in analytics
    fetch(`/api/analytics/project/${projectId}`, { method: 'POST' })
      .catch((err) => console.error('Project trace failed:', err));
  };

  const handleDiagnose = async () => {
    if (!selectedCrop) return;
    setLoading(true);
    setErrorMsg('');
    setDiagnosisResult(null);

    try {
      const response = await fetch('/api/cropdoc/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropName: selectedCrop, description: symptoms })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Diagnostic server is busy.');
      }
      setDiagnosisResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Connection timeout. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // Map system project mock icons to custom panels
  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'cropdoc':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'placement-booster':
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case 'library-system':
        return <BookOpen className="w-5 h-5 text-teal-400" />;
      default:
        return <FolderGit2 className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden border-t border-slate-500/10">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Featured Systems
          </h2>
          <p className={`text-slate-400 text-sm mt-2 font-mono ${darkMode ? 'text-slate-400' : 'text-slate-650'}`}>
            Click any system to view structural parameters and key highlights
          </p>
          <div className="h-1 w-20 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <motion.div
              layoutId={`card-${proj.id}`}
              key={proj.id}
              onClick={() => {
                setActiveProject(proj.id);
                triggerTrace(proj.id);
              }}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between ${
                activeProject === proj.id
                  ? 'border-cyan-500 bg-cyan-500/[0.03]'
                  : darkMode
                    ? 'bg-slate-950/80 border-white/5 hover:border-cyan-500/25 shadow-lg'
                    : 'bg-white border-slate-200 hover:border-cyan-500/25 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    {getProjectIcon(proj.id)}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Database className="w-3.5 h-3.5" />
                    MongoDB
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold tracking-tight mb-3">
                  {proj.title}
                </h3>
                
                <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {proj.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map((t) => (
                    <span 
                      key={t}
                      className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`pt-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'} flex items-center justify-between text-xs font-semibold text-cyan-400`}>
                <span>Configure details & view &rarr;</span>
                {proj.id === 'cropdoc' && (
                  <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider animate-pulse font-bold">
                    <Sparkles className="w-3 h-3" /> Live Demo
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Feature Details Modal Overlay */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              {projects
                .filter((p) => p.id === activeProject)
                .map((proj) => (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    key={proj.id}
                    className={`max-w-2xl w-full p-8 md:p-10 rounded-3xl border relative max-h-[90vh] overflow-y-auto backdrop-blur-xl ${
                      darkMode ? 'bg-slate-950/95 border-white/5' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <button
                      onClick={() => setActiveProject(null)}
                      className="absolute top-6 right-6 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      [ Close ]
                    </button>

                    <div className="mb-6 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        {getProjectIcon(proj.id)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white">{proj.title}</h3>
                        <span className="text-[11px] font-mono text-cyan-400 font-bold">SYSTEM ARCHITECTURE</span>
                      </div>
                    </div>

                    <p className={`text-sm mb-6 ${darkMode ? 'text-slate-350' : 'text-slate-600'}`}>
                      {proj.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Core Functional Capabilities:</h4>
                      <ul className="space-y-2">
                        {proj.features.map((feat) => (
                          <li key={feat} className="flex gap-2.5 items-start text-sm">
                            <span className="mt-1 text-cyan-400 font-bold">&#10003;</span>
                            <span className={darkMode ? 'text-slate-350' : 'text-slate-700'}>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Configured Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <span 
                            key={t}
                            className="text-xs font-mono px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                      {proj.id === 'cropdoc' ? (
                        <button
                          onClick={() => {
                            setIsSandboxOpen(true);
                            setActiveProject(null);
                          }}
                          className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-display font-bold text-sm tracking-wide flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                        >
                          <Sparkles className="w-4 h-4" /> Run Live CropDoc Sandbox!
                        </button>
                      ) : (
                        <div className="text-[11px] font-mono text-slate-400_">
                          Demo is sandbox configured
                        </div>
                      )}

                      <div className="flex gap-4">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono hover:text-cyan-400 transition"
                          >
                            <Github className="w-4 h-4" /> Repository
                          </a>
                        )}
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); alert("Live host requires full student credentials index. Showing local sandbox instead!"); }}
                          className="flex items-center gap-1.5 text-xs font-mono hover:text-cyan-400 transition"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Build
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </AnimatePresence>

        {/* Live cropdoc sandbox Modal */}
        <AnimatePresence>
          {isSandboxOpen && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`max-w-3xl w-full p-8 md:p-10 rounded-2xl border relative max-h-[92vh] overflow-y-auto ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <button
                  onClick={() => setIsSandboxOpen(false)}
                  className="absolute top-6 right-6 font-mono text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  [ Close Sandbox ]
                </button>

                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-3 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> LIVE DEMO WORKSPACE
                  </div>
                  <h3 className="text-2xl font-display font-bold flex items-center gap-2">
                    <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
                    AI CropDoc Diagnosis Engine
                  </h3>
                  <p className="text-xs font-sans text-slate-400 mt-1">
                    Select a target crop, describe symptom conditions, and run neural inference directly powered by our Gemini core!
                  </p>
                </div>

                {/* Pre-defined selectors for recruiter swift checking */}
                <div className="mb-6">
                  <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-2.5 font-bold">Select Preset Crop Case:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {preSets.map((preset) => (
                      <button
                        key={preset.crop}
                        onClick={() => {
                          setSelectedCrop(preset.crop);
                          setSymptoms(preset.symptoms);
                        }}
                        className={`px-4 py-2 text-xs font-mono rounded-lg border text-left cursor-pointer transition-all ${
                          selectedCrop === preset.crop
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                            : darkMode
                              ? 'border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-600'
                        }`}
                      >
                        {preset.crop}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Crop select & descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="md:col-span-1">
                    <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-2 font-bold">Target Crop Name:</label>
                    <input
                      type="text"
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border font-sans text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                      placeholder="e.g. Potato, Pepper, Rice"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-2 font-bold">Observed Plant Symptoms:</label>
                    <input
                      type="text"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border font-sans text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                      placeholder="Describe lesions, mold, spot shapes, wilting..."
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={handleDiagnose}
                    disabled={loading || !selectedCrop || !symptoms}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-display font-extrabold text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Analyzing Biological Host...
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" /> Analyze Host Health!
                      </>
                    )}
                  </button>
                </div>

                {/* Results Screen */}
                <div className="border-t border-slate-500/10 pt-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 flex items-center gap-2.5 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {diagnosisResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl border ${
                        darkMode ? 'bg-slate-950/60 border-emerald-500/20' : 'bg-emerald-50/15 border-emerald-500/30'
                      }`}
                    >
                      {/* Top Header Result banner */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-500/10 pb-4">
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">Diagnosis State</span>
                          <div className="text-lg font-display font-semibold text-emerald-400 flex items-center gap-2 mt-0.5">
                            <CheckCircle className="w-5 h-5" />
                            {diagnosisResult.status || 'Active Analysis'}
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">Identified Disease Agent</span>
                          <div className={`text-base font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                            {diagnosisResult.disease || 'Unknown Agrochemical Pathogen'}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Accuracy Index</span>
                          <span className="text-sm font-mono font-bold text-teal-400">{diagnosisResult.confidence || '92%'}</span>
                        </div>
                      </div>

                      {/* Solutions Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 text-emerald-400/90">&bull; Organic Treatment Protocol:</h4>
                          <ul className="space-y-2 text-xs">
                            {(diagnosisResult.organicRemedies || []).map((rem: string, index: number) => (
                              <li key={index} className="flex gap-2 text-slate-350">
                                <span className="text-emerald-400 font-bold">&#10003;</span>
                                <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{rem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 text-cyan-400">&bull; Agro-chemical Standard:</h4>
                          <ul className="space-y-2 text-xs">
                            {(diagnosisResult.chemicalRemedies || []).map((rem: string, index: number) => (
                              <li key={index} className="flex gap-2 text-slate-350">
                                <span className="text-cyan-400 font-bold">&#10003;</span>
                                <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{rem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-slate-500/10 pt-4 flex flex-col gap-2">
                        <p className="text-xs leading-relaxed">
                          <strong className="text-teal-400 font-mono">Dynamic Plan:</strong> {diagnosisResult.treatmentPlan || 'Check irrigation values first.'}
                        </p>
                        <p className="text-xs leading-relaxed">
                          <strong className="text-teal-400 font-mono">Future Prevention:</strong> {diagnosisResult.prevention || 'Ensure seeds are certified pathogens free.'}
                        </p>
                      </div>

                      <div className="mt-4 text-[10px] font-mono text-slate-500 text-right">
                        Powered by Kangeshwaran's Model ({diagnosisResult.source})
                      </div>
                    </motion.div>
                  )}

                  {!diagnosisResult && !loading && (
                    <div className="text-center py-8 text-slate-500 font-mono text-xs">
                      [ Engine Standby — Waiting for Diagnostic Target ]
                    </div>
                  )}
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
