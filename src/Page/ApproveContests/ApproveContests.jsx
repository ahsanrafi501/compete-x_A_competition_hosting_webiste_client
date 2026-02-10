import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Eye, ShieldCheck, AlertCircle, DollarSign, Calendar } from 'lucide-react';

const ApproveContests = () => {
  // Mock data for contests submitted by creators awaiting Admin approval
  const pendingContests = [
    {
      id: "REQ-772",
      name: "Retro UI Blitz",
      creator: "Creative_Unit_01",
      category: "Design",
      prize: "$500",
      fee: "$25",
      deadline: "2026-03-01"
    },
    {
      id: "REQ-889",
      name: "Logic Battle #9",
      creator: "Dev_Core_Node",
      category: "Coding",
      prize: "$1200",
      fee: "$50",
      deadline: "2026-03-05"
    }
  ];

  return (
    <div className="space-y-10 font-mono">
      {/* 1. ADMIN HEADER */}
      <div className="bg-black text-white p-8 border-b-[12px] border-primary flex flex-col md:flex-row justify-between items-center gap-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-primary" size={24} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70">Security_Level: Admin_Alpha</span>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter italic">Pending_Clearance</h2>
        </div>
        <div className="bg-white text-black px-6 py-3 border-4 border-black font-black uppercase italic shadow-[6px_6px_0px_0px_#8B5CF6]">
          Total_Requests: {pendingContests.length}
        </div>
      </div>

      {/* 2. REQUESTS LEDGER */}
      <div className="space-y-6">
        {pendingContests.map((contest, i) => (
          <motion.div
            key={contest.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border-4 border-black p-0 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            {/* ID Bar */}
            <div className="bg-gray-100 border-b-4 border-black p-3 flex justify-between items-center px-6">
              <span className="font-black text-xs uppercase italic">{contest.id} // DEPLOYMENT_REQUEST</span>
              <span className="bg-primary text-black px-2 py-0.5 text-[10px] font-black border-2 border-black">AWAITING_REVIEW</span>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Contest Summary */}
              <div className="lg:col-span-4 border-r-0 lg:border-r-4 border-black lg:pr-8">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-2 leading-none">{contest.name}</h3>
                <p className="font-bold text-secondary uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <AlertCircle size={14} /> Creator: {contest.creator}
                </p>
              </div>

              {/* Financial & Time Data */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1">
                    <DollarSign size={12} /> Prize_Pool
                  </p>
                  <p className="text-xl font-black italic">{contest.prize}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1">
                    <Calendar size={12} /> Deadline
                  </p>
                  <p className="text-xl font-black italic">{contest.deadline}</p>
                </div>
              </div>

              {/* Action Terminal */}
              <div className="lg:col-span-4 flex flex-wrap gap-3 justify-end">
                {/* View Details Modal Trigger */}
                <button className="p-3 bg-white border-4 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                  <Eye size={24} strokeWidth={3} />
                </button>

                {/* APPROVE ACTION */}
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-success text-white px-6 py-3 border-4 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <CheckCircle2 size={18} /> Authorize_Arena
                </button>

                {/* REJECT ACTION */}
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-error text-white px-6 py-3 border-4 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <XCircle size={18} /> Terminate
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. SYSTEM ALERT BOX */}
      <div className="bg-primary/10 border-4 border-black border-dashed p-6 flex items-start gap-4">
        <AlertCircle size={32} className="shrink-0" />
        <div>
          <h4 className="font-black uppercase text-sm italic underline">Review_Protocol_v2.0</h4>
          <p className="text-xs font-bold text-gray-600 uppercase mt-1 leading-relaxed">
            Authorized arenas will be instantly deployed to the public directory. 
            Terminated requests will notify the creator with a "Denied" status. 
            Review carefully; entries with Prize Pools {'>'} $1000 require priority clearance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApproveContests;