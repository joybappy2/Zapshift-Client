import React, { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import amazonImg from "../assets/brands/amazon.png";
import casioImg from "../assets/brands/casio.png";
import monstarImg from "../assets/brands/moonstar.png";
import randstadImg from "../assets/brands/randstad.png";
import starImg from "../assets/brands/star.png";
import startImg from "../assets/brands/start_people.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./Home/Reviews/ReviewCard";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useForm } from "react-hook-form";

const Revision = () => {
  const [reviews, setReviews] = useState([]);
  const searchedLocationRef = useRef(null);
  const position = [24.27800979351428, 90.17544802338075];
  const [serviceCenters, setServiceCenters] = useState([]);
  const mapRef = useRef(null);
  const [userName, setUserName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);
      });
  }, []);

  const brandsLogos = [
    amazonImg,
    casioImg,
    monstarImg,
    randstadImg,
    starImg,
    startImg,
  ];

  const handleSearch = () => {
    const searchedLocation = searchedLocationRef.current.value;
    const foundLocation = serviceCenters.find((center) =>
      center.city.toLowerCase().includes(searchedLocation.toLowerCase())
    );
    console.log(foundLocation);
    mapRef.current.flyTo([foundLocation.latitude, foundLocation.longitude], 14);
  };

  const handleName = (data) => {
    console.log(data);
    setUserName(data.name);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto mb-20">
        {/* Marquee */}
        <div>
          <h2 className="text-4xl font-bold text-center pt-10">
            We've helped thousands of sales team
          </h2>

          {/* Brand Marquee */}
          <Marquee speed={50} pauseOnHover className="cursor-grab">
            <div className="flex gap-20 justify-center mt-10">
              {brandsLogos.map((logo) => (
                <img className="" src={logo} alt="" />
              ))}
            </div>
          </Marquee>
        </div>

        {/* Reviews Slider */}
        <div>
          <h2 className="text-4xl font-bold text-center mt-20">
            What our customers are sayings
          </h2>
          <p className="text-sm text-center mt-2 text-gray-500">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>

          <div className="mt-10">
            <Swiper
              effect={"coverflow"}
              autoplay={{ delay: 2000 }}
              loop={true}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 0,
                stretch: 200,
                depth: 300,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper"
            >
              {reviews.map((card) => (
                <SwiperSlide>
                  {<ReviewCard card={card}></ReviewCard>}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Map */}
        <div>
          <h2 className="text-4xl font-bold my-5">
            Search for Your Area in the Map
          </h2>

          <div className="join my-5">
            <label className="input join-item">
              <input
                ref={searchedLocationRef}
                type="email"
                placeholder="Search Location"
              />
            </label>
            <button
              onClick={handleSearch}
              className="btn btn-primary text-black join-item"
            >
              Search
            </button>
          </div>

          <MapContainer
            ref={mapRef}
            center={position}
            zoom={6.5}
            scrollWheelZoom={false}
            className="h-[600px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center) => (
              <Marker position={[center.latitude, center.longitude]}>
                <Popup>
                  <strong>{center.city}</strong>
                  <p>{center.covered_area?.join(",")}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* form */}
        <div className="mt-20">
          <h2 className="text-xl font-bold">
            {userName ? `${userName}` : "No Name"}
          </h2>
          <form onSubmit={handleSubmit(handleName)}>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input"
              placeholder="Enter Your Name to Show On Top"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}

            <button type="submit" className="btn btn-primary text-black ml-10">
              Submit Name
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Revision;
