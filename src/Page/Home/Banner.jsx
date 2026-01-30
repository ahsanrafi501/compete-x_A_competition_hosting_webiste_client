import React from "react";
import { Search, Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-base-100  flex items-center border-b-8 border-black">
      {/* Retro Grid - Using your Primary Yellow for the grid lines */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(var(--color-primary) 2px, transparent 2px), linear-gradient(90deg, var(--color-primary) 2px, transparent 2px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Decorative Large Circle - Retro-Violet */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl"></div>

      <section className="relative z-10 w-full px-4 py-20 text-center">
        {/* Floating Tag - Using Primary Yellow */}
        <div className="inline-flex items-center gap-2 px-6 py-2 mb-10 font-black text-black uppercase bg-primary border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2 hover:rotate-0 transition-transform cursor-default">
          <Sparkles size={20} fill="black" />
          Join the Arena
        </div>

        <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter text-black uppercase">
          Win{" "}
          <span className="text-accent italic drop-shadow-[5px_5px_0px_#000]">
            Big
          </span>{" "}
          <br />
          <span className="bg-error text-white px-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Dream
          </span>{" "}
          Harder
        </h1>

        <p className="text-xl md:text-2xl text-black font-black mb-12 max-w-2xl mx-auto py-4 border-y-4 border-black bg-white/80 backdrop-blur-sm">
          Navigating the{" "}
          <span className="text-secondary">Digital Landscape</span> for
          <span className="underline decoration-primary decoration-8 underline-offset-4">
            {" "}
            Success
          </span>
          .
        </p>

        {/* Neo-Brutalist Search Bar */}
        <div className="max-w-2xl mx-auto">
          <form className="relative group">
            <input
              type="text"
              placeholder="SEARCH BY CONTEST TYPE..."
              className="w-full p-6 text-xl font-black uppercase border-4 border-black bg-white text-black placeholder-black/40 focus:outline-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all  focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-primary border-4 border-black hover:bg-accent transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <Search className="text-black" size={32} strokeWidth={4} />
            </button>
          </form>

          {/* Quick Filter Pillbox */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {["Gaming", "Design", "Article", "Marketing"].map((tag) => (
              <button
                key={tag}
                className="px-8 py-2 bg-white border-4 border-black font-black text-black uppercase hover:bg-secondary hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
