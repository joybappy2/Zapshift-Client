import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="scale-75">
      <div className="flex items-center">
        <img src={logo} alt="logo png" />
        <h3 className="font-bold text-4xl mt-4 -ml-3">ZapShift</h3>
      </div>
    </div>
  );
};

export default Logo;
