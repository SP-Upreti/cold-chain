import React from "react";

const About = () => {
  return (
    <div className=" bg-muted/50  md:text-center  px-4  xl:px-0 py-12 md:py-20  ">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="md:flex flex-col mb-4 md:mb-12 justify-center md:items-center">
          <h2 className="text-xl font-semibold md:text-3xl ">Discover Plaza Sales
      </h2>
        <p className="">
          Your Trusted IT Partner in Nepal
        </p>

      </div>
      {/* Grid */}
      <div className=" gap-8 text-zinc-600 font-poppins text-xs ">
        <p>
          <span className="text-red-500">Plaza Sales Pvt. Ltd.</span> has been
          the leading 
            IT hardware and software company in Nepal
          since 2014. We offer a comprehensive range of IT-integrated products
          and services, catering to startups and large enterprises alike.
        
          Our goal is simple: provide affordable IT solutions that deliver a{" "}
          <span className="text-red-500 italic">high return on investment</span>, 
          security, efficiency, and sustainable business growth. We help
          businesses enhance operations through high-quality hardware,
          software, and networking solutions.
        
          Plaza Sales is focused on customer satisfaction, quality assurance,
          and innovation. We work closely with our clients to ensure that our
          solutions meet their specific needs and objectives, whether
          establishing new IT infrastructure or upgrading existing technology.
          Our company proudly partners with trusted brands like{" "}
          <span className="text-red-500 italic">
            UNV, UNIARCH, ZIASYS, FORWARD, DELI, and VENTION
          </span>
          , delivering cutting-edge technology and strong security for
          long-term success. Our dedicated expert teams ensure your business
          stays ahead in the digital landscape.
        </p>
      </div>
      </div>
    </div>
  );
};

export default About;
