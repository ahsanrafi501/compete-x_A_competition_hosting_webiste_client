import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCcw, Terminal } from 'lucide-react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 font-mono overflow-hidden relative">
      
      {/* BACKGROUND GLITCH TEXT */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[30vw] font-black text-white leading-none">404</h1>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        
        {/* THE MAIN ERROR CARD */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-[10px] border-white shadow-[20px_20px_0px_0px_#8B5CF6] p-0 overflow-hidden"
        >
          {/* HEADER BAR */}
          <div className="bg-black p-4 flex justify-between items-center border-b-8 border-white">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-error border-2 border-white animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-primary border-2 border-white" />
              <div className="w-4 h-4 rounded-full bg-accent border-2 border-white" />
            </div>
            <span className="text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
              <AlertTriangle size={14} className="text-primary" /> ERROR_CODE: NULL_POINTER
            </span>
          </div>

          <div className="p-8 md:p-12 text-center bg-black">
            {/* LARGE GLITCH TITLE */}
            <motion.h1 
              animate={{ 
                x: [-2, 2, -2],
                textShadow: [
                  "2px 0px #FDE047",
                  "-2px 0px #8B5CF6",
                  "2px 0px #FDE047"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="text-7xl md:text-9xl font-black text-white italic leading-none mb-6"
            >
              404
            </motion.h1>

            <div className="space-y-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tighter">
                Arena_Not_Found
              </h2>
              <p className="text-gray-400 font-bold text-sm uppercase leading-relaxed max-w-sm mx-auto">
                The coordinates you entered do not exist in the current simulation. The arena has been de-rezzed.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="bg-primary text-black px-8 py-4 border-4 border-white font-black uppercase text-sm flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <Home size={18} /> Emergency_Home
              </Link>
              
              <button 
                onClick={() => window.location.reload()}
                className="bg-transparent text-white px-8 py-4 border-4 border-white font-black uppercase text-sm flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
              >
                <RefreshCcw size={18} /> Reboot_System
              </button>
            </div>
          </div>

          {/* FOOTER LOG */}
          <div className="bg-secondary p-4 border-t-8 border-white">
            <div className="flex items-center gap-4">
              <Terminal size={20} className="text-black" />
              <marquee className="font-black uppercase text-xs tracking-widest text-black">
                FATAL ERROR // RETRACING BOOT SECTOR // LOST IN THE VOID // CONTACT ADMIN_X // 
              </marquee>
            </div>
          </div>
        </motion.div>

        {/* FLOATING DECORATIVE STICKER */}
        <motion.div 
          animate={{ rotate: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-10 hidden md:block bg-accent border-4 border-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-6"
        >
          <p className="font-black text-black text-2xl uppercase italic">RESTR_ICTED</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;