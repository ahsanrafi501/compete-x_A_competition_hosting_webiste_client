import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Star, Bookmark, Trophy, Zap } from 'lucide-react';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyEnrolledContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetching the combined data (Enrollment + Contest Details)
  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ['enrollments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      // Calling the route that performs the $lookup
      const res = await axiosSecure.get(`/my-enrolled-contests?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="p-20 font-black text-4xl animate-pulse uppercase">Syncing_With_Arena_Data...</div>;

  return (
    <div className="min-h-screen bg-white p-4 md:p-12 font-mono">
      <div className="max-w-6xl mx-auto">
        
        {/* --- PAGE HEADER --- */}
        <header className="mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-black text-white px-4 py-1 mb-4 font-black uppercase text-xs rotate-2 shadow-[4px_4px_0px_0px_#8B5CF6]"
          >
            Mission_Registry // User: {user?.displayName?.split(' ')[0] || 'Unknown'}
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none">
            Enrolled <br />
            <span className="text-primary drop-shadow-[4px_4px_0px_#000]">Arenas</span>
          </h1>
          <div className="absolute top-0 right-0 hidden lg:block">
            <div className="w-32 h-32 border-8 border-black rounded-full flex items-center justify-center -rotate-12">
                <Star size={64} fill="currentColor" className="text-accent animate-spin-slow" />
            </div>
          </div>
        </header>

        {/* --- ENROLLMENT LIST --- */}
        <div className="space-y-12">
          {enrollments.length > 0 ? enrollments.map((item, i) => {
            // Note: Data from $lookup is inside item.contestDetails
            const details = item.contestDetails; 

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col lg:flex-row bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
              >
                {/* IMAGE / THUMBNAIL */}
                <div className="w-full lg:w-80 h-64 lg:h-auto border-b-8 lg:border-b-0 lg:border-r-8 border-black relative overflow-hidden bg-gray-200">
                  <img 
                    src={details?.image} 
                    alt={details?.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 font-black uppercase">
                    ID: {item.contestId?.slice(-6)}
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-accent border-4 border-black px-4 py-1 font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_#000]">
                        {details?.contestType}
                      </span>
                      <div className="flex items-center gap-2 font-black text-xs uppercase">
                        <Clock size={16} /> Deadline: {details?.deadline}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic leading-none group-hover:text-secondary transition-colors">
                      {details?.name}
                    </h3>
                    
                    <p className="text-xs font-bold text-gray-500 uppercase mb-6 line-clamp-2 italic">
                      "{details?.description}"
                    </p>

                    {/* STATUS INDICATOR (Based on your enrolled DB 'status') */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-black text-white px-3 py-1 text-[10px] font-black uppercase">
                           <Zap size={12} className="text-primary fill-primary" /> Status: {item.status}
                        </div>
                        <div className="text-[10px] font-black uppercase text-gray-400">
                           Enrolled_At: {new Date(item.enrolledAt).toLocaleDateString()}
                        </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTIONS */}
                  <div className="flex flex-wrap items-center gap-6 pt-6 border-t-4 border-black border-dashed">
                    <div className="flex items-center gap-2">
                      <Trophy size={20} className="text-secondary" />
                      <p className="font-black uppercase text-xs text-gray-400">Prize_Pool</p>
                      <p className="text-2xl font-black italic">${details?.prizeMoney}</p>
                    </div>
                    
                    <div className="flex-grow"></div>

                    <Link 
                      to={`/submit-content/${item.contestId}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 bg-secondary text-white px-8 py-4 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-sm"
                    >
                      Submit_Content <ArrowRight size={18} strokeWidth={3} />
                    </Link>
                  </div>
                </div>

                {/* SUCCESS RIBBON */}
                {item.status === "winner" && (
                  <div className="absolute -top-4 -right-4 bg-success text-white border-4 border-black px-6 py-2 font-black uppercase rotate-[15deg] shadow-[4px_4px_0px_0px_#000] z-20">
                    Grand_Winner
                  </div>
                )}
              </motion.div>
            );
          }) : (
            <div className="text-center p-20 border-8 border-black border-dashed">
               <h2 className="text-4xl font-black uppercase text-gray-300 italic">No_Active_Missions_Found</h2>
               <p className="mt-4 font-bold text-gray-400 uppercase">Your mission registry is currently empty.</p>
            </div>
          )}
        </div>

        {/* --- CTA FOOTER --- */}
        <div className="mt-24 bg-primary border-8 border-black p-8 md:p-12 text-center shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
           <Bookmark size={48} className="mx-auto mb-6" />
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Hungry for More?</h2>
           <p className="font-bold text-lg md:text-xl uppercase mb-8 italic">The arena never sleeps. New missions drop every 24 hours.</p>
           <Link to="/all-contests" className="inline-block bg-black text-white px-10 py-5 border-4 border-black font-black uppercase text-xl shadow-[6px_6px_0px_0px_#8B5CF6] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
             Browse_All_Arenas
           </Link>
        </div>

      </div>
    </div>
  );
};

export default MyEnrolledContests;