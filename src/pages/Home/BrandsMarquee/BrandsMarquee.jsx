import React from "react";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const BrandsMarquee = () => {
  const brandsLogos = [amazon, casio, moonstar, randstad, star, start_people];
  return (
    <div>
      <h2 className="text-center text-secondary text-3xl md:text-4xl font-bold">
        We've helped thousands of sales team
      </h2>

      <div className="w-full p-12">
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          modules={[Autoplay]}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
        >
          {brandsLogos.map((logo, idx) => (
            <SwiperSlide key={idx}>
              <img src={logo} alt="brand logo" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandsMarquee;
