import React from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, Users, Zap, Search, ChevronRight, Trophy } from 'lucide-react';
import { Link } from 'react-router';

const MyContests = () => {
  // Mock data for contests that have been APPROVED by Admin
  const approvedArenas = [
    { id: 1, name: "Retro UI Blitz", category: "Design", participants: 45, prize: "$500", deadline: "2026-02-15" },
    { id: 4, name: "Neo-Brutal Typography", category: "Design", participants: 12, prize: "$300", deadline: "2026-02-20" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. STATUS HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white border-8 border-black p-8 shadow-[15px_15px_0px_0px_#8B5CF6]">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter italic">Live_Arenas</h2>
          <p className="font-bold text-gray-500 uppercase text-[10px] tracking-widest mt-2 flex items-center gap-2">
            <Zap size={14} className="text-primary fill-primary" /> Active missions currently deployed in the field
          </p>
        </div>
        
        <div className="flex bg-black p-2 border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className="px-4 py-2 bg-white border-2 border-black">
                <p className="text-[10px] font-black uppercase leading-none">Total_Participants</p>
                <p className="text-2xl font-black italic">57</p>
            </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER BAR */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="FILTER_ACTIVE_MISSIONS..." 
            className="w-full p-4 border-4 border-black font-black uppercase text-xs focus:bg-primary/5 outline-none"
          />
          <Search className="absolute right-4 top-4" size={20} />
        </div>
      </div>

      {/* 3. LIVE CONTEST CARDS */}
      <div className="grid grid-cols-1 gap-6">
        {approvedArenas.map((arena, i) => (
          <motion.div
            key={arena.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white border-4 border-black flex flex-col lg:flex-row items-stretch shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            {/* Participant Counter Side-tab */}
            <div className="bg-primary border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 flex flex-col items-center justify-center min-w-[120px]">
              <Users size={32} strokeWidth={3} />
              <p className="text-2xl font-black mt-1">{arena.participants}</p>
              <p className="text-[8px] font-black uppercase">Enrolled</p>
            </div>

            {/* Main Info */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 uppercase italic">
                  {arena.category}
                </span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Ends: {arena.deadline}
                </span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-secondary transition-colors">
                {arena.name}
              </h3>
            </div>

            {/* Action Terminal */}
            <div className="border-t-4 lg:border-t-0 lg:border-l-4 border-black p-6 flex flex-wrap lg:flex-nowrap items-center gap-4 bg-gray-50">
              <div className="flex-grow lg:flex-grow-0 lg:min-w-[120px]">
                <p className="text-[10px] font-black uppercase text-gray-400">Total_Prize</p>
                <p className="text-2xl font-black italic">{arena.prize}</p>
              </div>

              <div className="flex gap-3 w-full lg:w-auto">
                {/* VIEW SUBMISSIONS BUTTON */}
                <Link 
                  to={`/dashboard/submissions/${arena.id}`}
                  className="flex-1 lg:flex-none flex items-center gap-2 bg-white border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Eye size={16} /> Submissions
                </Link>

                {/* DECLARE WINNER BUTTON (The high-stakes action) */}
                <button 
                  className="flex-1 lg:flex-none flex items-center gap-2 bg-secondary text-white border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Trophy size={16} /> Declare_Winner
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. SYSTEM FOOTER INFO */}
      <div className="border-4 border-black border-dashed p-6 flex items-center gap-4 bg-accent/10">
        <Award size={32} className="text-secondary" />
        <div>
            <h4 className="font-black uppercase text-sm">Winner_Selection_Protocol</h4>
            <p className="text-xs font-bold text-gray-600 uppercase">Once a winner is declared, the arena will be archived and the prize money will be processed for distribution.</p>
        </div>
      </div>
    </div>
  );
};

export default MyContests;