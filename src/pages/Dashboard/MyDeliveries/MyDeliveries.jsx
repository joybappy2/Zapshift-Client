import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { FaBiking } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../Authentication/AuthContext/AuthContext";

const MyDeliveries = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();

  const { data: parcels } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/assigned-rider?riderEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleRejectParcel = (parcel) => {
    axiosSecure
      .patch(`/reject-parcel/${parcel._id}`, { riderId: parcel.riderId })
      .then((res) => {
        if (res.data.modifiedCount) {
          alert("Parcel Rejected");
        }
      });
  };

  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-5">My Deliveries</h2>

      {/* total card */}
      <div className="w-48 bg-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 mb-5">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
          <FaBiking className="text-gray-600 text-xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            {parcels?.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Pickup Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, idx) => (
              <tr key={parcel._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderRegion}</td>
                <td className="space-x-2">
                  <button className="btn btn-primary btn-sm text-black">
                    Accept Parcel
                  </button>
                  <button
                    onClick={() => handleRejectParcel(parcel)}
                    className="btn btn-warning btn-sm"
                  >
                    Reject Parcel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveries;
