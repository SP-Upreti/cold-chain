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
      <div className={`fixed hidden md:block inset-0 ${drapdownState.isActive ? "backdrop-blur-[8px] " : ""} pointer-events-none z-[210]`}>
        <div
          ref={modalRef}
          className={`min-h-[50dvh] max-w-7xl  mx-auto py-4    dark:bg-zinc-900 pointer-events-auto rounded-b-md   transition-all duration-500 ${drapdownState.isActive ? "translate-y-0" : "-translate-y-[120%] "
            }`}
        >
          <div className="grid p-5 bg-white mt-[3rem] rounded-xl border border-primary/20 grid-cols-4 gap-4">
            {ACTIVITIES?.map((activity, idx) => (
              <div key={idx} className="p-4 group cursor-pointer">
                <Icon icon={activity.icon} className="text-5xl mb-4 " />
                <h2 className='text-lg font-semibold'>{activity.title}</h2>
                <p className="text-sm opacity-90 mt-2">{activity.description}</p>

                <button className="mt-4 flex gap-2 group-hover:underline items-center">Learn More <Icon icon={"meteor-icons:arrow-up-right"} className='group-hover:rotate-45 transition-all duration-300' /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
