"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Title from '../home/title';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const options = [
    {
      title: "Forward",
      description: "Cozy glamping under the stars",
      image: "/about/one.png",
      icon: "/brands/Forward.png"
    },
    {
      title: "Deli",
      description: "Gourmet s'mores & stories",
      image: "/banners/Deli.webp",
      icon: "/brands/Deli.png"
    },
    {
      title: "Uniarch",
      description: "Private dock & canoe rides",
      image: "/banners/uniarch.png",
      icon: "/brands/Uniarch.png"
    },
    {
      title: "UNV",
      description: "Outdoor sauna & hot tub",
      image: "/banners/UNV.jpg",
      icon: "/brands/UNV.png"
    },
    {
      title: "Ziasys",
      description: "Expert-led nature tours",
      image: "/banners/ziasys2.jpg",
      icon: "/brands/Ziasys.png"
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Set new timeout for 0.5 seconds
    const timeout = setTimeout(() => {
      handleOptionClick(index);
    }, 50);

    setHoverTimeout(timeout);
  };

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 700);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Skip animations on mobile
    if (isMobile) {
      setAnimatedOptions(options.map((_, i) => i));
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isMobile]);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <div className="relative py-12 md:py-28 px-4 xl:px-0 flex h-full min-h-screen flex-col items-center justify-center  bg-muted/50  font-sans text-zinc-800">
      {/* Header Section */}
      <div className="w-full mx-auto md:text-center   mb-2 ">
        <Title wrapperClassName="!mb-1  text-center w-full" className="  !mb-0 text-black dark:text-white !pb-0" title="We're Your Growth Partners." />
        <p className=" mt-2 text-sm md:text-xl text-zinc-700 font-medium  mx-auto animate-fadeInTop delay-600">Discover luxurious camping experiences in nature’s most breathtaking spots.</p>
      </div>


      {/* Options Container */}
      {isMobile ? (
        // Mobile: Simple grid with 4 items, no animations
        <div className="w-full  mt-8 grid grid-cols-1 gap-4 max-w-md mx-auto">
          {options.slice(0, 4).map((option, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-end overflow-hidden rounded-lg h-[200px]"
              style={{
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.4)),url('${option.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="p-4 flex items-center gap-3">
                <div className="size-12 shrink-0 bg-white rounded-full p-2 flex items-center justify-center">
                  <Image src={option.icon} alt={option.title} width={48} height={48} className="object-contain" />
                </div>
                <div className="text-white">
                  <div className="font-bold ">{option.title}</div>
                  <div className="text-xs">{option.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop: Interactive selector with animations
        <div className="options mt-14 flex w-full rounded-md max-w-7xl min-w-[600px] h-[500px] mx-0 items-stretch overflow-hidden relative">
          {options.map((option, index) => (
            <div
              key={index}
              className={`
                option relative  flex flex-col justify-end overflow-hidden transition-all duration-700 !delay-200 ease-in-out
                ${activeIndex === index ? 'active' : ''}
              `}
              style={{
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.4)),url('${option.image}')`,
                backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '60px',
                minHeight: '100px',
                margin: 0,
                cursor: 'pointer',
                backgroundColor: '#18181b',
                boxShadow: activeIndex === index
                  ? '0 20px 60px rgba(0,0,0,0.50)'
                  : '0 10px 30px rgba(0,0,0,0.30)',
                flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                zIndex: activeIndex === index ? 10 : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                willChange: 'flex-grow, box-shadow, background-size, background-position',
              }}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              {/* Shadow effect */}
              <div
                className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 z-20  ease-in-out"
                style={{
                  bottom: activeIndex === index ? '0' : '-40px',
                  height: '120px',
                }}
              ></div>

              {/* Label with icon and info */}
              <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none p-4 pb-10 gap-3 w-full">
                <div className="icon size-16 shrink-0 bg-white rounded-full p-2 flex items-center justify-center   flex-grow-0 transition-all duration-200">
                  <Image src={option.icon} alt={option.title} width={200} height={200} className="object-contain w-20" />
                </div>
                <div className="info text-white whitespace-pre relative">
                  <div
                    className="main font-bold text-2xl transition-all duration-700 ease-in-out"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="sub text-base  transition-all duration-700 ease-in-out"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;