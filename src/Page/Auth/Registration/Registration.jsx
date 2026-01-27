import React from "react";
import { useForm } from "react-hook-form";
import logoImg from "../../../assets/logo/smallLogo.png";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hook/useAuth";
import axios from "axios";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {registerUser, loading} = useAuth()
  const navigate = useNavigate();

//   console.log(loading)

  const handleRegistration = (data) =>{
    
    const profilePhoto = data?.profilePhoto[0];
    

    registerUser(data.email, data.password)
    .then(()=>{
        const formData = new FormData();
        formData.append('image', profilePhoto);
        const imgAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`;
        axios.post(imgAPI, formData)
        .then(res=>{
            const photoURL = res.data.data.url;
            console.log(photoURL);
            
            const userInfo = {
                displayName: data.name,
                photoURL: photoURL,
                email: data.email,
            }
            console.log(userInfo)
            navigate('/');
        })
    })

  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <div className="flex justify-center">
              <img
                className="h-[100px] border-4 border-red-500 rounded-4xl"
                src={logoImg}
                alt="Logo"
              />
            </div>
            <h1 className="text-base-content text-center font-extrabold text-[28px]">
              Welcome to Contest-X
            </h1>
            <p className="text-base-content mb-4 text-center">
              Please enter your information for register
            </p>
            <form onSubmit={handleSubmit(handleRegistration)}>

            <label className="label">Uplaod Photo</label>
            <input type="file" {...register('profilePhoto',{required: true})} className="file-input file-input-warning" />
            {errors.profilePhoto?.type == "required" && (
              <p className="text-red-500">Full Name is required</p>
            )}

            <label className="label">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input"
              placeholder="Full Name"
            />
            {errors.name?.type == "required" && (
              <p className="text-red-500">Full Name is required</p>
            )}

            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email?.type == "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            <label className="label">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            

            <div className="mt-5">
              <p>Already have an account? <Link to={'/login'} className="text-blue-500 underline">Click here</Link></p>
            </div>
            <button className="btn btn-primary text-black text-xl mt-4 w-full">
              Sign Up
            </button>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Registration;
