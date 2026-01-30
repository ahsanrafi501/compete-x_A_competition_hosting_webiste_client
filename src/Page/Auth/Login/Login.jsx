import React from "react";
import { useForm } from "react-hook-form";
import logoImg from "../../../assets/logo/smallLogo.png";
import useAuth from "../../../Hook/useAuth";
import { Link, useNavigate } from "react-router"; // Use react-router-dom
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 p-4">
      {/* The Main Container with Chunky Shadow */}
      <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-2 border-4 border-black bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
            <img
              className="h-20 w-20 object-contain"
              src={logoImg}
              alt="Logo"
            />
          </div>
          <h1 className="mt-6 text-3xl font-black uppercase tracking-tighter text-black text-center">
            Welcome Back to <span className="text-secondary drop-shadow-[2px_2px_0px_#FDE047]">Contest-X</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-black uppercase mb-1">Email Arena</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full p-4 border-4 border-black font-bold focus:bg-primary/10 focus:outline-none placeholder-black/30"
              placeholder="YOUR@EMAIL.COM"
            />
            {errors.email && (
              <p className="mt-1 bg-error text-white text-xs font-black uppercase p-1 inline-block border-2 border-black">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-black uppercase mb-1">Secret Code</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full p-4 border-4 border-black font-bold focus:bg-primary/10 focus:outline-none placeholder-black/30"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 bg-error text-white text-xs font-black uppercase p-1 inline-block border-2 border-black">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
             <p className="text-xs font-black uppercase">
                New here?{" "}
                <Link to="/registration" className="text-secondary underline decoration-2 underline-offset-2">
                  Join the Squad
                </Link>
             </p>
          </div>

          {/* Main Login Button */}
          <button className="w-full py-4 bg-primary border-4 border-black text-black font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            Enter the System
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t-4 border-black"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 font-black">Or Join Via</span>
          </div>
        </div>

        {/* Social Login Section */}
        <div className="flex justify-center">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;