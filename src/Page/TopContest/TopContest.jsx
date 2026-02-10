import React from "react";
import { Users, Trophy, Calendar, ExternalLink, Zap } from "lucide-react";
import { Link } from "react-router";

const TopContest = ({searchContest}) => {
  

  console.log(Array.isArray(searchContest))

  const cards = [...searchContest]

  const linkStyles = ({ isActive }) =>
    `px-4 py-2 font-black uppercase text-sm transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] btn${
      isActive ? "bg-primary text-black -rotate-2" : "bg-white text-black"
    }`;

  return (
    <div className="mt-12 mb-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
          Pick Your{" "}
          <span className="text-secondary drop-shadow-[4px_4px_0px_#00F0FF]">
            Battle
          </span>
        </h1>
        <div className="h-3 w-56 bg-primary mx-auto mt-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-12">
        {cards.map((card) => (
          <div
            key={card._id}
            className="group bg-white border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[15px_15px_0px_0px_#8B5CF6] transition-all hover:-translate-x-1 hover:-translate-y-1 overflow-hidden flex flex-col"
          >
            {/* Top Image Section */}
            <div className="relative h-60 border-b-4 border-black overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover  group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              {/* Badge using Accent Color (Cyan) */}
              <div className="absolute top-0 right-0 bg-accent border-l-4 border-b-4 border-black px-4 py-2 font-black uppercase text-xs tracking-widest italic text-black">
                {card.contestType || "Challenger"}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col">
              <h3 className="text-2xl font-black text-black mb-3 uppercase tracking-tight leading-none min-h-12 line-clamp-2">
                {card.name}
              </h3>

              <p className="text-gray-600 font-bold text-sm mb-6 line-clamp-2 italic leading-snug">
                "{card.description}"
              </p>

              {/* Stats Grid - Using your Primary (Yellow) and Accent (Cyan) */}
              <div className="grid grid-cols-3 border-4 border-black mb-8 bg-black">
                <div className="p-3 bg-white border-r-4 border-black text-center">
                  <div className="flex flex-col items-center justify-center text-black">
                    <Users
                      size={18}
                      strokeWidth={3}
                      className="text-secondary"
                    />
                    <span className="text-[9px] font-black uppercase mt-1 leading-none">
                      Joined
                    </span>
                    <p className="text-lg font-black">
                      {card.participantCount}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-primary border-r-4 border-black text-center">
                  <div className="flex flex-col items-center justify-center text-black">
                    <Trophy size={18} strokeWidth={3} />
                    <span className="text-[9px] font-black uppercase mt-1 leading-none">
                      Prize
                    </span>
                    <p className="text-lg font-black">${card.prizeMoney}</p>
                  </div>
                </div>

                <div className="p-3 bg-accent text-center">
                  <div className="flex flex-col items-center justify-center text-black">
                    <Zap size={18} strokeWidth={3} className="animate-pulse" />
                    <span className="text-[9px] font-black uppercase mt-1 leading-none">
                      Status
                    </span>
                    <p className="text-xs font-black uppercase italic mt-1">
                      Live
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Link - Using Secondary (Violet) & Error (Pink) on hover */}
              <Link
                to={`/contest/${card._id}`}
                className="mt-auto w-full py-5 px-4 bg-secondary text-white font-black uppercase text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-error hover:text-white active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-3 transition-all tracking-widest"
              >
                Enter Arena
                <ExternalLink size={22} strokeWidth={4} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12 mb-8">
        <div className="relative group p-6 bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[15px_15px_0px_0px_#FDE047] transition-all hover:-translate-x-1 hover:-translate-y-1 w-full max-w-sm flex flex-col items-center gap-4">
          {/* Decorative Badge */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-white border-4 border-black px-4 py-1 font-black uppercase text-xs rotate-2">
            Quick Access
          </div>

          <p className="text-black font-black uppercase text-center text-sm mt-2">
            Ready to explore more?
          </p>

          <Link
            to="/all-contests"
            className={`w-full text-center ${linkStyles}`}
          >
            Browse All Contests
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopContest;
