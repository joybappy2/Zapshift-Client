import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { AuthContext } from "../../../Authentication/AuthContext/AuthContext";
import useAxios from "../../../hooks/useAxios";

const PaymenntHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-[#caeb66]"></span>
      </div>
    );
  }

  console.log(payments);

  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-5">Payment History</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>SL</th>
              <th>Parcel Info</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment._id} className="hover:bg-base-200">
                <th>{idx + 1}</th>
                <td>{payment.parcelName}</td>
                <td>$ {payment.amount}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymenntHistory;
