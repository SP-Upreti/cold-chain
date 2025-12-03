'use client';
import React, { useMemo, useEffect } from 'react';
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import Title from './title';
import Image from 'next/image';

export default function DefaultDemo() {

	const images = useMemo(() => [
		{
			src: '/feature/outdoor.jpg',
			alt: 'Modern architecture building',
		},
		{
			src: '/about/second.png',
			alt: 'Urban cityscape at sunset',
		},
		{
			src: '/products/one.png',
			alt: 'Abstract geometric pattern',
		},
		{
			src: '/cctv/watch.png',
			alt: 'Mountain landscape',
		},
		{
			src: '/about/fourth.png',
			alt: 'Minimalist design elements',
		},
		{
			src: '/about/indoor.png',
			alt: 'Ocean waves and beach',
		},
		{
			src: '/about/outdoor.png',
			alt: 'Forest trees and sunlight',
		},
	], []);

	return (
		<main className="py-8 md:py-10 lg:py-12 md:min-h-screen w-full">
			<div className="relative px-4 xl:px-0 flex flex-col  items-start md:items-center justify-center">
				<Title title="Focusing on Experience" wrapperClassName="!text-left lg:!text-center !mx-0 !mb-0 lg:mx-auto" />
				<p className='text-sm md:text-lg text-left md:text-center mt-1 lg:mt-3'>We Focus on our customer experience through brand and quality service</p>
			</div>
			<div className="w-full  h-60 mt-8 relative rounded-xl overflow-hidden  block md:hidden">
				<Image src={"/feature/outdoor.jpg"} fill alt='plaza sales' className='px-4 h-full w-full object-cover' />
			</div>
			<div className="md:block hidden">
				<ZoomParallax images={images} />
			</div>
		</main>
	);
}
