import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSearchParams } from "react-router";
import useAxios from "../../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxios();
  console.log(sessionId);

  useEffect(() => {
    axiosSecure.patch(`/verify-payment?session_id=${sessionId}`).then((res) => {
      console.log(res.data);
      if (res.data.message) {
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      }
    });
  }, [sessionId, axiosSecure]);

  const CheckmarkIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={4}
      stroke="currentColor"
      className="w-8 h-8 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );

  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl min-h-screen flex justify-center items-center">
      {/* Custom Keyframes for the 'pop' animation */}
      <style>{`
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop-in {
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          /* Fade-in keyframes for text */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
        `}</style>

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center scale-150">
        {/* Icon Container with Concentric Circles */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer Ring - Pulse Animation (The 'ping' effect) */}
          {/* This absolute element creates the outward ripple effect */}
          <div
            className="absolute w-32 h-32 bg-green-400/20 rounded-full animate-ping opacity-75"
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Main Outer Ring (The 'pulse' effect) */}
          <div className="w-32 h-32 bg-green-400/20 rounded-full flex items-center justify-center animate-pulse">
            {/* Middle Ring */}
            <div className="w-24 h-24 bg-green-400/40 rounded-full flex items-center justify-center">
              {/* Inner Circle (Solid) - Pop-in Animation */}
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-sm animate-pop-in">
                {/* Check Icon as an Inline SVG (No external imports needed) */}
                <FaCheck color="white" size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Text with slight fade-in delay */}
        {/* Using the defined .animate-fade-in class from the style block */}
        <div className="text-center animate-fade-in font-bold mt-10">
          <h2 className="text-2xl font-medium text-slate-800 tracking-wide">
            Payment
          </h2>
          <h2 className="text-2xl font-medium text-slate-800 tracking-wide">
            Successful
          </h2>

          <h2>Tracking ID: {paymentInfo.trackingId}</h2>
          <h2>Transaction ID: {paymentInfo.transactionId}</h2>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
