import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Users, Trophy, Calendar, ExternalLink } from "lucide-react";

const Allcard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: cards = [] } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-contests");
      return res.data;
    },
  });

  console.log(cards);
  return (
    <div className="mt-5">
      <h1 className="text-4xl font-extrabold text-center">Choose Contest</h1>

      <div className="grid grid-cols-3 gap-4 mb-3 mt-7 md:px-8">
        {cards.map((card) => (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
          {/* Top Image Section */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-indigo-600 rounded-full shadow-lg">
                {card.cardType}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
              {card.name}
            </h3>

            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
              {card.description}
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-indigo-600 mb-1">
                  <Users size={16} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    Joined
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-800">
                  {card.participantCount}
                </p>
              </div>

              <div className="h-8 w-px bg-gray-200"></div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                  <Trophy size={16} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    Prize
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-800">
                  ${card.prizeMoney}
                </p>
              </div>

              <div className="h-8 w-px bg-gray-200"></div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-rose-500 mb-1">
                  <Calendar size={16} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    Ends
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-800">Dec 31</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-3 px-4 bg-gray-900 hover:bg-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 group">
              View Details
              <ExternalLink
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Allcard;
