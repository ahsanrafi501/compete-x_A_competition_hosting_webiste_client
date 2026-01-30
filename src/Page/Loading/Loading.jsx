import React from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldAlert, Activity, Database } from "lucide-react";

const Loading = () => {
  const bootSequence = [
    "Initializing Kernel...",
    "Connecting to Contest-X Server...",
    "Injecting Retro Vibes...",
    "Accessing Creative Database...",
    "Decrypting Prize Pool...",
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* 1. SCANNLINE EFFECT */}
      <motion.div
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-20 bg-primary/20 z-50 pointer-events-none blur-xl"
      />

      {/* 2. BACKGROUND GRID MARQUEE */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      {/* 3. MAIN TERMINAL CARD */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-white border-[10px] border-black shadow-[30px_30px_0px_0px_#8B5CF6] p-0 overflow-hidden z-10"
      >
        {/* Top Header */}
        <div className="bg-black p-4 flex justify-between items-center">
          <div className="flex gap-3">
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-4 h-4 bg-error" />
            <div className="w-4 h-4 bg-primary" />
            <div className="w-4 h-4 bg-accent" />
          </div>
          <span className="text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
            <Activity size={14} className="text-primary" /> System_Status: Critical
          </span>
        </div>

        <div className="p-8">
          {/* Logo & Title */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            <motion.div 
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-4 bg-primary border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <Terminal size={50} strokeWidth={3} />
            </motion.div>
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none">
                Booting <span className="text-secondary">Arena</span>
              </h1>
              <p className="font-mono text-xs font-bold mt-2 text-gray-400">UUID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>

          {/* BRUTALIST PROGRESS BAR */}
          <div className="relative mb-10">
            <div className="flex justify-between font-black uppercase text-sm mb-2 italic">
              <span className="flex items-center gap-2 text-secondary">
                <Database size={16} /> Syncing_Data
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                99%
              </motion.span>
            </div>
            <div className="w-full h-16 border-[6px] border-black bg-gray-100 p-1 relative">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-full bg-primary border-r-4 border-black flex items-center justify-center overflow-hidden"
              >
                <div className="whitespace-nowrap font-black text-black text-xl italic uppercase">
                  LOADING_LOADING_LOADING_LOADING_LOADING
                </div>
              </motion.div>
            </div>
          </div>

          {/* BOOT LOGS */}
          <div className="bg-black p-6 space-y-2">
            {bootSequence.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="flex items-center gap-3 text-xs md:text-sm font-mono font-bold"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-white uppercase">{text}</span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (i * 0.4) + 0.3 }}
                  className="text-success ml-auto"
                >
                  [COMPLETE]
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-accent border-t-4 border-black p-3 flex items-center gap-4">
          <ShieldAlert size={20} className="text-black animate-pulse" />
          <marquee className="font-black uppercase text-xs tracking-widest text-black">
            Caution: High Levels of Creativity Detected // Enter the Arena at your own risk // No boring designs allowed //
          </marquee>
        </div>
      </motion.div>

      {/* FLOATING DECORATIONS */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-10 right-10 p-6 bg-error border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-6 hidden lg:block"
      >
        <p className="font-black text-white text-3xl uppercase">Win_Big</p>
      </motion.div>
    </div>
  );
};

export default Loading;