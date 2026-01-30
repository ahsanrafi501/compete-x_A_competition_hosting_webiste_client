import React from 'react';
import { Trophy, Medal, Star, Crown } from 'lucide-react';

const LeaderBoard = () => {
  // Dummy data for top competitors
  const leaders = [
    { id: 1, name: "CyberViper", score: 12500, wins: 12, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "NeonGhost", score: 10200, wins: 9, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "PixelPunk", score: 9800, wins: 8, avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "RetroRacer", score: 8500, wins: 6, avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "GlitchKing", score: 7200, wins: 5, avatar: "https://i.pravatar.cc/150?u=5" },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Floating Badge */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-error text-white border-4 border-black px-4 py-1 font-black uppercase rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Season 01
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black">
            Hall of <span className="text-primary drop-shadow-[4px_4px_0px_#000]">Fame</span>
          </h1>
          <p className="font-bold text-black uppercase mt-4 italic">The elite creators of Contest-X</p>
        </div>

        {/* Leaderboard Table Container */}
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-black text-white p-4 font-black uppercase text-xs md:text-sm tracking-widest">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-6">Competitor</div>
            <div className="col-span-2 text-center">Wins</div>
            <div className="col-span-2 text-center">Points</div>
          </div>

          {/* Leader Rows */}
          <div className="divide-y-4 divide-black">
            {leaders.map((user, index) => (
              <div 
                key={user.id} 
                className={`grid grid-cols-12 p-4 items-center transition-colors hover:bg-primary/10 group ${
                  index === 0 ? "bg-primary/5" : ""
                }`}
              >
                {/* Rank with special styling for Top 3 */}
                <div className="col-span-2 flex justify-center">
                  {index === 0 ? (
                    <div className="bg-primary border-4 border-black w-10 h-10 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <Crown size={20} className="text-black" />
                    </div>
                  ) : index === 1 ? (
                    <div className="bg-accent border-4 border-black w-10 h-10 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <Medal size={20} className="text-black" />
                    </div>
                  ) : index === 2 ? (
                    <div className="bg-secondary border-4 border-black w-10 h-10 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <Star size={20} className="text-black" />
                    </div>
                  ) : (
                    <span className="font-black text-2xl text-black">#{index + 1}</span>
                  )}
                </div>

                {/* Profile Info */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="border-4 border-black w-12 h-12 hidden md:block">
                    <img src={user.avatar} alt={user.name} className="w-full h-full grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-black md:text-lg">{user.name}</h3>
                    <div className="h-1 w-0 group-hover:w-full bg-secondary transition-all duration-300"></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="col-span-2 text-center font-black text-black">
                  {user.wins}
                </div>
                
                <div className="col-span-2 text-center">
                   <span className="bg-black text-white px-3 py-1 font-black italic shadow-[3px_3px_0px_0px_#CAEB66]">
                     {user.score.toLocaleString()}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="p-4 bg-white border-4 border-black font-black uppercase text-sm -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Want to see your name here?
            </div>
            <button className="px-8 py-4 bg-error text-white border-4 border-black font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                Enter Next Contest
            </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;