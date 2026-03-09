import React from "react";
import { motion } from "framer-motion";
import {
  Send,
  Link as LinkIcon,
  FileText,
  Clock,
  ShieldAlert,
  ArrowLeft,
  Trophy,
} from "lucide-react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ContinueArena = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { contestId } = useParams();

  const { data: submitForCourse = [], isLoading } = useQuery({
    queryKey: ["submitForCourse", contestId],
    enabled: !!contestId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/submit-content-data/${contestId}`);
      return res.data;
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // 2. Trigger Confirmation Alert
    Swal.fire({
      title: "ARE_YOU_SURE?",
      text: "You can submit the task only one time. Once deployed, you cannot edit your response.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "YES_SUBMIT",
      cancelButtonText: "ABORT_MISSION",
      confirmButtonColor: "#000", // Matches Neo-Brutalist style
      cancelButtonColor: "#d33",
      background: "#fff",
      color: "#000",
      customClass: {
        popup: "border-[6px] border-black rounded-none font-mono uppercase",
        confirmButton:
          "border-2 border-black rounded-none font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        cancelButton:
          "border-2 border-black rounded-none font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      },
    }).then(async (result) => {
      // 3. Check if user clicked "YES"
      if (result.isConfirmed) {
        const submissionPayload = {
          submissionLink: form.link.value,
          submissionNotes: form.notes.value,
          submittedBy: user.email,
          submittedAt: new Date().toISOString(),
          status: "pending",
        };

        try {
          const res = await axiosSecure.post(
            `/submission/${contestId}`,
            submissionPayload,
          );

          if (res.data.insertedId) {
            if (submissionDataFetch) await submissionDataFetch();

            Swal.fire({
              title: "MISSION_ACCOMPLISHED",
              text: "Your entry has been uploaded to the arena.",
              icon: "success",
              confirmButtonColor: "#8B5CF6",
              customClass: {
                popup:
                  "border-[6px] border-black rounded-none font-mono uppercase",
              },
            });
          }
        } catch (error) {
          Swal.fire({
            title: "UPLOAD_ERROR",
            text: "The terminal lost connection. Payload not delivered.",
            icon: "error",
            confirmButtonColor: "#000",
            customClass: {
              popup:
                "border-[6px] border-black rounded-none font-mono uppercase",
            },
          });
        }
      }
    });
  };

  const { data: submissionData = [], refetch: submissionDataFetch } = useQuery({
    queryKey: ["submissionData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission-data/${contestId}?email=${user.email}`);
      return res.data;
    },
  });

  console.log(submissionData);

  if (isLoading)
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono text-primary animate-pulse uppercase">
        Syncing_Arena_Data...
      </div>
    );

  const isDeadlineOver = new Date(submitForCourse[0]?.deadline) < new Date();

  return (
    <div className="min-h-screen bg-[#080808] text-white font-mono p-4 md:p-8">
      {submitForCourse.map((courseData) => (
        <div key={courseData._id}>
          <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
            <Link
              to="/dashboard/my-enrolled"
              className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors"
            >
              <div className="p-2 border-2 border-gray-400 group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
                <ArrowLeft size={20} />
              </div>
              <span className="font-black uppercase text-xs">
                Return_To_Registry
              </span>
            </Link>
            <div className="bg-primary text-black px-4 py-1 font-black uppercase text-xs border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              Live_Arena // {courseData.contestType}
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: MISSION BRIEFING */}
            <div className="lg:col-span-5 space-y-8">
              <section className="bg-white border-[6px] border-white p-0 shadow-[15px_15px_0px_0px_#8B5CF6]">
                <div className="bg-black p-4 border-b-[6px] border-white flex justify-between items-center">
                  <h2 className="text-2xl font-black uppercase italic">
                    Mission_Brief
                  </h2>
                  <Trophy size={20} className="text-primary" />
                </div>
                <div className="p-6 text-black space-y-6">
                  <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                    {courseData.name}
                  </h1>

                  <div className="border-4 border-black overflow-hidden aspect-video bg-gray-200">
                    <img
                      className="w-full h-full object-cover"
                      src={courseData?.image}
                      alt="Contest Banner"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="font-black uppercase text-xs underline decoration-2 underline-offset-4">
                      Description:
                    </p>
                    <p className="text-sm font-bold italic">
                      "{courseData.description}"
                    </p>
                  </div>

                  <div className="bg-accent/20 border-2 border-black border-dashed p-4 flex items-center gap-4">
                    <ShieldAlert className="text-black shrink-0" />
                    <p className="text-[10px] font-black uppercase tracking-tighter leading-tight">
                      Plagiarism check active. Host ID:{" "}
                      {courseData.createdBy?.split("@")[0]}
                    </p>
                  </div>
                </div>
              </section>

              {/* PRIZE & TIMER BOXES */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary p-6 border-4 border-white shadow-[6px_6px_0px_0px_#fff]">
                  <p className="font-black uppercase text-[10px] mb-1">
                    Prize_Pool
                  </p>
                  <p className="text-3xl font-black italic">
                    ${courseData.prizeMoney}
                  </p>
                </div>
                <div className="bg-black border-4 border-white p-6 shadow-[6px_6px_0px_0px_#8B5CF6]">
                  <p className="font-black uppercase text-[10px] mb-1 text-primary">
                    Deadline
                  </p>
                  <p className="text-xl font-black tracking-tighter">
                    {new Date(courseData.deadline).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: SUBMISSION TERMINAL */}
            {submissionData ? (
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black border-[6px] border-white p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-center min-h-[500px]"
                >
                  {/* Decorative Background Text */}
                  <div className="absolute -right-10 top-1/2 -rotate-90 text-[100px] font-black text-white/[0.03] select-none pointer-events-none">
                    LOCKED
                  </div>

                  <div className="relative z-10 text-center space-y-8">
                    {/* LOCK ICON CIRCLE */}
                    <div className="w-24 h-24 border-4 border-primary rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10">
                      <ShieldAlert
                        size={48}
                        className="text-primary animate-pulse"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-primary">
                        Signal_Received
                      </h3>
                      <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                        Transmission_Verified // Uplink_Closed
                      </p>
                    </div>

                    {/* BRUTALIST MESSAGE BOX */}
                    <div className="bg-white text-black p-6 border-l-[12px] border-primary shadow-[10px_10px_0px_0px_#8B5CF6] text-left">
                      <p className="font-black uppercase text-sm leading-tight">
                        Deployment Successful.
                      </p>
                      <p className="text-[10px] font-bold mt-2 opacity-70 uppercase leading-tight">
                        You have already submitted the task for this arena. The
                        secure uplink permits only one payload per participant
                        to ensure competitive integrity. No further
                        modifications can be made.
                      </p>
                    </div>

                    {/* STATUS BADGE */}
                    <div className="flex justify-center gap-4 pt-4">
                      <div className="border-2 border-white/20 px-4 py-2 flex items-center gap-2 bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        <span className="font-black text-[10px] uppercase text-gray-400">
                          Status: Secure_Pending
                        </span>
                      </div>
                    </div>

                    {/* RETURN ACTION */}
                    <div className="pt-6">
                      <Link
                        to="/all-enrolled-contests"
                        className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 font-black uppercase text-sm border-4 border-white shadow-[8px_8px_0px_0px_#8B5CF6] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                      >
                        <ArrowLeft size={18} strokeWidth={3} />
                        Back_To_Enrolled_Contests
                      </Link>
                    </div>

                    <p className="text-[10px] font-black text-gray-600 uppercase italic pt-4">
                      Terminal_Session_Ended // 2026_Secure_Protocol
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : (

              
                isDeadlineOver ?   <div className="lg:col-span-7">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-black border-[6px] border-white p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-center min-h-[500px]"
                          >
                            {/* Decorative Background Text */}
                            <div className="absolute -right-10 top-1/2 -rotate-90 text-[100px] font-black text-white/[0.03] select-none pointer-events-none">
                              LOCKED
                            </div>

                            <div className="relative z-10 text-center space-y-8">
                              {/* LOCK ICON CIRCLE */}
                              <div className="w-24 h-24 border-4 border-primary rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10">
                                <ShieldAlert
                                  size={48}
                                  className="text-primary animate-pulse"
                                />
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-primary">
                                  Deadline Is Over
                                </h3>
                                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                                  Transmission_Verified // Uplink_Closed
                                </p>
                              </div>

                              {/* RETURN ACTION */}
                              <div className="pt-6">
                                <Link
                                  to="/all-enrolled-contests"
                                  className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 font-black uppercase text-sm border-4 border-white shadow-[8px_8px_0px_0px_#8B5CF6] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                >
                                  <ArrowLeft size={18} strokeWidth={3} />
                                  Back_To_Enrolled_Contests
                                </Link>
                              </div>

                              <p className="text-[10px] font-black text-gray-600 uppercase italic pt-4">
                                Terminal_Session_Ended // 2026_Secure_Protocol
                              </p>
                            </div>
                          </motion.div>
                        </div> 
                        :
                         <div className="lg:col-span-7">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-black border-[6px] border-white p-8 md:p-12 space-y-10 relative overflow-hidden"
                >
                  <div className="absolute -right-10 top-1/2 -rotate-90 text-[120px] font-black text-white/[0.03] select-none pointer-events-none">
                    SUBMIT
                  </div>

                  <div>
                    <h3 className="text-3xl font-black uppercase mb-2 text-primary">
                      Deployment_Terminal
                    </h3>
                    <p className="text-gray-500 font-bold text-xs uppercase italic">
                      Transmitting as: {user?.email}
                    </p>
                  </div>

                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-8 relative z-10"
                  >
                    <div className="space-y-2">
                      <label className="font-black uppercase text-xs text-primary flex items-center gap-2">
                        <LinkIcon size={14} /> Repository_or_Live_URL
                      </label>
                      <input
                        name="link"
                        type="url"
                        required
                        placeholder="HTTPS://ARENA-SUBMISSION.APP"
                        className="w-full bg-transparent border-4 border-white p-4 font-black uppercase text-sm placeholder-gray-800 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-black uppercase text-xs text-primary flex items-center gap-2">
                        <FileText size={14} /> Submission_Notes
                      </label>
                      <textarea
                        name="notes"
                        required
                        rows="5"
                        placeholder="DESCRIBE YOUR WORK AND DESIGN CHOICES..."
                        className="w-full bg-transparent border-4 border-white p-4 font-black uppercase text-sm placeholder-gray-800 focus:border-primary outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="pt-4">
                        <button
                          type="submit"
                          className={`w-full group bg-white text-black py-6 font-black uppercase text-xl flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-[8px_8px_0px_0px_#8B5CF6] hover:shadow-none hover:translate-x-1 hover:translate-y-1`}
                        >
                          Confirm_Deployment`
                          <Send
                            size={24}
                            className="group-hover:translate-x-2 transition-transform"
                          />
                        </button>
                    </div>
                  </form>

                  <div className="flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase justify-center italic">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Terminal_Online_Waiting_For_Payload...
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContinueArena;
