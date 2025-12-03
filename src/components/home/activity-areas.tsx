'use client'
import Title from './title';
import { TransitionLink } from '../shared';




export default function ActivityAreas() {

    return (
        <section className='lg:px-0 py-8 md:py-12 lg:py-20 px-4 xl:px-0  max-w-screen overflow-x-hidden'>
            <div className="relative pointer-events-none flex flex-col  w-full md:justify-center md:items-center">
                <Title title="Our Areas of Activities" wrapperClassName={"!mx-0 lg:!mx-auto"} />
                <p className='text-sm md:text-xl mt-1 lg:mt-3 text-left md:text-center'>Discover innovative technology designed for your lifestyle</p>
                <div className="grid grid-cols-2 mt-4 md:mt-14 lg:grid-cols-3 gap-3 lg:gap-4 py-2 max-w-7xl mx-auto relative  w-full pointer-events-auto">
                    {["Building Solutions", "HVAC Solutions", "Energy Sector"].map((item, idx) => {
                        return (
                            <TransitionLink

                                key={idx}
                                href={`/products`}
                                className="group relative overflow-hidden rounded-2xl bg-[#9FE574] to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                            >
                                <div className="relative z-10  flex flex-col lg:flex-row items-center gap-3 lg:gap-4 p-3 md:p-4 lg:p-8">

                                    <div className="flex-1 flex flex-col justify-center space-y-2 lg:space-y-5">

                                        <h2 className='text-2xl font-semibold'>{item}</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, molestiae illo tenetur quibusdam iure atque?</p>
                                    </div>
                                </div>
                            </TransitionLink>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
