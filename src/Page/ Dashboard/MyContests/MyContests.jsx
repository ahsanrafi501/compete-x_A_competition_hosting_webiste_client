import React from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, Users, Zap, Search, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';

const MyContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const { data: approvedArenas = [], isLoading } = useQuery({
    queryKey: ['mycontests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contests?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Calculate dynamic total participants from the live data
  const totalParticipants = approvedArenas.reduce((acc, curr) => acc + (curr.participantCount || 0), 0);

  if (isLoading) return <div className="p-10 font-black animate-pulse">LOADING_ARENA_DATA...</div>;

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 md:px-0">
      
      {/* 1. STATUS HEADER - Stacks on Mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white border-4 md:border-8 border-black p-4 md:p-8 shadow-[10px_10px_0px_0px_#8B5CF6] md:shadow-[15px_15px_0px_0px_#8B5CF6]">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Live_Arenas</h2>
          <p className="font-bold text-gray-500 uppercase text-[8px] md:text-[10px] tracking-widest mt-2 flex items-center gap-2">
            <Zap size={14} className="text-primary fill-primary" /> Active missions in the field
          </p>
        </div>
        
        <div className="flex bg-black p-1 md:p-2 border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-end sm:self-auto">
            <div className="px-3 md:px-4 py-1 md:py-2 bg-white border-2 border-black">
                <p className="text-[8px] md:text-[10px] font-black uppercase leading-none">Total_Warriors</p>
                <p className="text-xl md:text-2xl font-black italic">{totalParticipants}</p>
            </div>
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="FILTER_MISSIONS..." 
          className="w-full p-3 md:p-4 border-4 border-black font-black uppercase text-[10px] md:text-xs focus:bg-primary/5 outline-none"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2" size={18} />
      </div>

      {/* 3. LIVE CONTEST CARDS - Dynamic stack/row */}
      <div className="grid grid-cols-1 gap-6">
        {approvedArenas.length > 0 ? approvedArenas.map((arena, i) => (
          <motion.div
            key={arena._id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white border-4 border-black flex flex-col md:flex-row items-stretch shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            {/* Participant Counter - Side on Desktop, Top Bar on Mobile */}
            <div className="bg-primary border-b-4 md:border-b-0 md:border-r-4 border-black p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center min-w-[120px]">
              <div className="flex items-center md:flex-col gap-2">
                <Users size={24} className="md:w-8 md:h-8" strokeWidth={3} />
                <p className="text-xl md:text-2xl font-black">{arena.participantCount || 0}</p>
              </div>
              <p className="text-[8px] font-black uppercase">Enrolled</p>
            </div>

            {/* Main Info */}
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] md:text-[10px] font-black bg-black text-white px-2 py-0.5 uppercase italic">
                  {arena.contestType || arena.category}
                </span>
                <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Ends: {arena.deadline}
                </span>
              </div>
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-secondary transition-colors leading-tight">
                {arena.name}
              </h3>
            </div>

            {/* Action Terminal - Vertically stacked on mobile, row on desktop */}
            <div className="border-t-4 md:border-t-0 md:border-l-4 border-black p-4 md:p-6 flex flex-col sm:flex-row md:flex-row items-center gap-4 bg-gray-50">
              <div className="w-full sm:w-auto text-left md:min-w-[100px]">
                <p className="text-[8px] font-black uppercase text-gray-400">Prize</p>
                <p className="text-xl md:text-2xl font-black italic">${arena.prizeMoney || arena.prize}</p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {/* SUBMISSIONS */}
                <Link 
                  to={`/dashboard/submissions/${arena._id}`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 md:border-4 border-black px-3 md:px-4 py-2 font-black uppercase text-[10px] shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Eye size={14} /> <span className="hidden sm:inline">View_</span>Entries
                </Link>

                {/* DECLARE WINNER */}
                <button 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-secondary text-white border-2 md:border-4 border-black px-3 md:px-4 py-2 font-black uppercase text-[10px] shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Trophy size={14} /> <span className="hidden sm:inline">Set_</span>Winner
                </button>
              </div>
            </div>
          </motion.div>
        )) : (
            <div className="p-10 border-4 border-black border-dashed text-center font-black uppercase text-gray-400">
                No_Active_Missions_Found
            </div>
        )}
      </div>

      {/* 4. SYSTEM FOOTER - Icon hidden on small mobile to save space */}
      <div className="border-4 border-black border-dashed p-4 md:p-6 flex items-center gap-4 bg-accent/10">
        <Award size={32} className="text-secondary hidden sm:block shrink-0" />
        <div>
            <h4 className="font-black uppercase text-xs md:text-sm">Winner_Selection_Protocol</h4>
            <p className="text-[8px] md:text-xs font-bold text-gray-600 uppercase mt-1 leading-relaxed">
                Confirm your choice carefully. Once a winner is declared, the mission is closed for entries and prize distribution begins.
            </p>
        </div>
      </div>
    </div>
  );
};

export default MyContests;