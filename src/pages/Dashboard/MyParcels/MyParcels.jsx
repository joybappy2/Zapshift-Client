import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Authentication/AuthContext/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { FiTruck } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();
  // const { isPending, data } = useQuery({
  //   queryKey: ["my-parcels", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/my-parcels?email=${user.email}`);
  //     return res.data;
  //   },
  // });

  const { data, isPending, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/my-parcels?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-[#caeb66]"></span>
      </div>
    );
  }
  console.log(data);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    console.log(parcel);
    const paymentInfo = {
      parcelPrice: parcel.parcelPrice,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    const checkoutUrl = res.data.url;
    window.location.assign(checkoutUrl);
  };

  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-5">My Parcels</h2>

      {/* total card */}
      <div className="w-48 bg-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 mb-5">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
          <FiTruck className="text-gray-600 text-xl" />
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-semibold text-gray-900">{data?.length}</p>
        </div>
      </div>

      <div className="bg-base-100 p-6 rounded-xl shadow w-full">
        <table className="w-full text-left">
          {/* === TABLE HEADER === */}
          <thead>
            <tr className=" text-gray-700 bg-gray-200">
              <th className="px-4 py-3">Parcel ID</th>
              <th className="px-4 py-3">Parcel Name</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Delivery Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          {/* === TABLE BODY (ONE ROW) === */}
          <tbody>
            {data?.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                {/* Cons ID */}
                <td className="px-4 py-4 text-sm text-gray-700 font-medium">
                  #{parcel._id}
                </td>

                {/* Name */}
                <td className="px-4 py-4 text-sm text-gray-700 font-medium">
                  {parcel.parcelName}
                </td>

                {/* Amount */}
                <td className="px-4 py-4 text-sm text-gray-600">
                  <p>৳ {parcel.parcelPrice}</p>
                </td>

                {/* Payment */}
                <td
                  className={`px-4 py-4 text-sm font-medium ${
                    parcel.paymentStatus === "unpaid"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {parcel?.paymentStatus}
                </td>

                {/* Delivery */}
                <td className="px-4 py-4 text-sm font-medium text-green-600">
                  {parcel?.deliveryStatus}
                </td>

                {/* Action */}
                <td className="px-4 py-4 text-sm">
                  <div className="flex gap-2">
                    {/* Pay Button */}

                    <button
                      onClick={() => handlePayment(parcel)}
                      className={`btn btn-sm bg-primary text-black px-4 py-1 rounded-md text-sm font-medium ${
                        parcel.paymentStatus === "paid" && "hidden"
                      }`}
                    >
                      Pay
                    </button>

                    {/* View Button */}
                    <button className="flex items-center gap-1 bg-gray-200 text-gray-800 px-4 py-1 rounded-md text-sm font-medium">
                      <FiEye size={16} /> View
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-sm flex items-center gap-1 bg-red-100 text-red-600 px-4 py-1 rounded-md text-sm font-medium"
                    >
                      <RiDeleteBin6Line size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
