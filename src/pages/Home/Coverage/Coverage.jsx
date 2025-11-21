import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useForm } from "react-hook-form";

const Coverage = () => {
  const position = [24.181009000396962, 89.74686107027186];
  const mapRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetching Service Centers Data
  const [serviceCenters, setServiceCenter] = useState([]);
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenter(data));
  }, []);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    const searched = e.target.search.value;
    const district = serviceCenters.find((center) =>
      center.district
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(searched.toLowerCase())
    );
    console.log(district);
    if (district) {
      const latlong = [district.latitude, district.longitude];
      mapRef.current.flyTo(latlong, 10);
    }
  };

  // Form Submit
  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div className="my-8">
      {/* Container */}
      <div className="bg-base-100 md:p-10 p-4 space-y-8 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold">
          We are available in 64 districts
        </h2>

        {/* Search */}
        <div className="join">
          <form onSubmit={handleSearch} className="flex">
            <input type="text" className="input rounded-l-lg" name="search" />
            <button className="btn btn-primary text-black font-bold join-item rounded-r-lg">
              Search
            </button>
          </form>
        </div>

        <div>
          <h4 className="text-lg font-bold">
            We deliver almost all over Bangladesh
          </h4>
        </div>

        {/* Map */}
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={5.5}
          scrollWheelZoom={false}
          className="md:h-[600px] h-[300px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, idx) => (
            <Marker key={idx} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.city}</strong>
                <br />
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Form */}
      <div className="mt-20 flex justify-center">
        <form onSubmit={handleSubmit(handleRegister)} className="form w-sm">
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email Required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /[A-Z]/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password length must be at least 8 character
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have a uppercase letter
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black font-bold mt-4">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Coverage;
