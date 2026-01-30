import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { 
  LayoutDashboard, 
  Trophy, 
  UserCircle, 
  PlusSquare, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  // Navigation Links based on User Role (You can filter these based on your Auth context)
  const menuItems = [
    { name: 'Overview', path: '/dashboard/overview', icon: <LayoutDashboard size={20} /> },
    { name: 'My Contests', path: '/dashboard/my-contests', icon: <Trophy size={20} /> },
    { name: 'Create Contest', path: '/dashboard/create', icon: <PlusSquare size={20} /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <UserCircle size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  const activeClass = "bg-primary text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1";
  const inactiveClass = "bg-white text-black border-transparent hover:border-black hover:bg-accent/10 hover:translate-x-1 transition-all";

  return (
    <div className="flex min-h-screen bg-base-200 border-t-4 border-black">
      {/* SIDEBAR */}
      <aside className="w-20 md:w-72 bg-white border-r-4 border-black p-4 flex flex-col gap-8 z-20">
        <div className="hidden md:block px-2">
          <h2 className="text-xl font-black uppercase tracking-tighter border-b-4 border-black pb-2">
            Control <span className="text-secondary">Panel</span>
          </h2>
        </div>

        <nav className="flex flex-col gap-4 flex-grow">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 border-2 font-black uppercase text-sm transition-all ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="hidden md:block">{item.name}</span>
              <ChevronRight size={16} className="ml-auto hidden md:block opacity-0 group-hover:opacity-100" />
            </NavLink>
          ))}
        </nav>

        {/* Logout at bottom */}
        <button className="flex items-center gap-4 p-4 border-4 border-black bg-error text-white font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
          <LogOut size={20} />
          <span className="hidden md:block">Exit System</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative">
        {/* Retro Grid Background Overlay */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`, 
            backgroundSize: '24px 24px' 
          }}
        ></div>

        <div className="relative z-10 p-6 md:p-10">
          {/* Top Welcome Header */}
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-black text-secondary uppercase text-xs tracking-widest mb-1">Authenticated // User_Mode</p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
                Main <span className="bg-primary px-2 border-2 border-black">Dashboard</span>
              </h1>
            </div>
            
            <div className="hidden md:flex gap-4">
               <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-[10px] font-black uppercase text-gray-500">Active Wins</p>
                  <p className="text-xl font-black">12</p>
               </div>
               <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-[10px] font-black uppercase text-gray-500">Global Rank</p>
                  <p className="text-xl font-black text-accent">#42</p>
               </div>
            </div>
          </header>

          {/* Child Routes Render Here */}
          <div className="min-h-[60vh] border-4 border-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;