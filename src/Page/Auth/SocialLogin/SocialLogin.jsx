import React from "react";
import useAuth from "../../../Hook/useAuth";
import { useNavigate } from "react-router"; // Use react-router-dom
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        // Build User Info - using displayName (Firebase standard)
        const userInfo = {
          displayName: res.user?.displayName,
          photoURL: res.user?.photoURL,
          email: res.user?.email,
          role: "user",
          lastLogin: new Date(),
        };

        // Upsert User (Using put or post depending on your backend logic)
        axiosSecure
          .post("/users", userInfo)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log("DB Sync Error:", error);
            navigate("/"); // Still navigate so user isn't stuck
          });
      })
      .catch((err) => {
        console.log("Google Auth Error:", err);
      });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 py-4 bg-white border-4 border-black text-black font-black uppercase text-sm tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-primary hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:bg-accent"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="border-2 border-black bg-white p-0.5"
        >
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;