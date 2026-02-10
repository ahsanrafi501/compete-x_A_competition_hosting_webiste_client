import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hook/useAuth";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  // Updated linkStyles to use your DaisyUI variable colors
  const linkStyles = ({ isActive }) =>
    `px-4 py-2 font-black uppercase text-sm transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${
      isActive
        ? "bg-primary text-black -rotate-2"
        : "bg-white text-black"
    }`;

  const handleSignOut = () => {
    signOutUser()
      .then((res) => {
        console.log(res)
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navLinks = (
    <>
      <NavLink to="/" className={linkStyles}>
        Home
      </NavLink>
      <NavLink to="/all-contests" className={linkStyles}>
        All Contest
      </NavLink>
      <NavLink to="/all-enrolled-contests" className={linkStyles}>
        Enrolled Contest
      </NavLink>
      <NavLink to="/leaderboard" className={linkStyles}>
        Leaderboard
      </NavLink>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="navbar border-b-4 border-black px-4 md:px-12 h-24">
        {/* Mobile Menu (DaisyUI Drawer or Dropdown) */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label
              tabIndex={0}
              className="btn btn-ghost border-2 border-black rounded-none mr-2 bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Menu size={24} strokeWidth={3} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3  p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white border-4 border-black w-64 gap-4"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="hover:scale-105 transition-transform">
            <Logo />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar-center hidden lg:flex gap-6">{navLinks}</div>

        {/* User Profile / Login */}
        <div className="navbar-end gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="group relative p-0 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              >
                <div className="w-12 h-12 overflow-hidden">
                  <img
                    alt="User"
                    src={user?.photoURL || "https://i.pravatar.cc/150"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white border-4 border-black rounded-none mt-4 w-64 p-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <li className="p-4 bg-secondary text-white font-black uppercase text-center border-b-4 border-black">
                  {user?.displayName || "Competitor"}
                </li>
                <li className="border-b-2 border-black">
                  <Link
                    to="/profile"
                    className="p-4 font-black uppercase hover:bg-accent rounded-none transition-colors"
                  >
                    My Profile
                  </Link>
                </li>
                <li className="border-b-2 border-black">
                  <Link
                    to="/dashboard/overview"
                    className="p-4 font-black uppercase hover:bg-primary rounded-none transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="p-4 bg-error text-white font-black uppercase rounded-none hover:bg-black transition-colors text-center block w-full"
                  >
                    Logout System
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-8 py-3 bg-accent border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
