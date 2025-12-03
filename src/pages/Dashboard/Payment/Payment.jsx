import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";

const Payment = () => {
  const axiosSecure = useAxios();

  const { parcelId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-4xl font-bold animate-spin min-h-screen flex justify-center items-center">
        Loading...
      </p>
    );
  }
  console.log(data);

  const handlePayment = async () => {
    const paymentInfo = {
      parcelPrice: data.parcelPrice,
      parecelName: data.parcelName,
      senderEmail: data.senderEmail,
      parcelId: data._id,
    };

    const res = await axiosSecure.post(
      "/create-checkout-sessions",
      paymentInfo
    );
    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <div className="bg-base-100 md:p-10 p-4 rounded-2xl">
      <p className="text-4xl font-bold">
        Pay ${data.parcelPrice} For : {data?.parcelName}
      </p>

      <button
        onClick={handlePayment}
        className="btn btn-primary text-black mt-5"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
