import React from "react";
import { useForm } from "react-hook-form";
import logoImg from "../../../assets/logo/smallLogo.png";
import useAuth from "../../../Hook/useAuth";
import { Link, useNavigate } from "react-router";
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
            <h1 className="text-base-content text-center font-extrabold text-[24px]">
              Welcome Back to Contest-X
            </h1>
            <form onSubmit={handleSubmit(handleRegistration)}>
              <label className="label mt-5 mb-2">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input"
                placeholder="Email"
              />
              {errors.email?.type == "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              <label className="label mt-5 mb-2">Password</label>
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
                <p>
                  New to Context-X?{" "}
                  <Link
                    to={"/registration"}
                    className="text-blue-500 underline"
                  >
                    Click here
                  </Link>
                </p>
              </div>
              <button className="btn btn-primary text-black text-xl mt-4 w-full">
                Sign Up
              </button>
            </form>
          </fieldset>
          <div className="flex justify-center items-center flex-col mt-5">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
