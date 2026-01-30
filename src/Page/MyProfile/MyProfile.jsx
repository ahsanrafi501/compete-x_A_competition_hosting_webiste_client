import React from 'react';

import { Edit3, Award, Zap, Star, ShieldCheck } from 'lucide-react';
import useAuth from '../../Hook/useAuth';

const MyProfile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 flex items-center justify-center">
            {/* Main Profile Container */}
            <div className="w-full max-w-4xl relative">
                
                {/* Floating "Status" Badge */}
                <div className="absolute -top-6 -right-4 z-20 bg-accent border-4 border-black px-6 py-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
                    Verified_Creator
                </div>

                <div className="bg-white border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row overflow-hidden">
                    
                    {/* LEFT SIDE: Identity Card */}
                    <div className="w-full md:w-1/3 bg-primary border-r-8 border-black p-8 flex flex-col items-center text-center">
                        <div className="relative group">
                            <div className="w-48 h-48 border-8 border-black overflow-hidden bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                <img 
                                    src={user?.photoURL || "https://i.pravatar.cc/300"} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <button className="absolute bottom-2 right-2 p-3 bg-secondary text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                                <Edit3 size={20} />
                            </button>
                        </div>

                        <h2 className="mt-8 text-3xl font-black uppercase tracking-tighter leading-none text-black">
                            {user?.displayName || "Competitor_X"}
                        </h2>
                        <p className="mt-2 font-black uppercase text-xs italic bg-black text-white px-3 py-1">
                            Level_01 Participant
                        </p>

                        <div className="mt-8 w-full border-t-4 border-black pt-6 space-y-4">
                            <div className="flex justify-between font-black uppercase text-xs">
                                <span>Global Rank:</span>
                                <span className="text-secondary">#1,240</span>
                            </div>
                            <div className="w-full h-4 border-2 border-black bg-white">
                                <div className="h-full bg-secondary w-3/4 border-r-2 border-black"></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Stats & Data */}
                    <div className="flex-1 p-8 md:p-12 space-y-10">
                        {/* Bio Section */}
                        <section>
                            <h3 className="text-xl font-black uppercase border-b-4 border-black pb-2 flex items-center gap-2">
                                <ShieldCheck size={24} className="text-secondary" /> User_Bio
                            </h3>
                            <p className="mt-4 font-bold text-gray-700 italic leading-relaxed">
                                "Obsessed with digital architecture and retro aesthetics. Here to dominate the arena and claim the top prize."
                            </p>
                        </section>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-accent/20 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                <div className="flex items-center gap-3 mb-2">
                                    <Award size={24} className="text-black" />
                                    <span className="font-black uppercase text-xs">Contests Won</span>
                                </div>
                                <p className="text-4xl font-black italic">08</p>
                            </div>

                            <div className="p-6 bg-secondary text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                <div className="flex items-center gap-3 mb-2">
                                    <Zap size={24} className="text-primary" />
                                    <span className="font-black uppercase text-xs">Total Points</span>
                                </div>
                                <p className="text-4xl font-black italic">4,250</p>
                            </div>
                        </div>

                        {/* Recent Activity Mini-List */}
                        <section>
                            <h3 className="text-xl font-black uppercase border-b-4 border-black pb-2 flex items-center gap-2">
                                <Star size={24} className="text-primary" /> Recent_Victory
                            </h3>
                            <div className="mt-4 space-y-3">
                                <div className="bg-white border-2 border-black p-3 flex justify-between items-center group hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    <span className="font-black uppercase text-sm">Retro UI Challenge</span>
                                    <span className="bg-primary text-black px-2 font-black text-[10px] border-2 border-black">1ST PLACE</span>
                                </div>
                                <div className="bg-white border-2 border-black p-3 flex justify-between items-center group hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    <span className="font-black uppercase text-sm">GenZ Branding Blitz</span>
                                    <span className="bg-accent text-black px-2 font-black text-[10px] border-2 border-black">TOP 10</span>
                                </div>
                            </div>
                        </section>

                        {/* Edit Button */}
                        <div className="pt-4">
                            <button className="w-full py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-secondary transition-colors border-4 border-black shadow-[8px_8px_0px_0px_#CAEB66] active:translate-x-1 active:translate-y-1 active:shadow-none">
                                Update Official Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;