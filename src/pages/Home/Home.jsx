import React, { use } from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import OurServices from "./OurServices/OurServices";
import BrandsMarquee from "./BrandsMarquee/BrandsMarquee";
import DeliveryFeatures from "./DeliveryFeatures/DeliveryFeatures";
import Reviews from "./Reviews/Reviews";
import { AuthContext } from "../../Authentication/AuthContext/AuthContext";

const Home = () => {
  const { user } = use(AuthContext);
  console.log(user);

  return (
    <div className="">
      {/* Banner */}
      <div className="mt-8">
        <Banner />
      </div>

      {/* How It Works */}
      <div className="my-20 md:px-20">
        <HowItWorks />
      </div>

      {/* Our Services */}
      <div>
        <OurServices />
      </div>

      {/* Brands Marquee */}
      <div className="my-20 ">
        <BrandsMarquee />
      </div>

      {/* Features */}
      <div>
        <DeliveryFeatures />
      </div>

      {/* Reviews */}
      <div className="my-20">
        <Reviews />
      </div>
    </div>
  );
};

export default Home;
