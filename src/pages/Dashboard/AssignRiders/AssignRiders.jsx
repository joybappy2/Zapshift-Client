import { useQuery } from "@tanstack/react-query";
import { FaBiking, FaFan } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { useRef, useState } from "react";

const AssignRiders = () => {
  const findRiderModalRef = useRef();
  const [selectedParcelRegion, setSelectedParcelRegion] = useState("");
  const [selectedParcel, setSelectedParcel] = useState({});

  const axiosSecure = useAxios();
  const {
    data: parcels = [],
    refetch: parcelRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/all-parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [], isLoading: riderLoading } = useQuery({
    queryKey: ["riders", "workingStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?approval=approved&workingStatus=available`
      );
      return res.data;
    },
  });

  console.log(parcels);

  //   console.log(parcels);

  const openFindRiderModal = (parcel) => {
    setSelectedParcelRegion(parcel.senderRegion);
    setSelectedParcel(parcel);
    findRiderModalRef.current.showModal();
  };

  const handleAssignParcel = (rider) => {
    const riderInfo = {
      parcelId: selectedParcel._id,
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
    };

    axiosSecure
      .patch(`/parcel/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          parcelRefetch();
          alert("parcel delivery status updated");
          findRiderModalRef.current.close()
        }
      });
  };
  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-5">Assign Riders</h2>

      {/* total card */}
      <div className="w-48 bg-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 mb-5">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
          <FaBiking className="text-gray-600 text-xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            {parcels.length}
          </p>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-300">
              <th>#</th>
              <th>Parcel Name</th>
              <th>Pickup Region</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="flex justify-center items-center min-h-[500px] text-center w-screen">
                  <FaFan
                    size={100}
                    className="animate-spin text-primary"
                  ></FaFan>
                </td>
              </tr>
            ) : (
              parcels.map((parcel, idx) => (
                <tr key={parcel?._id} className="hover:bg-base-200">
                  <th>{idx + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.senderRegion}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.deliveryStatus === "pending-pickup" &&
                        "badge-warning text-black"
                      }`}
                    >
                      {parcel.deliveryStatus}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => openFindRiderModal(parcel)}
                      className="btn btn-primary text-black"
                    >
                      Find Rider
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* find rider modal */}
      <dialog
        ref={findRiderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-h-screen overflow-hidden max-w-4xl">
          <h3 className="font-bold text-lg mb-4">
            Sender Region...
            <span className="text-2xl text-orange-500">
              {selectedParcelRegion}
            </span>
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-base-300">
                <tr>
                  <th>#</th>
                  <th>Rider Name</th>
                  <th>Working Status</th>
                  <th>Rider Region</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riderLoading ? (
                  <tr>
                    <td className="flex justify-center items-center min-h-[500px] text-center w-screen">
                      <FaFan
                        size={100}
                        className="animate-spin text-primary"
                      ></FaFan>
                    </td>
                  </tr>
                ) : (
                  riders.map((rider, idx) => (
                    <tr key={idx}>
                      <th>{idx + 1}</th>
                      <td>{rider.name}</td>
                      <td>
                        <span
                          className={`badge badge-soft ${
                            rider.workingStatus === "available"
                              ? " badge-success"
                              : "badge-error"
                          }`}
                        >
                          {rider.workingStatus}
                        </span>
                      </td>
                      <td>{rider.region}</td>
                      <td>
                        <button
                          onClick={() => handleAssignParcel(rider)}
                          className="btn btn-primary text-black btn-sm"
                        >
                          Assign Rider
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
