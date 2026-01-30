import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hook/useAuth";

const Navbar = () => {

    const {user, signOutUser} = useAuth()
    const links = <>
        <NavLink   to={'/'}>Home</NavLink>
        <NavLink   to={'/login'}>All Contest</NavLink>
        <NavLink   to={'/'}>Your Contest</NavLink>
        <NavLink   to={'/'}>Leaderboard</NavLink>
    </>

  return (
    <div>

      <div className="navbar bg-base-100 shadow-sm px-8 grid grid-cols-3">
        <div className="flex-1">
          <Link className="btn border-none hover:bg-base-100 bg-base-100 text-xl"><Logo></Logo></Link>
        </div>

        <div className="flex justify-center items-center gap-8">
            {links}
        </div>


        <div className="flex justify-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={'/profile'} className="justify-between">
                  Profile
                </Link>
              </li>
              {/* <li>
                <a>Settings</a>
              </li> */}
              <li>
                <Link to={'/login'} onClick={()=>signOutUser()}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
