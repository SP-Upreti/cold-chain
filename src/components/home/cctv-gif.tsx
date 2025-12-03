import Image from "next/image";
import React from "react";

const CCTV = () => {
  return (
    <div className="relative h-[70dvh] overflow-hidden rounded-2xl">
      {/* Background Image */}
      <Image
        src="/cctv/cctvgif-1.gif"
        height={1000}
        width={1500}
        alt="Plaza Sales"
        className="h-full w-full object-cover rounded-2xl"
      />

      {/* Overlay gradient (optional for contrast) */}
      <div className="absolute inset-0 bg-red-600/60"></div>

      {/* Centered Text & Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat uppercase w-1/4">
          Someone is watching you!
        </h2>
        <button className="bg-white font-poppins hover:bg-white text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
          Enquiry now
        </button>
      </div>
    </div>
  );
};

export default CCTV;
