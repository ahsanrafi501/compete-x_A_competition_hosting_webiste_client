import React from 'react';
import { motion } from 'framer-motion';
import { Send, Link as LinkIcon, FileText, Clock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const ContinueArena = () => {
  const arenaInfo = {
    id: "ARENA-09",
    name: "Neo-Brutalist UI Blitz",
    deadline: "04:22:59", // This would be dynamic in a real app
    requirements: [
      "Must use at least 2 primary colors.",
      "Thick black borders (min 4px).",
      "No rounded corners (Brutal only).",
      "Responsive layout for Tablet/Mobile."
    ]
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-mono p-4 md:p-8">
      {/* HEADER NAVIGATION */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <Link to="/dashboard/my-enrolled" className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors">
          <div className="p-2 border-2 border-gray-400 group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-black uppercase text-xs">Abandom_Mission</span>
        </Link>
        <div className="bg-primary text-black px-4 py-1 font-black uppercase text-xs border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          Arena_Active // {arenaInfo.id}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: MISSION BRIEFING */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white border-[6px] border-white p-0 shadow-[15px_15px_0px_0px_#8B5CF6]">
            <div className="bg-black p-4 border-b-[6px] border-white flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic">Mission_Brief</h2>
              <Clock size={20} className="text-primary animate-pulse" />
            </div>
            <div className="p-6 text-black space-y-6">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                {arenaInfo.name}
              </h1>
              
              <div className="space-y-4">
                <p className="font-black uppercase text-xs flex items-center gap-2 underline decoration-2">
                  <FileText size={16} /> Requirements:
                </p>
                <ul className="space-y-2">
                  {arenaInfo.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold">
                      <span className="bg-black text-white px-1.5 h-5 flex items-center">0{i+1}</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-accent/20 border-2 border-black border-dashed p-4 flex items-center gap-4">
                <ShieldAlert className="text-black" />
                <p className="text-[10px] font-black uppercase">Plagiarism check is active. Any stolen assets will result in immediate disqualification.</p>
              </div>
            </div>
          </section>

          {/* TIMER BOX */}
          <div className="bg-secondary p-8 border-4 border-white shadow-[8px_8px_0px_0px_#fff] flex flex-col items-center">
            <p className="font-black uppercase text-xs mb-2">Time_Remaining</p>
            <p className="text-6xl font-black italic tracking-widest">{arenaInfo.deadline}</p>
          </div>
        </div>

        {/* RIGHT: SUBMISSION TERMINAL */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black border-[6px] border-white p-8 md:p-12 space-y-10 relative overflow-hidden"
          >
            {/* Background Decorative "Submit" text */}
            <div className="absolute -right-10 top-1/2 -rotate-90 text-[120px] font-black text-white/[0.03] select-none">
              INPUT
            </div>

            <div>
              <h3 className="text-3xl font-black uppercase mb-2">Final_Submission</h3>
              <p className="text-gray-500 font-bold text-xs uppercase italic">Secure upload channel encrypted</p>
            </div>

            <form className="space-y-8 relative z-10">
              {/* Project Link Input */}
              <div className="space-y-2">
                <label className="font-black uppercase text-xs text-primary flex items-center gap-2">
                  <LinkIcon size={14} /> Repository_or_Live_URL
                </label>
                <input 
                  type="url" 
                  placeholder="HTTPS://GITHUB.COM/YOUR-PROJECT"
                  className="w-full bg-transparent border-4 border-white p-4 font-black uppercase text-sm placeholder-gray-700 focus:border-primary outline-none transition-all"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="font-black uppercase text-xs text-primary flex items-center gap-2">
                  <FileText size={14} /> Submission_Notes
                </label>
                <textarea 
                  rows="5"
                  placeholder="BRIEF EXPLANATION OF YOUR TECH STACK AND DESIGN DECISIONS..."
                  className="w-full bg-transparent border-4 border-white p-4 font-black uppercase text-sm placeholder-gray-700 focus:border-primary outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full group bg-white text-black py-6 font-black uppercase text-xl flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-[8px_8px_0px_0px_#8B5CF6] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  Confirm_Deployment <Send size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase justify-center italic">
              <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
              Waiting for signal...
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContinueArena;