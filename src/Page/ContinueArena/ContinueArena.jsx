import React from 'react';
import { motion } from 'framer-motion';
import { Send, Link as LinkIcon, FileText, Clock, ShieldAlert, ArrowLeft, Trophy } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ContinueArena = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { courseId } = useParams(); // This ID links to your enrollment
  const navigate = useNavigate();

  const { data: submitForCourse = [], isLoading } = useQuery({
    queryKey: ['submitForCourse', courseId],
    enabled: !!courseId,
    queryFn: async () => {
      // Fetching the specific contest data you shared
      const res = await axiosSecure.get(`/submit-content/${courseId}`);
      return res.data;
    }
  });
  console.log(submitForCourse)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submissionLink = form.link.value;
    const submissionNotes = form.notes.value;

    const submissionPayload = {
      submissionLink,
      submissionNotes,
      submittedAt: new Date().toISOString(),
      status: "pending" 
    };

    try {
      // Patching the enrollment record with the submission data
      const res = await axiosSecure.patch(`/submit-contest/${courseId}`, submissionPayload);
      
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: 'MISSION_ACCOMPLISHED',
          text: 'Your entry has been uploaded to the arena.',
          icon: 'success',
          confirmButtonColor: '#8B5CF6',
          background: '#fff',
          customClass: { popup: 'border-8 border-black rounded-none font-mono' }
        });
        navigate('/dashboard/my-enrolled');
      }
    } catch (error) {
      Swal.fire('UPLOAD_ERROR', 'The terminal lost connection. Try again.', 'error');
    }
  };

  if (isLoading) return <div className="h-screen bg-black flex items-center justify-center font-mono text-primary animate-pulse uppercase">Syncing_Arena_Data...</div>;

  return (
    <div className="min-h-screen bg-[#080808] text-white font-mono p-4 md:p-8">
      {/* HEADER NAVIGATION */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <Link to="/dashboard/my-enrolled" className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors">
          <div className="p-2 border-2 border-gray-400 group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-black uppercase text-xs">Return_To_Registry</span>
        </Link>
        <div className="bg-primary text-black px-4 py-1 font-black uppercase text-xs border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          Live_Arena // {submitForCourse.contestType}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: MISSION BRIEFING */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white border-[6px] border-white p-0 shadow-[15px_15px_0px_0px_#8B5CF6]">
            <div className="bg-black p-4 border-b-[6px] border-white flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic">Mission_Brief</h2>
              <Trophy size={20} className="text-primary" />
            </div>
            <div className="p-6 text-black space-y-6">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                {submitForCourse.name}
              </h1>
              
              <div className="border-4 border-black overflow-hidden aspect-video bg-gray-200">
                <img className='w-full h-full object-cover' src={submitForCourse?.image
} alt="Contest Banner" />
              </div>

              <div className="space-y-2">
                <p className="font-black uppercase text-xs underline decoration-2 underline-offset-4">Description:</p>
                <p className="text-sm font-bold italic">"{submitForCourse.description}"</p>
              </div>

              <div className="bg-accent/20 border-2 border-black border-dashed p-4 flex items-center gap-4">
                <ShieldAlert className="text-black shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-tighter leading-tight">
                    Plagiarism check active. Host ID: {submitForCourse.createdBy?.split('@')[0]}
                </p>
              </div>
            </div>
          </section>

          {/* PRIZE & TIMER BOXES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary p-6 border-4 border-white shadow-[6px_6px_0px_0px_#fff]">
                <p className="font-black uppercase text-[10px] mb-1">Prize_Pool</p>
                <p className="text-3xl font-black italic">${submitForCourse.prizeMoney}</p>
            </div>
            <div className="bg-black border-4 border-white p-6 shadow-[6px_6px_0px_0px_#8B5CF6]">
                <p className="font-black uppercase text-[10px] mb-1 text-primary">Deadline</p>
                <p className="text-xl font-black tracking-tighter">{submitForCourse.deadline}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: SUBMISSION TERMINAL */}
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
              <h3 className="text-3xl font-black uppercase mb-2 text-primary">Deployment_Terminal</h3>
              <p className="text-gray-500 font-bold text-xs uppercase italic">Transmitting as: {user?.email}</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-8 relative z-10">
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
                  className="w-full group bg-white text-black py-6 font-black uppercase text-xl flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-[8px_8px_0px_0px_#8B5CF6] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  Confirm_Deployment <Send size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase justify-center italic">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Terminal_Online_Waiting_For_Payload...
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContinueArena;