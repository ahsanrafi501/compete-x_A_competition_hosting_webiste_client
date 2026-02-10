import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Award, Zap, ArrowLeft, BarChart3 } from 'lucide-react';
import { Link } from 'react-router';

const FullReview = () => {
  // Mock data for a specific contest review
  const reviewData = {
    contestName: "Neo-Brutalist Web Design",
    submissionDate: "Feb 05, 2026",
    status: "Completed",
    finalScore: 88,
    rank: "#4 / 150",
    prizeWon: "$50",
    feedback: [
      { judge: "System_Admin", comment: "Incredible use of typography. Bold and fearless." },
      { judge: "Creative_Lead", comment: "The color palette is high-energy, but check contrast on mobile." }
    ],
    skillsEarned: [
      { skill: "UI/UX", points: "+450" },
      { skill: "Creativity", points: "+200" },
      { skill: "Speed", points: "+150" }
    ]
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto">
        
        {/* BACK BUTTON */}
        <Link to="/enrolled-contests" className="inline-flex items-center gap-2 mb-8 px-4 py-2 border-4 border-black font-black uppercase text-xs hover:bg-primary transition-colors shadow-[4px_4px_0px_0px_#000]">
          <ArrowLeft size={16} /> Back_To_Registry
        </Link>

        {/* MAIN REVIEW CONTAINER */}
        <div className="bg-white border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
          
          {/* HEADER HEADER */}
          <div className="bg-black text-white p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-primary font-black uppercase text-xs tracking-widest mb-2">Review_Report // {reviewData.submissionDate}</p>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                {reviewData.contestName}
              </h1>
            </div>
            <div className="bg-primary text-black p-6 border-4 border-white rotate-3 shadow-[8px_8px_0px_0px_#8B5CF6]">
              <p className="font-black text-xs uppercase text-center">Final_Score</p>
              <p className="text-6xl font-black italic">{reviewData.finalScore}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* LEFT COLUMN: STATS & SKILLS */}
            <div className="lg:col-span-5 border-b-8 lg:border-b-0 lg:border-r-8 border-black p-8 space-y-10">
              
              {/* RANKING STICKER */}
              <div className="bg-accent border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] -rotate-2">
                <div className="flex items-center gap-3 mb-2">
                  <Award size={24} />
                  <span className="font-black uppercase text-sm">Arena_Standing</span>
                </div>
                <p className="text-5xl font-black">{reviewData.rank}</p>
              </div>

              {/* SKILLS EARNED */}
              <div>
                <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                  <Zap className="text-secondary" /> XP_Breakdown
                </h3>
                <div className="space-y-3">
                  {reviewData.skillsEarned.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-100 p-3 border-2 border-black">
                      <span className="font-black uppercase text-xs">{item.skill}</span>
                      <span className="font-black text-secondary">{item.points} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRIZE SECTION */}
              <div className="p-6 bg-secondary text-white border-4 border-black shadow-[6px_6px_0px_0px_#CAEB66]">
                <p className="font-black uppercase text-[10px] mb-1">Rewards_Claimed</p>
                <p className="text-3xl font-black italic">{reviewData.prizeWon}</p>
              </div>
            </div>

            {/* RIGHT COLUMN: FEEDBACK TERMINAL */}
            <div className="lg:col-span-7 p-8 space-y-8 bg-base-200/50">
              <div>
                <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-6 border-b-4 border-black pb-2">
                  <MessageSquare size={24} /> Judges_Feedback
                </h3>
                
                <div className="space-y-6">
                  {reviewData.feedback.map((f, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="bg-white border-4 border-black p-4 relative"
                    >
                      <div className="absolute -top-3 left-4 bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase">
                        {f.judge}
                      </div>
                      <p className="font-bold italic text-sm text-gray-700 leading-relaxed pt-2">
                        "{f.comment}"
                      </p>
                      <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="black" />)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* PERFORMANCE CHART PLACEHOLDER */}
              <div className="pt-6">
                <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                  <BarChart3 size={24} /> Performance_Metric
                </h3>
                <div className="w-full h-32 border-4 border-black bg-white flex items-end gap-2 p-2">
                    <div className="w-full bg-primary border-2 border-black" style={{ height: '40%' }}></div>
                    <div className="w-full bg-secondary border-2 border-black" style={{ height: '88%' }}></div>
                    <div className="w-full bg-accent border-2 border-black" style={{ height: '60%' }}></div>
                    <div className="w-full bg-black border-2 border-black" style={{ height: '75%' }}></div>
                </div>
                <div className="flex justify-between text-[8px] font-black uppercase mt-1 opacity-50">
                    <span>Layout</span><span>Color</span><span>Typo</span><span>Code</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* FINAL VERDICT STAMP */}
          <div className="bg-black text-primary p-4 text-center font-black uppercase text-2xl tracking-[0.5em] italic">
            Mission_Cleared // Data_Archived
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullReview;