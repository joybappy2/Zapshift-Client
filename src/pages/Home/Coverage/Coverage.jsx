import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const position = [24.181009000396962, 89.74686107027186];
  const [serviceCenters, setServiceCenter] = useState([]);
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenter(data));
  }, []);

  console.log(serviceCenters);

  return (
    <div className="my-8">
      {/* Container */}
      <div className="bg-base-100 p-10 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          We are available in 64 districts
        </h2>

        {/* Search */}
        <div className="flex relative w-max">
          <input className="input" type="text" name="" id="" />
          <div className="absolute -right-2 z-20">
            <ButtonPrimary text="Search" />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold">
            We deliver almost all over Bangladesh
          </h4>
        </div>

        {/* Map */}
        <div>
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            className="h-[600px]"
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
      </div>
    </div>
  );
};

export default Coverage;
