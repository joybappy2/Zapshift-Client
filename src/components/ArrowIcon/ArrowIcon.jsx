import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ArrowIcon = () => {
  return (
    <div className="bg-black text-primary rounded-full w-10 h-10 flex justify-center items-center text-lg -rotate-45">
      <FaArrowRight />
    </div>
  );
};

export default ArrowIcon;
