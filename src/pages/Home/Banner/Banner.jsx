import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import ArrowIcon from "../../../components/ArrowIcon/ArrowIcon";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={2000}>
      {/* Banner 1 */}
      <div className="relative">
        <img src={bannerImg1} />
        <div className="hidden lg:block absolute bottom-5 z-10 max-w-[700px] text-left pl-20">
          <p className="mb-5">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center">
              <ButtonPrimary text={"Track Your Parcel"} />
              <ArrowIcon />
            </div>
            <button className="btn rounded-xl">Be A Rider</button>
          </div>
        </div>
      </div>

      {/* Banner 2 */}
      <div>
        <img src={bannerImg2} />
        <div className="hidden lg:block absolute bottom-8 z-10 max-w-[700px] text-left pl-20">
          <p className="mb-5">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center">
              <ButtonPrimary text={"Track Your Parcel"} />
              <ArrowIcon />
            </div>
            <button className="btn rounded-xl">Be A Rider</button>
          </div>
        </div>
      </div>

      {/* Banner 3 */}
      <div>
        <img src={bannerImg3} />
        <div className="hidden lg:block absolute bottom-12 z-10 max-w-[700px] text-left pl-20">
          <p className="mb-5">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center">
              <ButtonPrimary text={"Track Your Parcel"} />
              <ArrowIcon />
            </div>
            <button className="btn rounded-xl">Be A Rider</button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
