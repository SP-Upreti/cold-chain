import Image from "next/image";
import React from "react";

const MultiBanner = () => {
  return (
    <div className=" h-auto ">
      <div className="flex items-center gap-4">
        <div className="w-full relative h-[70dvh]">
          {" "}
          {/* Background Image */}
          <Image
            src="/ads/cctv-ad1.png"
            height={1000}
            width={1500}
            alt="Plaza Sales"
            className="h-full w-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-red-600/20 rounded-2xl"></div>
        </div>
        <div className="w-full relative h-[70dvh]">
          {" "}
          {/* Background Image */}
          <Image
            src="/ads/dell.jpg"
            height={1000}
            width={1500}
            alt="Plaza Sales"
            className="h-full w-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-red-600/60 rounded-2xl"></div>
          {/* Centered Text & Button */}
          <div className="absolute inset-0 flex flex-col items-start justify-center text-start text-white px-6">
            <span className="text-4xl md:text-6xl font-bold mb-6 font-montserrat uppercase w-full">
              30% OFF
            </span>
            <h2 className="text-4xl md:text-4xl font-semibold mb-6 font-poppins capitalize w-full">
              Someone is watching you!
            </h2>
            <button className="bg-white font-poppins hover:bg-white text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
              Enquiry now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiBanner;
