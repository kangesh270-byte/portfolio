import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setErrorMsg('Please complete all form fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Transmission failed. Under active maintenance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">Communicate</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left information card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className={`p-8 rounded-3xl border backdrop-blur-xl ${
              darkMode 
                ? 'bg-slate-950/80 border-white/5' 
                : 'bg-white border-slate-200/80 shadow-md'
            }`}>
              <h3 className="text-xl font-display font-bold mb-6 text-cyan-400">
                Contact Specifications
              </h3>
              <p className={`text-sm mb-8 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                Have an opening or collaborative project idea? Drop a word here. Submissions route to physical administrative dashboard telemetry instantly.
              </p>

              {/* Coordinates List */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Primary Mailbox</span>
                    <a href="mailto:kangesh270@gmail.com" className={`text-sm font-semibold hover:text-cyan-400 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      kangesh270@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Academic Base</span>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      Nandha College of Technology, Erode, TN
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social box link */}
            <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
              darkMode ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase font-bold block mb-3">Professional Profiles</span>
              <div className="flex gap-4 font-mono text-xs">
                <a
                  href="https://www.linkedin.com/in/kangeshwaran-v-7b96bb316"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition"
                >
                  <Linkedin className="w-4.5 h-4.5" /> LinkedIn
                </a>
                <a
                  href="https://github.com/kangesh270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition"
                >
                  <Github className="w-4.5 h-4.5" /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right form submission panel */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className={`p-8 md:p-10 rounded-3xl border flex flex-col gap-6 backdrop-blur-xl ${
              darkMode 
                ? 'bg-slate-950/80 border-white/5' 
                : 'bg-white border-slate-200 shadow-md'
            }`}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm ${
                      darkMode ? 'bg-slate-900 border-white/5 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-850'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm ${
                      darkMode ? 'bg-slate-900 border-white/5 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-850'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">Subject Line</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm ${
                    darkMode ? 'bg-slate-900 border-white/5 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-850'
                  }`}
                  placeholder="e.g. Internship Proposition, Project Consulting"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">Message Content</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm resize-none ${
                    darkMode ? 'bg-slate-900 border-white/5 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-8500'
                  }`}
                  placeholder="Type your message details here..."
                />
              </div>

              {/* Status messages */}
              {errorMsg && (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 flex items-center gap-2 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {success && (
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Your message has been safely logged in the server! Admin notified.</span>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-50 font-display font-bold text-sm tracking-wide flex items-center gap-2.5 cursor-pointer shadow-lg shadow-cyan-500/15 transition-all duration-300"
                >
                  {loading ? (
                    'Transmitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Transmit Secure Message
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
