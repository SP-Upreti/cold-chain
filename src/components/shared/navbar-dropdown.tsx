import React, { useEffect } from 'react'
import { useState } from 'react';
import { useBrandStore } from '@/store/useBrandStore';
import { Icon } from '@iconify/react';
const ACTIVITIES = [
  {
    title: "Building Solutions",
    description: "We specialize in creating solutions that address real challenges.",
    icon: "prime:building-columns"
  },
  {
    title: "HVAC Solutions",
    description: "Our consulting services help businesses optimize their operations.",
    icon: "iconoir:air-conditioner"
  },
  {
    title: "Energy Sector",
    description: "Our consulting services help businesses optimize their operations.",
    icon: "hugeicons:eco-energy"
  },
  {
    title: "Hydropower Sector",
    description: "Our consulting services help businesses optimize their operations.",
    icon: "mage:light-bulb"
  }
]



export default function NavbarDropdown({ drapdownState, setDrapdownState, modalRef }: {
  drapdownState: { isActive: boolean; idx: number | null };
  setDrapdownState: React.Dispatch<React.SetStateAction<{ isActive: boolean; idx: number | null }>>;
  modalRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const { brands, isLoading, fetchBrands } = useBrandStore();

  useEffect(() => {
    if (brands.length === 0 && !isLoading) {
      fetchBrands();
    }
  }, [brands.length, isLoading, fetchBrands]);

  return (
    <>
      {/* Dropdown modal area */}
      <div className={`absolute top-0 right-0! hidden md:block  ${drapdownState.isActive ? "backdrop-blur-[8px " : ""} pointer-events-none z-[210]`}>
        <div
          ref={modalRef}
          className={`min-h-[50dvh] w-xs max-w-7xl   mx-auto py-4    dark:bg-zinc-900 pointer-events-auto rounded-b-md   transition-all duration-500 ${drapdownState.isActive ? "translate-y-0" : "-translate-y-[110%] "
            }`}
        >
          <div className="grid p-2 bg-white shadow-2xl mt-[1rem] rounded-xl border border-primary/20 grid-cols-1 gap-4">
            {ACTIVITIES?.map((activity, idx) => (
              <div key={idx} className="p-2 group flex gap-2 hover:bg-zinc-100 rounded-md relative   group cursor-pointer">
                <div className="size-14 flex justify-center items-center shrink-0 bg-zinc-200 text-zinc-800 rounded-xs overflow-hidden">
                  <img src="/home/cat.jpg" alt="one" className='w-full h-full object-cover' />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h2 className='font-semibold'>{activity.title}</h2>
                  <p className="text-xs opacity-90 mt-1 text-left">{activity.description}</p>
                </div>


                <div className="absolute  hidden group-hover:block transition-all p-3 space-y-1 rounded-xl shadow-xl duration-1000! right-0 top-0 translate-x-full bg-white border w-xs ">
                  {ACTIVITIES.map((_, starIdx) => (
                    <div key={starIdx} className="  bg-white hover:bg-zinc-100 rounded-md p-2  gap-2 flex  items-center">
                      <div className="size-14 flex justify-center items-center shrink-0 bg-zinc-200 text-zinc-800 rounded-xs overflow-hidden">
                        <img src="/home/cat.jpg" alt="one" className='w-full h-full object-cover' />
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <h2 className='font-semibold'>{activity.title}</h2>
                        <p className="text-xs opacity-90 mt-1 text-left">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
