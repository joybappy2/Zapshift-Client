import { FaBiking, FaEye } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";

const RidersApplications = () => {
  // fetching riderApplications
  const axiosSecure = useAxios();
  const {
    data: riderRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderRequests"],
    queryFn: async () => {
      const data = await axiosSecure.get("/riders").then((res) => {
        return res.data;
      });
      return data;
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  // reject or approve rider request
  const handleRiderRequest = async (rider, newStatus) => {
    const riderInfo = {
      approval: newStatus,
      email: rider?.email,
    };

    const response = await axiosSecure.patch(`/rider/${rider._id}`, riderInfo);
    if (response.data.modifiedCount) {
      refetch();
      alert("status updated to: ", riderInfo.approval);
    }
  };

  // delete rider request
  const handleDeleteRiderRequest = async (id) => {
    const res = await axiosSecure.delete(`/rider/${id}`);
    if (res.data.deletedCount) {
      refetch();
      alert("Deleted");
    }
  };

  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-5">All Applications</h2>

      {/* total card */}
      <div className="w-48 bg-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 mb-5">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
          <FaBiking className="text-gray-600 text-xl" />
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            {riderRequests?.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-200">
              <th></th>
              <th>Name</th>
              <th>Region</th>
              <th>Warehouse</th>
              <th>Approval</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riderRequests.map((r, idx) => (
              <tr key={r._id} className="hover:bg-gray-100 font-semibold">
                <th>{idx + 1}</th>
                <td>{r.name}</td>
                <td>{r.region}</td>
                <td>{r.warehouse}</td>
                <td>
                  <span
                    className={`
                    badge badge-dash 
                    ${r.approval === "rejected" && "badge-error"}
                    ${r.approval === "pending" && "badge-warning"}
                    ${r.approval === "approved" && "badge-success"}
                    `}
                  >
                    {r.approval}
                  </span>
                </td>
                <td className="space-x-3 flex items-center">
                  <button className="btn btn-sm bg-transparent border-0 p-0">
                    <FaEye size={40} color="orange"></FaEye>
                  </button>

                  <button
                    onClick={() => handleRiderRequest(r, "approved")}
                    className={`btn btn-sm btn-success text-white ${
                      r.approval === "approved" && "hidden"
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRiderRequest(r, "rejected")}
                    className={`btn btn-sm btn-error text-white ${
                      r.approval === "approved" && "hidden"
                    }`}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDeleteRiderRequest(r._id)}
                    className="btn btn-sm bg-transparent border-0 p-0"
                  >
                    <MdDeleteForever size={40} color="red"></MdDeleteForever>
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

export default RidersApplications;
