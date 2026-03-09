import React from "react";
import { useForm } from "react-hook-form";
import logoImg from "../../../assets/logo/smallLogo.png";
import { Link, useNavigate } from "react-router"; // Fixed import
import useAuth from "../../../Hook/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import SocialLogin from "../SocialLogin/SocialLogin";
import { UserPlus, Image as ImageIcon } from "lucide-react";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    const profilePhoto = data?.profilePhoto[0];

    try {
      // 1. Image Upload to ImgBB
      const formData = new FormData();
      formData.append("image", profilePhoto);
      const imgAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`;
      
      const imgRes = await axios.post(imgAPI, formData);
      const photoURL = imgRes.data.data.url;

      // 2. Firebase Registration
      await registerUser(data.email, data.password);
      
      // 3. Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      // 4. Save to Database
      const userInfo = {
        displayName: data.name,
        photoURL: photoURL,
        email: data.email,
        role: "user",
        timestamp: new Date(),
      };

      const res = await axiosSecure.post("/users", userInfo);
      if (res.data.insertedId) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("error", error)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 p-6 py-12">
      <div className="w-full max-w-lg bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-accent border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-3 mb-4">
            <img className="h-16 w-16" src={logoImg} alt="Logo" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black text-center">
            Join <span className="text-secondary">Contest-X</span>
          </h1>
          <p className="font-bold text-sm uppercase text-gray-500 mt-2 italic">
            Ready to claim your victory?
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
          {/* Photo Upload */}
          <div className="bg-primary/5 p-4 border-2 border-dashed border-black">
            <label className="flex items-center gap-2 text-xs font-black uppercase mb-2">
              <ImageIcon size={14} /> Avatar Selection
            </label>
            <input
              type="file"
              {...register("profilePhoto", { required: "Photo is required" })}
              className="file-input file-input-bordered border-2 border-black rounded-none w-full bg-white font-bold h-12"
            />
            {errors.profilePhoto && <p className="text-error text-[10px] font-black uppercase mt-1">{errors.profilePhoto.message}</p>}
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-black uppercase mb-1">Combat Name (Full Name)</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full p-3 border-4 border-black font-bold focus:bg-primary/10 focus:outline-none placeholder-black/20"
              placeholder="JANE DOE"
            />
            {errors.name && <p className="text-error text-[10px] font-black uppercase mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-black uppercase mb-1">Email Terminal</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full p-3 border-4 border-black font-bold focus:bg-primary/10 focus:outline-none placeholder-black/20"
              placeholder="PLAYER@ARENA.COM"
            />
            {errors.email && <p className="text-error text-[10px] font-black uppercase mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-black uppercase mb-1">Access Key (Password)</label>
            <input
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" }
              })}
              type="password"
              className="w-full p-3 border-4 border-black font-bold focus:bg-primary/10 focus:outline-none placeholder-black/20"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-error text-[10px] font-black uppercase mt-1">{errors.password.message}</p>}
          </div>

          <div className="pt-2">
            <p className="text-xs font-black uppercase mb-4">
              Part of the club?{" "}
              <Link to="/login" className="text-secondary underline decoration-2 underline-offset-2">
                Sign in here
              </Link>
            </p>

            <button className="w-full py-4 bg-primary border-4 border-black text-black font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2">
              <UserPlus size={24} strokeWidth={3} />
              Deploy Profile
            </button>
          </div>
        </form>

        <div className="divider before:bg-black after:bg-black font-black text-xs uppercase my-8 text-black">Or Connect Via</div>
        
        <div className="flex justify-center">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Registration;