import React from "react";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";

const Coverage = () => {
  return (
    <div className="my-8">
      {/* Container */}
      <div className="bg-base-100 p-10 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          We are available in 64 districts
        </h2>

        {/* Search */}
        <div className="flex relative w-max">
          <input className="input" type="text" name="" id="" />
          <div className="absolute -right-2 z-20">
            <ButtonPrimary text="Search" />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold">
            We deliver almost all over Bangladesh
          </h4>
        </div>

        {/* Map */}
      </div>
    </div>
  );
};

export default Coverage;
