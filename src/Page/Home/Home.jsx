import React from "react";
import AllContest from "../AllContest/AllContest";

const Home = () => {
  return (
    <div>
      <section className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Where <span className="text-blue-500">Talent</span> Meets{" "}
          <span className="text-emerald-500">Opportunity</span>.
        </h1>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Navigating the digital landscape for success — join thousands of
          creators competing in design, writing, and business challenges.
        </p>
        {/* Your Search Bar Component here */}
      </section>
      <AllContest></AllContest>
    </div>
  );
};

export default Home;
