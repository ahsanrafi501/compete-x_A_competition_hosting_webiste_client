import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, DollarSign, Timer, Trophy, Send, X, Lock, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

const ContestDetails = () => {
    const { id } = useParams();
    const [isRegistered, setIsRegistered] = useState(false); // Check if user has paid
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Mock Data - In reality, fetch this using useQuery or useEffect
    const contest = {
        name: "Retro Logo Blitz",
        image: "https://images.unsplash.com/photo-1635339001026-6157d0794401?q=80&w=1200&auto=format&fit=crop",
        description: "Your mission is to design a high-contrast logo for a neo-brutalist startup. Use thick borders, primary colors, and zero gradients. The design must be exported in SVG and PNG formats with a style guide.",
        prizeMoney: 1200,
        entryFee: 50,
        participantsCount: 42,
        deadline: "2026-02-28T23:59:59",
        winner: { name: "Sarah_Dev", photo: "https://i.pravatar.cc/150?u=sarah" }, // Null if no winner yet
        status: "active" // or "ended"
    };

    // Countdown Logic
    const [timeLeft, setTimeLeft] = useState("");
    const isEnded = new Date(contest.deadline) < new Date();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(contest.deadline).getTime() - now;
            
            if (distance < 0) {
                setTimeLeft("CONTEST ENDED");
                clearInterval(timer);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${days}D : ${hours}H : ${mins}M : ${secs}S`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [contest.deadline]);

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        // Logic to post submission to DB
        Swal.fire({
            title: 'TASK_UPLOADED',
            text: 'Your entry has been secured in the vault.',
            icon: 'success',
            confirmButtonColor: '#000',
            confirmButtonText: 'CONFIRMED'
        });
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white font-mono p-4 md:p-10">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* 1. HERO BANNER SECTION */}
                <div className="relative border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-[300px] md:h-[500px] bg-black">
                    <img src={contest.image} alt={contest.name} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-2">
                            <span className="bg-primary text-black px-3 py-1 font-black uppercase text-xs border-2 border-black">Active_Mission</span>
                            <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                                {contest.name}
                            </h1>
                        </div>
                        
                        <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_#8B5CF6] text-center min-w-[200px]">
                            <p className="text-[10px] font-black uppercase text-gray-500">Live_Countdown</p>
                            <p className={`text-xl md:text-2xl font-black ${isEnded ? 'text-error' : 'text-black'}`}>{timeLeft}</p>
                        </div>
                    </div>
                </div>

                {/* 2. MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* LEFT: INFO & DESCRIPTION */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-4 mb-6 flex items-center gap-3">
                                <CheckCircle2 className="text-secondary" /> Mission_Briefing
                            </h3>
                            <p className="text-lg font-bold leading-relaxed text-gray-800 uppercase italic">
                                {contest.description}
                            </p>
                        </div>

                        {/* WINNER REVEAL (Conditional) */}
                        {contest.winner && (
                            <motion.div 
                                initial={{ scale: 0.9, rotate: -2 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="bg-success border-8 border-black p-8 text-white shadow-[12px_12px_0px_0px_#000]"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 border-4 border-white overflow-hidden shadow-[4px_4px_0px_0px_#000]">
                                        <img src={contest.winner.photo} alt="Winner" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-black text-xs uppercase tracking-[0.3em] opacity-80">Championship_Confirmed</p>
                                        <h2 className="text-4xl font-black uppercase italic">Winner: {contest.winner.name}</h2>
                                        <Trophy className="mt-2 text-white" size={32} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT: ACTION SIDEBAR */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-accent/10 border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                                <Users size={20} className="mb-1" />
                                <p className="text-[10px] font-black uppercase opacity-50">Warriors</p>
                                <p className="text-2xl font-black">{contest.participantsCount}</p>
                            </div>
                            <div className="bg-primary border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                                <DollarSign size={20} className="mb-1" />
                                <p className="text-[10px] font-black uppercase opacity-50">Grand_Prize</p>
                                <p className="text-2xl font-black">${contest.prizeMoney}</p>
                            </div>
                        </div>

                        {/* Payment / Registration Logic */}
                        {!isRegistered ? (
                            <button 
                                disabled={isEnded}
                                className={`w-full py-6 border-8 border-black font-black uppercase text-2xl transition-all shadow-[10px_10px_0px_0px_#000] active:shadow-none active:translate-x-2 active:translate-y-2 
                                ${isEnded ? 'bg-gray-300 cursor-not-allowed' : 'bg-secondary text-white hover:bg-black'}`}
                            >
                                {isEnded ? "ENTRY_CLOSED" : `Register // $${contest.entryFee}`}
                            </button>
                        ) : (
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-6 bg-primary text-black border-8 border-black font-black uppercase text-2xl shadow-[10px_10px_0px_0px_#000] hover:bg-black hover:text-white transition-all"
                            >
                                Submit_Task
                            </button>
                        )}

                        <div className="p-4 bg-gray-100 border-4 border-black border-dashed flex items-center gap-3">
                            <Lock size={16} />
                            <p className="text-[10px] font-black uppercase">Payments Secured via Terminal_Encrypted</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SUBMISSION MODAL --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-white border-8 border-black max-w-xl w-full p-8 shadow-[20px_20px_0px_0px_#8B5CF6] relative"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 hover:rotate-90 transition-transform">
                                <X size={32} />
                            </button>

                            <h2 className="text-3xl font-black uppercase italic mb-2">Deploy_Task</h2>
                            <p className="text-[10px] font-black text-gray-500 uppercase mb-6 tracking-widest">Target: {contest.name}</p>

                            <form onSubmit={handleTaskSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-black uppercase mb-2">Documentation / Links</label>
                                    <textarea 
                                        required
                                        rows="6"
                                        placeholder="PROVIDE YOUR GITHUB, BEHANCE, OR LIVE LINKS HERE..."
                                        className="w-full p-4 border-4 border-black font-bold focus:bg-primary/5 focus:outline-none resize-none"
                                    />
                                </div>
                                <button className="w-full py-4 bg-black text-white font-black uppercase flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#FDE047] hover:shadow-none transition-all">
                                    <Send size={20} /> Finalize_Submission
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContestDetails;