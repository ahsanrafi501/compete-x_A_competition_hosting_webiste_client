import React from 'react';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Send, 
  Shield, 
  Globe, 
  Cpu,
  Zap
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080808] border-t-[8px] border-white font-mono text-white">
      {/* 1. DYNAMIC TOP STRIP (High Contrast) */}
      <div className="bg-primary py-4 border-b-4 border-white overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-black font-black uppercase text-xs tracking-[0.3em]">
          SYSTEM_STABLE // CONNECTING_NODES // 128_ACTIVE_CONTESTS // $500K_PRIZE_POOL_LIVE // JOIN_THE_ARENA // &nbsp;
          SYSTEM_STABLE // CONNECTING_NODES // 128_ACTIVE_CONTESTS // $500K_PRIZE_POOL_LIVE // JOIN_THE_ARENA // &nbsp;
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* BRAND & LOGO SECTION */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-block bg-white border-4 border-primary p-4 shadow-[8px_8px_0px_0px_#8B5CF6]">
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none italic text-black">
                COMPETE <br /> ARENA
              </h2>
            </div>
            <p className="text-sm font-bold uppercase leading-tight max-w-sm text-gray-400">
              The premier battlefield for designers, developers, and creative legends. <span className="text-white">Prove your worth. Claim the prize.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {[<Twitter />, <Github />, <Instagram />, <Linkedin />].map((icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="p-3 bg-black border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all hover:bg-primary hover:text-black"
                >
                  {React.cloneElement(icon, { size: 20, strokeWidth: 3 })}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-black uppercase text-primary text-lg underline decoration-4 decoration-white underline-offset-8">Discovery</h4>
            <ul className="space-y-3 font-black uppercase text-xs">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Zap size={12}/> All_Arenas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Zap size={12}/> Leaderboard</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Zap size={12}/> Success_Stories</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-black uppercase text-secondary text-lg underline decoration-4 decoration-white underline-offset-8">Support</h4>
            <ul className="space-y-3 font-black uppercase text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">System_Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help_Terminal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creator_FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact_Admin</a></li>
            </ul>
          </div>

          {/* NEWSLETTER BOX (Glow Effect) */}
          <div className="lg:col-span-4 bg-white/5 border-4 border-white p-6 shadow-[12px_12px_0px_0px_#8B5CF6] relative overflow-hidden group">
            <Cpu className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform text-primary" size={120} />
            
            <h4 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-white">
              <Send size={20} className="text-primary" /> Subscribe_Intel
            </h4>
            <div className="space-y-3 relative z-10">
              <input 
                type="email" 
                placeholder="ENTER_ENCRYPTED_EMAIL" 
                className="w-full p-3 border-4 border-white bg-black font-black uppercase text-xs placeholder-gray-600 focus:border-primary outline-none transition-all"
              />
              <button className="w-full bg-primary text-black py-3 font-black uppercase text-xs shadow-[4px_4px_0px_0px_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:bg-white">
                Secure_Intel_Stream
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="mt-16 pt-8 border-t-4 border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <Shield size={16} /> 
            <span>Encrypted Connection // CC_{currentYear}_ARENA</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-black uppercase text-[10px] bg-white text-black px-3 py-1 border-2 border-black">
              <Globe size={12} className="text-secondary" /> Region: Global_Node
            </div>
            <div className="flex gap-4 font-black uppercase text-[10px] italic text-gray-500">
              <a href="#" className="hover:text-primary transition-all">Privacy</a>
              <a href="#" className="hover:text-primary transition-all">Terms</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 2. THE FINAL DECORATIVE BLOCK */}
      <div className="h-10 bg-secondary border-t-4 border-white flex items-center justify-center">
        <p className="font-black text-[10px] uppercase tracking-[0.5em] text-white">
          END_OF_LINE // SYSTEM_ID: 882-XQ
        </p>
      </div>
    </footer>
  );
};

export default Footer;