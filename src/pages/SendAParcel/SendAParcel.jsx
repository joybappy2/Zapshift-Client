import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SendAParcel = () => {
  const { register, handleSubmit, watch } = useForm();
  const [serviceCenters, setServiceCenter] = useState([]);

  // Fething Service Centers
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenter(data);
      });
  }, []);

  // Extracting regions from service center
  const regionsIncludingDuplicate = serviceCenters?.map(
    (center) => center.region
  );
  // extracting 8 regions
  const regions = [...new Set(regionsIncludingDuplicate)];
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const getDistricts = (selectedRegion) => {
    const centersByRegion = serviceCenters?.filter(
      (center) => center.region === selectedRegion
    );
    const districts = centersByRegion?.map((center) => center.district);
    return districts;
  };

  const senderDistricts = getDistricts(senderRegion);
  const receiverDistricts = getDistricts(receiverRegion);

  // Handle Parcel Booking Button
  const handleParcelBooking = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document" ? true : false;
    const isSameCity = data.senderRegion === data.receiverRegion ? true : false;
    const parcelWeight = parseFloat(data.parcelWeight);
    console.log(isSameCity);

    let cost = 0;

    // if parcelType === document
    if (isDocument) {
      cost = isSameCity ? 60 : 80;
    }
    // If Not Document
    else if (parcelWeight <= 3 && parcelWeight > 0) {
      cost = isSameCity ? 110 : 150;
    }
    // if weight more than 3 kg
    else if (parcelWeight > 3) {
      cost = isSameCity ? parcelWeight * 40 : parcelWeight * 40 + 40;
    }

    console.log(cost);
  };

  return (
    <div className="my-8">
      <div className="bg-base-100 md:p-10 p-4 space-y-8 rounded-2xl">
        <form onSubmit={handleSubmit(handleParcelBooking)}>
          <div className="">
            {/* <!-- Title --> */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Send A Parcel
            </h1>

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Enter your parcel details
            </h2>
            <div className="border-b mb-6 border-gray-400"></div>

            {/* <!-- Parcel Type */}
            <div className="flex items-center gap-6 mb-8">
              <label className="flex items-center cursor-pointer gap-2">
                <input
                  {...register("parcelType")}
                  type="radio"
                  className="radio radio-primary"
                  defaultChecked
                  value="document"
                />
                <span>Document</span>
              </label>

              <label className="flex items-center cursor-pointer gap-2">
                <input
                  {...register("parcelType")}
                  type="radio"
                  className="radio radio-primary"
                  value="non-document"
                />
                <span>Not-Document</span>
              </label>
            </div>

            {/*  Parcel Name / Weight  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label>Parcel Name</label>
                <input
                  type="text"
                  placeholder="Parcel Name"
                  className="input input-bordered w-full"
                  {...register("parcelName")}
                />
              </div>

              <div>
                <label>Weight (KG)</label>
                <input
                  type="text"
                  placeholder="Parcel Weight (KG)"
                  className="input input-bordered w-full"
                  {...register("parcelWeight")}
                />
              </div>
            </div>

            {/* Sender + Receiver Details  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Sender Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sender Details</h3>

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Sender Name"
                    className="input input-bordered w-full"
                    {...register("senderName")}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    {...register("senderAddress")}
                  />
                  <input
                    type="text"
                    placeholder="Sender Phone No"
                    className="input input-bordered w-full"
                    {...register("senderPhone")}
                  />

                  {/* Sender Region */}
                  <select
                    className="select select-bordered w-full
                  "
                    {...register("senderRegion")}
                  >
                    <option>Select your region</option>

                    {regions?.map((region, idx) => (
                      <option key={idx} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>

                  {/* Sender District */}
                  <select
                    className="select select-bordered w-full
                  "
                    {...register("senderDistrict")}
                  >
                    <option>Select your District</option>

                    {senderDistricts?.map((distritc, idx) => (
                      <option key={idx} value={distritc}>
                        {distritc}
                      </option>
                    ))}
                  </select>

                  <textarea
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Pickup Instruction"
                  ></textarea>
                </div>
              </div>

              {/* <!-- Receiver --> */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Receiver Details</h3>

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    className="input input-bordered w-full"
                    {...register("receiverName")}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    {...register("receiverAddress")}
                  />
                  <input
                    type="text"
                    placeholder="Receiver Contact No"
                    className="input input-bordered w-full"
                    {...register("receiverPhone")}
                  />

                  {/* Receiver Region */}
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverRegion")}
                  >
                    <option>Select your District</option>
                    {regions?.map((region, idx) => (
                      <option key={idx} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>

                  {/* Receiver District */}
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverDistrict")}
                  >
                    <option>Select your District</option>
                    {receiverDistricts?.map((district, idx) => (
                      <option key={idx} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  <textarea
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Delivery Instruction"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* <!-- Pickup Note --> */}
            <p className="text-sm text-gray-500 mt-6">
              * PickUp Time 4pm-7pm Approx.
            </p>

            {/* <!-- Button --> */}
            <button className="btn btn-primary text-black font-bold mt-6 px-10">
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendAParcel;
