import React from "react";
import liveTrackingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/tiny-deliveryman.png";
import supportImg from "../../../assets/safe-delivery.png";

const DeliveryFeatures = () => {
  return (
    <div>
      {/* Divider */}
      <div className="border-b border-dashed border-secondary "></div>
      <div className="my-10 flex flex-col gap-5">
        {/* Card */}
        <div className="container md:flex  bg-base-100 p-8 rounded-xl  w-full">
          {/* Left */}
          <figure className="">
            <img src={liveTrackingImg} alt="" />
          </figure>

          <div className="border md:mx-10 my-10 border-dashed border-secondary "></div>

          {/* Right */}
          <div className="flex flex-col">
            <h4 className="text-xl md:text-2xl font-bold mb-4">
              Live Parcel Tracking
            </h4>
            <p>
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="container md:flex bg-base-100 p-8 rounded-xl  w-full">
          {/* Left */}
          <figure className="">
            <img src={safeDeliveryImg} alt="" />
          </figure>

          <div className="border md:mx-10 my-10 border-dashed border-secondary "></div>

          {/* Right */}
          <div className="flex flex-col">
            <h4 className="text-xl md:text-2xl font-bold mb-4">
              Live Parcel Tracking
            </h4>
            <p>
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="container md:flex bg-base-100 p-8 rounded-xl  w-full">
          {/* Left */}
          <figure className="">
            <img src={supportImg} alt="" />
          </figure>

          <div className="border md:mx-10 my-10 border-dashed border-secondary "></div>

          {/* Right */}
          <div className="flex flex-col">
            <h4 className="text-xl md:text-2xl font-bold mb-4">
              Live Parcel Tracking
            </h4>
            <p>
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 border-b border-dashed border-secondary "></div>
    </div>
  );
};

export default DeliveryFeatures;
