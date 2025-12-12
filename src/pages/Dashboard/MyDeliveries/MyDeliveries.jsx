import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { FaBiking, FaCheck } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../Authentication/AuthContext/AuthContext";

const MyDeliveries = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();

  const { data: parcels, refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/assigned-rider?riderEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const { data: rider } = useQuery({
    queryKey: ["/rider", user?.email, parcels],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider?email=${user?.email}`);
      return res.data;
    },
  });

  console.log("rider ", rider);

  const handleRejectParcel = (parcel) => {
    axiosSecure
      .patch(`/reject-parcel/${parcel._id}`, { riderId: parcel.riderId })
      .then((res) => {
        if (res.data.modifiedCount) {
          alert("Parcel Rejected");
          refetch();
        }
      });
  };

  const handleAcceptParcel = (parcel) => {
    const riderInfo = {
      riderId: parcel.riderId,
    };
    console.log("clik");
    axiosSecure.patch(`/accept-parcel/${parcel._id}`, riderInfo).then((res) => {
      if (res.data.modifiedCount) {
        alert("Parcel Accepted");
        refetch();
      }
    });
  };

  const handleMarkedAsPickedUp = (parcel, deliveryStatus, workingStatus) => {
    const parcelId = parcel._id;
    const riderInfo = {
      riderId: parcel.riderId,
    };

    axiosSecure
      .patch(
        `/parcel/${parcelId}/delivery?deliveryStatus=${deliveryStatus}&workingStatus=${workingStatus}`,
        riderInfo
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          alert(`Parcel is ${deliveryStatus}`);
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
              <th>Sender Email</th>
              <th>Delivery Status</th>
              <th>Actions</th>
              <th>Picked-Up</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, idx) => (
              <tr key={parcel._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderRegion}</td>
                <td>{parcel.senderEmail}</td>
                <td>{parcel.deliveryStatus}</td>
                <td className="space-x-2">
                  {/* Rider info needed here to show btn conditinally */}

                  <>
                    <button
                      disabled={
                        rider?.workingStatus !== "available" ||
                        parcel.deliveryStatus === "delivered"
                      }
                      onClick={() => handleAcceptParcel(parcel)}
                      className={`btn bg-primary btn-sm `}
                    >
                      Accept Parcel
                    </button>
                    <button
                      disabled={
                        rider?.workingStatus !== "available" ||
                        parcel.deliveryStatus === "delivered"
                      }
                      onClick={() => handleRejectParcel(parcel)}
                      className="btn btn-warning btn-sm"
                    >
                      Reject Parcel
                    </button>
                  </>
                </td>

                {/* Mark PickedUp  */}
                <td>
                  <button
                    disabled={
                      parcel.deliveryStatus === "picked up" ||
                      parcel.deliveryStatus === "delivered" ||
                      parcel.deliveryStatus === "assigned to rider"
                    }
                    onClick={() =>
                      handleMarkedAsPickedUp(
                        parcel,
                        "picked up",
                        "out for delivery"
                      )
                    }
                    className="btn btn-info text-white p-2 w-fit h-fit"
                  >
                    <FaCheck
                      className="hover:animate-bounce"
                      size={20}
                    ></FaCheck>
                  </button>
                </td>

                {/* Mark Delivered */}
                <td>
                  <button
                    disabled={
                      parcel.deliveryStatus === "delivered" ||
                      parcel.deliveryStatus !== "picked up"
                    }
                    onClick={() =>
                      handleMarkedAsPickedUp(parcel, "delivered", "available")
                    }
                    className="btn btn-success text-white p-2 w-fit h-fit"
                  >
                    <FaCheck
                      className="hover:animate-bounce"
                      size={20}
                    ></FaCheck>
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
