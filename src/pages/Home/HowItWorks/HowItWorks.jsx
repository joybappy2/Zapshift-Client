import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const HowItWorks = () => {
  return (
    <>
      <>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className=" bg-base-100 rounded-xl p-4 space-y-2">
            <CiDeliveryTruck size={50} />
            <h4 className="text-lg font-semibold">Booking Pick & Drop</h4>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          {/* Card 2 */}
          <div className=" bg-base-100 rounded-xl p-4 space-y-2">
            <CiDeliveryTruck size={50} />
            <h4 className="text-lg font-semibold">Delivery Hub</h4>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          {/* Card 3 */}
          <div className=" bg-base-100 rounded-xl p-4 space-y-2">
            <CiDeliveryTruck size={50} />
            <h4 className="text-lg font-semibold">Booking SME & Corporate</h4>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          {/* Card 4 */}
          <div className=" bg-base-100 rounded-xl p-4 space-y-2">
            <CiDeliveryTruck size={50} />
            <h4 className="text-lg font-semibold">Cash On Delivery</h4>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
        </div>
      </>
    </>
  );
};

export default HowItWorks;
