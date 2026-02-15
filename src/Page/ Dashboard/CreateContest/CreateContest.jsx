import React from "react";
import { useForm } from "react-hook-form";
import {
  PlusCircle,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  Tag,
} from "lucide-react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";

const CreateContest = () => {
  const {user} = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const contestData = {
      ...data,
      participantCount: 0,
      status: "pending",
      createdBy: user.email,
      creatorId: user._id,
      creatorName: user.displayName,
      creatorImg: user.photoURL,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/contest", contestData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "MISSION DEPLOYED!",
          text: "Your contest is awaiting admin clearance.",
          icon: "success",
          confirmButtonText: "ACKNOWLEDGED",
          confirmButtonColor: "#000",
          background: "#fff",
          color: "#000",
          customClass: {
            popup:
              "border-8 border-black rounded-none shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] font-black uppercase",
          },
        });
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputClasses =
    "w-full p-4 border-4 border-black font-bold focus:bg-primary/10 focus:outline-none placeholder-black/30 transition-all";
  const labelClasses =
    "flex items-center gap-2 text-sm font-black uppercase mb-2 text-black";

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Header Section */}
        <div className="bg-black text-white p-6 border-b-8 border-black flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
              Create_Arena
            </h1>
            <p className="text-primary font-black text-xs mt-1 uppercase tracking-widest">
              System // Contest_Deployment_Module
            </p>
          </div>
          <PlusCircle
            size={48}
            className="text-primary hidden md:block"
            strokeWidth={3}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          {/* Basic Info Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClasses}>Contest Name</label>
              <input
                {...register("name", { required: true })}
                className={inputClasses}
                placeholder="E.G. RETRO LOGO BLITZ"
              />
              {errors.name && (
                <p className="text-red-500">Contest name is required</p>
              )}
            </div>
            <div>
              <label className={labelClasses}>Contest Type</label>
              <select
                {...register("contestType", {
                  required: "Please select a contest type",
                })}
                className={inputClasses}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Design">Digital Design</option>
                <option value="Coding">Logic Battle</option>
                <option value="Gaming">Pro Gaming</option>
                <option value="Writing">Creative Script</option>
              </select>
              {errors?.contestType && (
                <p className="text-red-500">{errors.contestType.message}</p>
              )}
            </div>
          </div>

          {/* Image URL & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClasses}>
                <ImageIcon size={18} /> Image URL
              </label>
              <input
                {...register("image", { required: true })}
                className={inputClasses}
                placeholder="HTTPS://IMG.BB/YOURIMAGE"
              />
              {errors.image && (
                <p className="text-red-500">Image is required</p>
              )}
            </div>
            <div>
              <label className={`${labelClasses} flex items-center gap-2`}>
                <Calendar size={18} /> Submission Deadline
              </label>
              <input
                type="date"
                {...register("deadline", {
                  required: "Submission deadline is required",
                  min: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Deadline cannot be in the past",
                  },
                })}
                className={inputClasses}
              />
              {errors?.deadline && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          {/* Money & Fees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary/5 p-4 border-4 border-black">
              <label className={labelClasses}>
                <DollarSign size={18} /> Prize Money ($)
              </label>
              <input
                type="number"
                {...register("prizeMoney", { required: true })}
                className={inputClasses}
                placeholder="5000"
              />
              {errors.prizeMoney && (
                <p className="text-red-500">PrizeMoney is required</p>
              )}
            </div>
            <div className="bg-accent/5 p-4 border-4 border-black">
              <label className={labelClasses}>
                <Tag size={18} /> Entry Fee ($)
              </label>
              <input
                type="number"
                {...register("entryFee", { required: true })}
                className={inputClasses}
                placeholder="25"
              />
              {errors.entryFee && (
                <p className="text-red-500">EntryFee is required</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClasses}>
              Arena Description / Mission Brief
            </label>
            <textarea
              rows="4"
              {...register("description", { required: true })}
              className={`${inputClasses} resize-none`}
              placeholder="TELL THE WORLD WHY THEY SHOULD COMPETE..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-6 bg-secondary text-white border-4 border-black font-black uppercase text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:bg-black group"
          >
            Deploy{" "}
            <span className="text-primary group-hover:italic">
              Contest_Arena
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContest;
