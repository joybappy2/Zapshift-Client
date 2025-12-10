import React, { use, useEffect, useState } from "react";
import agentImg from "../../assets/agent-pending.png";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Authentication/AuthContext/AuthContext";

const BeARider = () => {
  const { register, handleSubmit, watch } = useForm();
  const [warehouses, setWarehouses] = useState([]);
  const axiosSecure = useAxios();
  const { user } = use(AuthContext);

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setWarehouses(data);
      });
  }, []);

  const regions = warehouses?.map((house) => house.region);
  const uniqueRegions = [...new Set(regions)];
  console.log(uniqueRegions);

  const selectedDistrict = watch("district");

  const coveredAreasByDistrict = (distritcName) => {
    const districtInfo = warehouses.find(
      (house) => house.district === distritcName
    );
    const coveredAreas = districtInfo?.covered_area || [];

    return coveredAreas;
  };

  const riderFormSubmit = (data) => {
    const age = parseInt(data.age);
    data.age = age;
    data.workingStatus = "available";

    console.log(data);

    axiosSecure.post("/riders", data).then((res) => {
      if (res.data?.insertedId) {
        alert("Request Sent! \nWait for Confirmation");
      }
    });
  };

  return (
    <div className="my-8">
      <div className="bg-base-100 md:p-10 p-4 space-y-8 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-5">Be A Rider</h2>

        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal <br /> packages to business shipments — we
          deliver on time, every time.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className=" flex justify-center items-center">
            <img src={agentImg} className="object-cover" alt="" />
          </div>

          <form onSubmit={handleSubmit(riderFormSubmit)} className=" space-y-6">
            {/* Row 1: Name and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition duration-150 ease-in-out placeholder-gray-400 focus:outline-none  focus:ring-1 focus:ring-primary"
                  {...register("name")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Yor age
                </label>
                <input
                  {...register("age")}
                  type="number"
                  placeholder="Yor age"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition duration-150 ease-in-out placeholder-gray-400 focus:outline-none  focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Row 2: Email and District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  {...register("email")}
                  defaultValue={user?.email}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition duration-150 ease-in-out placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your District
                </label>
                <div className="relative">
                  {/* Select field with static options */}
                  <select
                    {...register("region")}
                    defaultValue=""
                    className="w-full select select-bordered transition duration-150 ease-in-out placeholder-gray-400   cursor-pointer"
                  >
                    <option value="" disabled>
                      Select your District
                    </option>

                    {uniqueRegions?.map((r, idx) => (
                      <option key={idx} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Row 3: NID No and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  NID No
                </label>
                <input
                  {...register("nid")}
                  type="text"
                  placeholder="NID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition duration-150 ease-in-out placeholder-gray-400 focus:outline-none  focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Contact
                </label>
                <input
                  {...register("contact")}
                  type="tel"
                  placeholder="Contact"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition duration-150 ease-in-out placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Row 4: Warehouse Selection (Full Width) */}
            <div className="w-full hidden">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Which wire-house you want to work?
              </label>
              <div className="relative">
                {/* Select field with static options */}
                <select
                  {...register("warehouse")}
                  defaultValue=""
                  className="w-full select select-bordered transition duration-150 ease-in-out placeholder-gray-400   cursor-pointer"
                >
                  <option value="" disabled>
                    Select wire-house
                  </option>

                  {coveredAreasByDistrict(selectedDistrict).map((area, idx) => (
                    <option key={idx} value={area}>
                      {area}
                    </option>
                  ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button (Primary Green/Lime color) */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full btn btn-primary text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
