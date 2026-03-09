import React from "react";
import { useParams, Link, useNavigate } from "react-router"; // Added useNavigate
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import {
  Trophy,
  Users,
  Calendar,
  ArrowLeft,
  Zap,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  const isDeadlinePassed = contest.deadline ? new Date(contest.deadline) < new Date() : false;

  const isCreator = user?.email === contest.createdBy;
 

  const handleJoinContest = (contestData) => {

    if (!user) {
      return Swal.fire({
        title: "ACCESS DENIED",
        text: "You must be logged in to join an arena.",
        icon: "warning",
        confirmButtonColor: "#000",
      })
      .then(()=>{
        navigate('/login');
      })
    }

    if (isCreator) {
        return Swal.fire({
          title: "SYSTEM ERROR",
          text: "Creators cannot participate in their own contests.",
          icon: "error",
          confirmButtonColor: "#000",
        });
      }

    Swal.fire({
      title: "INITIALIZE ENROLLMENT?",
      text: `Entry Fee: $${contestData.entryFee || 0}. Proceed to authorization?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "CONFIRM",
      cancelButtonText: "ABORT",
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      background: "#fff",
      customClass: {
        popup: 'border-8 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]',
        title: 'font-black uppercase',
        confirmButton: 'font-black rounded-none border-4 border-black',
        cancelButton: 'font-black rounded-none border-4 border-black'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post(`/enroll-contest/${contestData._id}`, { participantEmail: user.email })
          .then(() => {
            Swal.fire({
                title: "ENROLLED!",
                text: "Your coordinates have been logged in the arena.",
                icon: "success",
                confirmButtonColor: "#000"
            });
            isEnrolledRefetch();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "CONNECTION FAILED",
              text: err.response?.data?.message || "Something went wrong!",
              confirmButtonColor: "#000"
            });
          });
      }
    });
  };

   const {refetch : isEnrolledRefetch, data: isEnrolled = []} = useQuery({
    queryKey:['enrolledContest', user?.email],
     enabled: !!user?.email,
    queryFn: async() =>{
      const res = await axiosSecure.get(`/isEnrolled?email=${user.email}`)
      return res.data
    }
  })

  const isAlreadyEnrolled = isEnrolled.find(enrolled => enrolled.contestId === contest._id)

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 font-mono">
      {/* Back Button */}
      <Link
        to="/all-contests"
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        <ArrowLeft size={20} /> Back to Arena
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: VISUALS & DESCRIPTION */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative border-8 border-black shadow-[15px_15px_0px_0px_#8B5CF6]">
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black text-white px-6 py-3 font-black uppercase italic tracking-widest text-xl">
              {contest.contestType} // MISSION_FILE
            </div>
          </div>

          <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none tracking-tighter italic">
              {contest.name}
            </h1>
            <p className="text-lg font-bold text-gray-700 leading-relaxed italic border-l-8 border-primary pl-6 py-2">
              "{contest.description}"
            </p>

            <div className="mt-10">
              <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-4">
                Submission Rules
              </h3>
              <ul className="space-y-3">
                {[
                  "High Quality Export",
                  "Original Work Only",
                  "Submit before deadline",
                ].map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-bold uppercase text-sm"
                  >
                    <CheckCircle2 className="text-secondary" size={20} /> {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STATS & ACTION */}
        <div className="lg:col-span-5 space-y-8">
          {/* Prize & Status Box */}
          <div className="bg-primary border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-black text-white p-3 border-2 border-black">
                <Trophy size={32} />
              </div>
              <div className="text-right">
                <p className="font-black uppercase text-xs">Grand Prize</p>
                <p className="text-5xl font-black italic">
                  ${contest.prizeMoney}
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t-4 border-black pt-6">
              <div className="flex justify-between font-black uppercase">
                <span>Registration Fee</span>
                <span className="bg-white px-2 border-2 border-black">
                  ${contest.entryFee || "0"}
                </span>
              </div>
              <div className="flex justify-between font-black uppercase">
                <span>Warriors Enrolled</span>
                <span className="text-secondary font-black">
                  {contest.participantCount || 0} Participants
                </span>
              </div>
            </div>
          </div>

          {/* Countdown / Deadline */}
          <div className={`border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1 ${isDeadlinePassed ? 'bg-red-500' : 'bg-accent'}`}>
            <div className="flex items-center gap-4 mb-2">
              <Clock size={24} className={isDeadlinePassed ? "" : "animate-spin-slow"} />
              <p className="font-black uppercase text-xl">
                {isDeadlinePassed ? "Contest Ended" : "System Deadline"}
              </p>
            </div>
            <p className="text-3xl font-black tracking-widest bg-white border-2 border-black p-2 text-center">
              {new Date(contest.deadline).toLocaleString()}
            </p>
          </div>

          {/* Enter Button */}
        { isAlreadyEnrolled ? <button
            onClick={() => navigate(`/submit-content/${contest._id}`)}
            disabled={isDeadlinePassed || isCreator}
            className={`w-full py-6 border-8 border-black font-black uppercase text-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all
                
                    bg-gray-400 cursor-not-allowed shadow-none translate-x-1 translate-y-1
                
                }`}
          >
            Already Enrolled
          </button>
          :
          <button
            onClick={() => handleJoinContest(contest)}
            disabled={isDeadlinePassed || isCreator}
            className={`w-full py-6 border-8 border-black font-black uppercase text-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all
                ${isDeadlinePassed || isCreator 
                    ? 'bg-gray-400 cursor-not-allowed shadow-none translate-x-1 translate-y-1' 
                    : 'bg-secondary text-white hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:bg-error'
                }`}
          >
            {isDeadlinePassed ? "Closed" : isCreator ? "Creator View" : "Join Contest"}
          </button>}

          {/* Organizer Info */}
          <div className="flex items-center gap-4 p-4 border-4 border-black bg-white shadow-[5px_5px_0px_0px_#000]">
            <div className="w-12 h-12 border-2 border-black bg-gray-200 overflow-hidden">
              <img src={contest.creatorImg} alt="admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500">
                Host / Organizer
              </p>
              <p className="font-black uppercase tracking-tight">
                {contest.creatorName || "Anonymous Host"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;