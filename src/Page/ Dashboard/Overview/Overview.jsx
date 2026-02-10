import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Target, TrendingUp, Clock, Flame } from 'lucide-react';

const Overview = () => {
  // Mock data for the dashboard
  const stats = [
    { label: 'Total XP', value: '24,500', icon: <Zap />, color: 'bg-primary' },
    { label: 'Arenas Joined', value: '12', icon: <Target />, color: 'bg-accent' },
    { label: 'Victories', value: '04', icon: <Trophy />, color: 'bg-secondary' },
    { label: 'Win Streak', value: '3 Day', icon: <Flame />, color: 'bg-error' },
  ];

  const recentActivity = [
    { event: 'Submission Received', contest: 'Retro UI Blitz', time: '2h ago', status: 'Pending' },
    { event: 'Victory Achieved', contest: 'Logic Battle #9', time: '1d ago', status: 'Winner' },
    { event: 'Joined Arena', contest: 'GenZ Branding', time: '3d ago', status: 'Active' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-start gap-4"
          >
            <div className={`${stat.color} p-3 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
              {React.cloneElement(stat.icon, { size: 24, strokeWidth: 3 })}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black italic">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. PROGRESS CHART AREA (Placeholder for a Chart) */}
        <div className="lg:col-span-2 bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-6 overflow-hidden relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black uppercase italic flex items-center gap-2">
              <TrendingUp /> XP_Growth_Log
            </h3>
            <span className="text-[10px] font-black bg-black text-white px-2 py-1 uppercase">Live_Stream</span>
          </div>
          
          {/* Simple CSS-based Bar Chart Visualization */}
          <div className="h-64 flex items-end gap-3 pt-10 px-2 border-b-4 border-black">
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className={`w-full border-2 border-black border-b-0 ${i === 6 ? 'bg-primary' : 'bg-secondary/20 group-hover:bg-secondary'} transition-colors shadow-[2px_0px_0px_0px_rgba(0,0,0,1)]`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-black uppercase">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* 3. RECENT ACTIVITY LIST */}
        <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_#8B5CF6] p-6">
          <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2">
            <Clock /> Live_Feed
          </h3>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="border-2 border-black p-3 bg-base-200 group hover:bg-black hover:text-white transition-all cursor-pointer">
                <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                  <span className="text-secondary group-hover:text-primary">{act.event}</span>
                  <span className="opacity-50">{act.time}</span>
                </div>
                <p className="font-black uppercase text-sm tracking-tight">{act.contest}</p>
                <div className="mt-2 text-[8px] font-black bg-white text-black border border-black inline-block px-1">
                  STATUS: {act.status}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-white transition-all">
            View_All_Logs
          </button>
        </div>
      </div>

      {/* 4. CALL TO ACTION STRIP */}
      <div className="bg-accent border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-4 -rotate-1 hover:rotate-0 transition-transform">
        <div className="flex items-center gap-4">
          <div className="bg-white border-2 border-black p-2 animate-bounce">
            <Trophy className="text-black" />
          </div>
          <h4 className="text-xl font-black uppercase leading-none">
            New Arena Available: <span className="underline decoration-black">Cyber-Punk Challenge</span>
          </h4>
        </div>
        <button className="bg-black text-white px-8 py-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          Join_Now
        </button>
      </div>
    </div>
  );
};

export default Overview;