import React from "react";
import { ImCross } from "react-icons/im";

const PaymentCancelled = () => {
  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl min-h-screen flex justify-center items-center">
      {/* Custom Keyframes for the 'pop' animation and fade-in */}
      <style>{`
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop-in {
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
        `}</style>

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center  scale-150">
        {/* Icon Container with Concentric Circles */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer Ring - Pulse Animation (The 'ping' effect) */}
          <div
            className="absolute w-32 h-32 bg-red-400/20 rounded-full animate-ping opacity-75"
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Main Outer Ring (The 'pulse' effect) */}
          <div className="w-32 h-32 bg-red-400/20 rounded-full flex items-center justify-center animate-pulse">
            {/* Middle Ring */}
            <div className="w-24 h-24 bg-red-400/40 rounded-full flex items-center justify-center">
              {/* Inner Circle (Solid) - Pop-in Animation */}
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-sm animate-pop-in">
                {/* Cross Icon as an Inline SVG */}
                <ImCross color="white" size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Text with slight fade-in delay */}
        <div className="text-center animate-fade-in mt-10">
          <h2 className="text-2xl font-medium text-slate-800 tracking-wide">
            Payment
          </h2>
          <h2 className="text-2xl font-medium text-slate-800 tracking-wide">
            Cancelled
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
