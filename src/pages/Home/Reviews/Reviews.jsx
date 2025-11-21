import React, { useEffect, useState } from "react";
import customerTopImg from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  console.log(reviews);

  return (
    <div>
      <div className="flex flex-col items-center space-y-4 text-center">
        <figure>
          <img src={customerTopImg} alt="" />
        </figure>
        <h4 className="text-3xl md:text-4xl font-bold">
          What our customers are sayings
        </h4>
        <p className="md:px-32">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper mt-10"
      >
        {reviews.map((card, idx) => (
          <SwiperSlide>
            <ReviewCard card={card} key={idx}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
