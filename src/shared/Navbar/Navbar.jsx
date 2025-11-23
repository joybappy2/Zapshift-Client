import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo/Logo";
import { AuthContext } from "../../Authentication/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logout } = use(AuthContext);

  // Signout User
  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("Logout Successfull");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/services">Services</NavLink>
      </li>

      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>

      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>

      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/be-a-rider">Be a Rider</NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm rounded-2xl">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="cursor-pointer lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content rounded-box z-1 mt-6 w-52 p-2 shadow font-semibold backdrop-blur-sm"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{links}</ul>
        </div>

        {/* End */}
        <div className="navbar-end pr-5">
          {user ? (
            <div className="flex gap-2 items-center flex-row-reverse">
              <button
                onClick={handleLogout}
                className="btn btn-primary text-black border-0 rounded-xl"
              >
                Logout
              </button>

              {/* Profile */}
              <div>
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user?.photoURL}
                  alt="user avatar"
                />
              </div>
            </div>
          ) : (
            <Link to="/register">
              <div className="btn btn-primary text-black border-0 rounded-xl">
                Register
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
