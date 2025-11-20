import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ card }) => {
  const { user_photoURL } = card;
  return (
    <div>
      <div className="bg-base-100 rounded-xl p-6 max-w-sm">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-cyan-300 text-3xl" />

        {/* Testimonial Text */}
        <p className=" mt-3">
          A posture corrector works by providing support and gentle alignment to
          your shoulders, back, and spine, encouraging you to maintain proper
          posture throughout the day.
        </p>

        {/* Divider */}
        <div className="border-t border-dashed my-4"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <figure>
            <img src={user_photoURL} className="w-12 h-1/2" alt="" />
          </figure>

          <div>
            <h4 className="font-semibold text-sm">Awlad Hossin</h4>
            <p className="text-xs text-gray-500">Senior Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
