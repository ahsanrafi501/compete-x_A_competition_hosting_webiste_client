import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, ArrowRight, Star, Bookmark } from 'lucide-react';
import { Link } from 'react-router';

const MyEnrolledContests = () => {
  // Data for the contests the user has enrolled in
  const enrollments = [
    {
      id: "CON-99",
      name: "Neo-Brutalist Web Design",
      category: "Design",
      status: "Active",
      progress: 65,
      deadline: "3 Days Left",
      prize: "$1,500",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "CON-42",
      name: "The TypeScript Gauntlet",
      category: "Coding",
      status: "Completed",
      progress: 100,
      deadline: "Finished",
      prize: "$800",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&auto=format&fit=crop"
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-12 font-mono">
      <div className="max-w-6xl mx-auto">
        
        {/* --- PAGE HEADER --- */}
        <header className="mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-black text-white px-4 py-1 mb-4 font-black uppercase text-xs rotate-2"
          >
            Mission_Registry // User_Active
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none">
            Enrolled <br />
            <span className="text-primary drop-shadow-[4px_4px_0px_#000]">Arenas</span>
          </h1>
          <div className="absolute top-0 right-0 hidden lg:block">
            <div className="w-32 h-32 border-8 border-black rounded-full flex items-center justify-center -rotate-12 animate-pulse">
                <Star size={64} fill="currentColor" className="text-accent" />
            </div>
          </div>
        </header>

        {/* --- ENROLLMENT LIST --- */}
        <div className="space-y-12">
          {enrollments.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col lg:flex-row bg-white border-8 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              {/* IMAGE / THUMBNAIL */}
              <div className="w-full lg:w-80 h-64 lg:h-auto border-b-8 lg:border-b-0 lg:border-r-8 border-black relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* CONTENT AREA */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-accent border-4 border-black px-4 py-1 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 font-black text-sm uppercase">
                      <Clock size={18} /> {item.deadline}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 italic">
                    {item.name}
                  </h3>

                  {/* PROGRESS TRACKER */}
                  <div className="mb-8 max-w-md">
                    <div className="flex justify-between font-black uppercase text-xs mb-2">
                        <span>Completion_Rate</span>
                        <span>{item.progress}%</span>
                    </div>
                    <div className="w-full h-6 border-4 border-black bg-gray-100 p-1">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full border-r-4 border-black ${item.progress === 100 ? 'bg-success' : 'bg-primary'}`}
                        />
                    </div>
                  </div>
                </div>

                {/* BOTTOM ACTIONS */}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t-4 border-black border-dashed">
                  <div className="flex items-center gap-2">
                    <p className="font-black uppercase text-xs text-gray-400">Prize_Target</p>
                    <p className="text-2xl font-black">{item.prize}</p>
                  </div>
                  
                  <div className="flex-grow"></div>

                  <Link 
                    to={`/contest-details/${item.id}`}
                    className="flex items-center gap-3 bg-secondary text-white px-8 py-4 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    {item.status === "Completed" ? "Review Mission" : "Continue Arena"}
                    <ArrowRight size={20} strokeWidth={3} />
                  </Link>
                </div>
              </div>

              {/* SIDE STATUS RIBBON */}
              {item.status === "Completed" && (
                <div className="absolute -top-4 -left-4 bg-success text-white border-4 border-black px-4 py-1 font-black uppercase rotate-[-12deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
                  Mission_Cleared
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- CTA FOOTER --- */}
        <div className="mt-24 bg-primary border-8 border-black p-12 text-center shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
           <Bookmark size={48} className="mx-auto mb-6" />
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Hungry for More?</h2>
           <p className="font-bold text-xl uppercase mb-8 italic">The arena never sleeps. New contests drop every 24 hours.</p>
           <Link to="/all-contests" className="inline-block bg-black text-white px-12 py-6 border-4 border-black font-black uppercase text-2xl shadow-[8px_8px_0px_0px_#8B5CF6] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
             Browse_All_Arenas
           </Link>
        </div>

      </div>
    </div>
  );
};

export default MyEnrolledContests;