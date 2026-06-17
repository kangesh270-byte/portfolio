import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Eye, 
  Trash2, 
  Download, 
  Users, 
  FolderGit2, 
  Sparkles, 
  CloudRain, 
  AlertCircle, 
  CheckCircle,
  FileText,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '../../server-db';
import { ContactMessage, Analytics } from '../types';

interface AdminDashboardProps {
  portfolio: PortfolioData;
  onUpdatePortfolio: (newData: PortfolioData) => void;
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ 
  portfolio, 
  onUpdatePortfolio, 
  darkMode, 
  isOpen, 
  onClose 
}: AdminDashboardProps) {
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Panel navigation state
  const [activeTab, setActiveTab] = useState<'analytics' | 'messages' | 'config'>('analytics');

  // Dashboard contents
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [actionStatus, setActionStatus] = useState({ success: '', error: '' });

  // Config editor state (matches values from portfolio)
  const [editName, setEditName] = useState(portfolio.name);
  const [editTitle, setEditTitle] = useState(portfolio.title);
  const [editTagline, setEditTagline] = useState(portfolio.tagline);
  const [editAboutMe, setEditAboutMe] = useState(portfolio.aboutMe);
  const [editCgpa, setEditCgpa] = useState(portfolio.education.cgpa);
  const [editInstitution, setEditInstitution] = useState(portfolio.education.institution);

  // Refresh admin states
  const loadAdminTelemetry = async (authToken: string) => {
    try {
      // Load Analytics
      const analResp = await fetch('/api/analytics');
      if (analResp.ok) {
        const analData = await analResp.json();
        setAnalytics(analData);
      }

      // Load Messages
      const msgResp = await fetch('/api/admin/messages', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (msgResp.ok) {
        const msgData = await msgResp.json();
        setMessages(msgData);
      } else if (msgResp.status === 401 || msgResp.status === 403) {
        // Token expired
        handleLogout();
      }
    } catch (err) {
      console.error('System failed to query database elements.', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Sync edit state values to parent values on catalog open
      setEditName(portfolio.name);
      setEditTitle(portfolio.title);
      setEditTagline(portfolio.tagline);
      setEditAboutMe(portfolio.aboutMe);
      setEditCgpa(portfolio.education.cgpa);
      setEditInstitution(portfolio.education.institution);
    }
    
    if (isOpen && token) {
      loadAdminTelemetry(token);
    }
  }, [isOpen, token, portfolio]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setLoginError('Credentials cannot be empty.');
      return;
    }

    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server rejected credentials.');
      }

      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
      await loadAdminTelemetry(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Verification pipeline interrupted.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
    setMessages([]);
    setLoginPassword('');
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!token) return;
    setActionStatus({ success: '', error: '' });

    try {
      const response = await fetch(`/api/admin/messages/${msgId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Deletion request rejected.');
      }

      setMessages(prev => prev.filter(m => m.id !== msgId));
      setActionStatus({ success: 'Message removed successfully.', error: '' });
      setTimeout(() => setActionStatus({ success: '', error: '' }), 3000);
    } catch (err: any) {
      setActionStatus({ success: '', error: err.message || 'Deletion error.' });
    }
  };

  const handleUpdateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionStatus({ success: '', error: '' });

    const payload: PortfolioData = {
      ...portfolio,
      name: editName,
      title: editTitle,
      tagline: editTagline,
      aboutMe: editAboutMe,
      education: {
        ...portfolio.education,
        cgpa: editCgpa,
        institution: editInstitution
      }
    };

    try {
      const response = await fetch('/api/portfolio-data', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Update failed.');
      }

      onUpdatePortfolio(payload);
      setActionStatus({ success: 'Portfolio parameters re-configured live!', error: '' });
      setTimeout(() => setActionStatus({ success: '', error: '' }), 4000);
    } catch (err: any) {
      setActionStatus({ success: '', error: err.message || 'Reconfiguration halt.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`max-w-4xl w-full rounded-2xl border relative max-h-[92vh] overflow-hidden flex flex-col ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-lg font-display font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                Admin Workspace
              </h3>
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">SECURE CONFIGURATION SUITE</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="font-mono text-xs text-slate-500 hover:text-slate-350 cursor-pointer"
          >
            [ Close ]
          </button>
        </div>

        {/* --- MAIN INTERFACE: SPLIT BY LOGIN / CONTENT --- */}
        {!token ? (
          /* 1. Login Container */
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center max-w-md mx-auto w-full">
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 text-teal-400 mx-auto mb-3" />
              <h4 className={`text-base font-display font-semibold ${darkMode ? 'text-slate-250' : 'text-slate-800'}`}>
                Identity Verification
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Authenticate with Kangeshwaran system criteria. Default is <code className="font-mono bg-slate-500/10 text-teal-400 font-bold px-1 py-0.5 rounded">admin</code> / <code className="font-mono bg-slate-500/10 text-teal-400 font-bold px-1 py-0.5 rounded">password123</code>
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">Admin Account</label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">Security Key</label>
                <input
                  type="password"
                  required
                  placeholder="password123"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              {loginError && (
                <div className="p-3 text-xs rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-slate-950 text-sm font-display font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-500/10"
              >
                {loginLoading ? 'Analyzing Key...' : 'Request Credentials Token'}
              </button>
            </form>
          </div>
        ) : (
          /* 2. Logged In Panel Dashboard */
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
            
            {/* Sidebar Navigation */}
            <div className={`lg:w-48 border-r flex flex-row lg:flex-col p-4 gap-2 flex-shrink-0 justify-between lg:justify-start ${
              darkMode ? 'border-slate-850 bg-slate-950/20' : 'border-slate-200 bg-slate-55'
            }`}>
              <div className="flex flex-row lg:flex-col gap-2 w-full">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full px-3 py-2 rounded-xl text-left font-mono text-[11px] font-semibold flex items-center gap-2 cursor-pointer transition ${
                    activeTab === 'analytics'
                      ? 'bg-teal-500/10 text-teal-400'
                      : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-650 hover:text-slate-950'
                  }`}
                >
                  <Users className="w-4 h-4" /> TELEMETRY
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full px-3 py-2 rounded-xl text-left font-mono text-[11px] font-semibold flex items-center gap-2 relative cursor-pointer transition ${
                    activeTab === 'messages'
                      ? 'bg-teal-500/10 text-teal-400'
                      : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-650 hover:text-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" /> INQUIRIES
                  {messages.length > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-teal-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      {messages.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('config')}
                  className={`w-full px-3 py-2 rounded-xl text-left font-mono text-[11px] font-semibold flex items-center gap-2 cursor-pointer transition ${
                    activeTab === 'config'
                      ? 'bg-teal-500/10 text-teal-400'
                      : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-650 hover:text-slate-100'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" /> RE-CONFIGURE
                </button>
              </div>

              <div className="lg:mt-auto pt-4 border-t border-slate-550/15 lg:w-full">
                <button
                  onClick={handleLogout}
                  className="w-full text-center lg:text-left text-[10px] font-mono hover:text-red-400 text-slate-500 transition cursor-pointer"
                >
                  [ DE-AUTHENTICATE ]
                </button>
              </div>
            </div>

            {/* Panel Contents Section */}
            <div className={`flex-1 p-6 overflow-y-auto ${darkMode ? 'bg-slate-950/40' : 'bg-slate-50/50'}`}>
              
              {actionStatus.success && (
                <div className="mb-4 p-3 text-xs rounded-xl border border-emerald-500/25 bg-emerald-500/5 text-emerald-400 flex items-center gap-2 font-bold select-none">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{actionStatus.success}</span>
                </div>
              )}

              {actionStatus.error && (
                <div className="mb-4 p-3 text-xs rounded-xl border border-red-500/25 bg-red-500/5 text-red-400 flex items-center gap-2 font-bold select-none">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{actionStatus.error}</span>
                </div>
              )}

              {/* TAB 1: Analytics and visual charts */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <Users className="w-5 h-5 mx-auto text-teal-400 mb-1" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Total Visits</span>
                      <div className={`text-xl font-bold mt-0.5 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{analytics?.visitors || 0}</div>
                    </div>
                    
                    <div className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <Download className="w-5 h-5 mx-auto text-teal-400 mb-1" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">CV Downloads</span>
                      <div className={`text-xl font-bold mt-0.5 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{analytics?.resumeDownloads || 0}</div>
                    </div>

                    <div className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <FolderGit2 className="w-5 h-5 mx-auto text-teal-400 mb-1" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Project Checks</span>
                      <div className={`text-xl font-bold mt-0.5 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                        {(Object.values(analytics?.projectViews || {}) as number[]).reduce((a, b) => a + b, 0)}
                      </div>
                    </div>
                  </div>

                  {/* Project View Visual graph using simple responsive CSS grids & pure custom design */}
                  <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-6">PROJECTS TRAFFIC INDICES</h4>
                    
                    <div className="space-y-4">
                      {portfolio.projects.map(p => {
                        const count = analytics?.projectViews?.[p.id] || 0;
                        const maxCount = Math.max(...(Object.values(analytics?.projectViews || { x: 1 }) as number[])) || 1;
                        const percent = Math.max(10, Math.min(100, (count / maxCount) * 100));
                        
                        return (
                          <div key={p.id} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className={darkMode ? 'text-slate-250 font-medium' : 'text-slate-705'}>{p.title}</span>
                              <span className="font-mono text-teal-400">{count} views</span>
                            </div>
                            <div className="h-2 w-full bg-slate-500/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Messages review */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-2">Logged Contact Signals</h4>
                  
                  {messages.length === 0 ? (
                    <div className="text-center py-10 font-mono text-xs text-slate-500">
                      [ No current incoming signals logged on disk. ]
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                      {messages.map((m) => (
                        <div 
                          key={m.id}
                          className={`p-5 rounded-xl border relative flex justify-between items-start gap-4 ${
                            darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-750' : 'bg-white border-slate-200 hover:shadow shadow-sm'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap gap-x-2 items-center text-xs">
                              <span className="font-bold text-teal-400">{m.name}</span>
                              <span className="text-slate-500 font-mono">({m.email})</span>
                              <span className="text-slate-500 font-mono text-[10px]">&bull; {new Date(m.timestamp).toLocaleString()}</span>
                            </div>
                            <div className={`text-xs font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                              Subject: {m.subject}
                            </div>
                            <p className={`text-xs whitespace-pre-wrap leading-relaxed pt-1.5 border-t border-slate-500/5 ${
                              darkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              {m.message}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="p-1.5 rounded-lg border border-transparent hover:border-red-500/20 hover:bg-red-500/5 text-slate-400 hover:text-red-400 transition cursor-pointer"
                            title="Remove Submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Configuration details manager template */}
              {activeTab === 'config' && (
                <form onSubmit={handleUpdateConfig} className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-2">LIVE WEBSITE CONFIGURATOR</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1 font-bold">Admin Display Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={`w-full px-3 py-1.5 rounded-xl border font-sans text-xs ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1 font-bold">Institution</label>
                      <input
                        type="text"
                        value={editInstitution}
                        onChange={(e) => setEditInstitution(e.target.value)}
                        className={`w-full px-3 py-1.5 rounded-xl border font-sans text-xs ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1 font-bold">Professional Multi-Title Line</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className={`w-full px-3 py-1.5 rounded-xl border font-sans text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1 font-bold">Hero Tagline Statement</label>
                    <input
                      type="text"
                      value={editTagline}
                      onChange={(e) => setEditTagline(e.target.value)}
                      className={`w-full px-3 py-1.5 rounded-xl border font-sans text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1 font-bold">Biographical introduction</label>
                    <textarea
                      rows={4}
                      value={editAboutMe}
                      onChange={(e) => setEditAboutMe(e.target.value)}
                      className={`w-full px-3 py-1.5 rounded-xl border font-sans text-xs resize-none ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1 font-bold">Academics score (CGPA)</label>
                      <input
                        type="text"
                        value={editCgpa}
                        onChange={(e) => setEditCgpa(e.target.value)}
                        className={`w-full px-3 py-1.5 rounded-xl border font-sans text-xs ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-display font-bold text-xs tracking-wide flex items-center gap-1.5 cursor-pointer shadow shadow-teal-500/10"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Save re-configurations live
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
