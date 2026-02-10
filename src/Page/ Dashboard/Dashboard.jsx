import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { 
  LayoutDashboard, 
  Trophy, 
  UserCircle, 
  PlusSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', path: '/dashboard/overview', icon: <LayoutDashboard size={20} /> },
    { name: 'My Contests', path: '/dashboard/my-contests', icon: <Trophy size={20} /> },
    { name: 'Create', path: '/dashboard/create', icon: <PlusSquare size={20} /> },
    { name: 'Approve Contest', path: 'approve-contests', icon: <UserCircle size={20} /> },
  ];

  const activeClass = "bg-primary text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1 md:translate-x-2";
  const inactiveClass = "bg-white text-black border-2 border-black md:border-transparent hover:border-black hover:bg-accent/10 transition-all";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200 border-t-4 border-black font-mono">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex items-center justify-between bg-white border-b-4 border-black p-4 z-50">
        <h2 className="font-black uppercase tracking-tighter">Control <span className="text-secondary">Panel</span></h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 border-4 border-black bg-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
        </button>
      </div>

      {/* --- SIDEBAR (Tablet & Desktop) / OVERLAY (Mobile) --- */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-40
        w-64 lg:w-72 bg-white border-r-4 border-black p-4 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col gap-6
      `}>
        <div className="hidden md:block px-2 mb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black pb-2">
            System <span className="text-secondary">OS</span>
          </h2>
        </div>

        <nav className="flex flex-col gap-3 flex-grow">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 border-2 font-black uppercase text-sm group ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="block">{item.name}</span>
              <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 hidden lg:block" />
            </NavLink>
          ))}
        </nav>

        <Link to={'/'} className="flex items-center justify-center md:justify-start gap-4 p-4 border-4 border-black bg-error text-white font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
          <LogOut size={20} />
          <span className="block">Back to home</span>
        </Link>
      </aside>

      {/* --- MOBILE BOTTOM NAV (Optional Convenience) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black flex justify-around p-2 z-40">
        {menuItems.slice(0, 4).map((item) => (
          <NavLink key={item.name} to={item.path} className="p-2 border-2 border-transparent text-black">
            {item.icon}
          </NavLink>
        ))}
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 relative pb-20 md:pb-0">
        {/* Retro Grid Background */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: `radial-gradient(circle, #000 1.2px, transparent 1.2px)`, backgroundSize: '20px 20px' }}
        ></div>

        <div className="relative z-10 p-4 sm:p-8 lg:p-12">
          {/* Responsive Header */}
          <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="font-black text-secondary uppercase text-[10px] tracking-[0.2em] bg-black text-white px-2 py-0.5 inline-block">
                Status: Authenticated
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-none">
                Main <span className="bg-primary px-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Console</span>
              </h1>
            </div>
            
            {/* Stats Cards (Stacked on mobile, row on tablet/laptop) */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
               <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[120px]">
                  <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Wins</p>
                  <p className="text-2xl font-black italic">12</p>
               </div>
               <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[120px]">
                  <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Rank</p>
                  <p className="text-2xl font-black text-accent italic">#42</p>
               </div>
            </div>
          </header>

          {/* Dynamic Content Container */}
          <div className="min-h-[70vh] border-4 border-black bg-white p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;