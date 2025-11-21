import React from "react";
import servicesImg from "../../../assets/service.png";

const OurServices = () => {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className="bg-secondary text-white md:p-16 p-4 mb-20 mt-28 rounded-2xl ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mt-5 md:mt-0">
          Our Services
        </h2>
        <p className="text-center mt-4 text-gray-300 md:px-32">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {cards.map((card, idx) => (
            // Card
            <div
              key={idx}
              className={`border p-14 text-center bg-base-100 text-black space-y-2 rounded-xl ${
                idx === 1 && "bg-primary"
              }`}
            >
              <figure>
                <img className="mx-auto" src={servicesImg} alt="" />
              </figure>
              <h4 className="text-lg font-semibold">
                Express & Standard Delivery
              </h4>
              <p className="text-sm">
                We deliver parcels within 24–72 hours in Dhaka, Chittagong,
                Sylhet, Khulna, and Rajshahi. Express delivery available in
                Dhaka within 4–6 hours from pick-up to drop-off.
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurServices;
