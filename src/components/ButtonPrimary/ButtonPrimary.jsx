import React from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";

const ButtonPrimary = ({ text }) => {
  return (
    <>
      <div className="flex items-center">
        <button className="btn btn-primary text-black text-lg font-bold rounded-xl">
          {text}{" "}
        </button>
      </div>
    </>
  );
};

export default ButtonPrimary;
