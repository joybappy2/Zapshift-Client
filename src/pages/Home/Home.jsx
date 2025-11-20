import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import OurServices from "./OurServices/OurServices";
import BrandsMarquee from "./BrandsMarquee/BrandsMarquee";
import DeliveryFeatures from "./DeliveryFeatures/DeliveryFeatures";

const Home = () => {
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
        <OurServices/>
      </div>

      {/* Brands Marquee */}
      <div className="mb-10">
      <BrandsMarquee/>
      </div>

      {/* Features */}
      <div>
          <DeliveryFeatures/>
      </div>
    </div>
  );
};

export default Home;
