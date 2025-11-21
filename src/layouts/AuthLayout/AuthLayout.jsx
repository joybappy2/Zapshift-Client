import React from "react";
import Logo from "../../components/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className=" relative">
      <div className="absolute md:top-10 md:left-10">
        <Logo />
      </div>

      <div className="flex-col-reverse flex md:flex-row min-h-screen">
        {/* Form */}
        <div className=" md:flex-1 flex justify-center items-center">
          <div className="absolute mb-[600px] md:mb-0">
            <Outlet></Outlet>
          </div>
        </div>

        {/* Image */}
        <figure className=" bg-[#fafdf0] flex-1 md:flex justify-center items-center">
          <img
            className="w-full object-cover lg:scale-75"
            src={authImg}
            alt=""
          />
        </figure>
      </div>
    </div>
  );
};

export default AuthLayout;
