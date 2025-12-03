import React from 'react'
import Image from 'next/image'
import Title from '../home/title'

export function MDMessage() {
    return (
        <div className="py-10 md:py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <Title title='From Our Leadership' />
                <p className='md:text-xl  md:text-center mt-2'>What Our Leader has to say about lorem ispum dollar sir</p>

                <div className="grid md:grid-cols-2 mt-6 md:mt-16 gap-8 items-center">
                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                            src="/bod/md.png"
                            alt="Managing Director"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="pt-4 border-t md:hidden border-border">
                        <p className="font-bold md:text-xl text-primary">Mr. Binam P. Mul</p>
                        <p className="text-muted-foreground text-sm md:text-base">Managing Director</p>
                        <p className="text-sm text-muted-foreground">Plaza Sales Pvt. Ltd.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="text-sm md:text-lg leading-relaxed text-foreground space-y-4">
                            <p className='font-semibold text-primary'>
                                Dear Valued Partners and Clients,
                            </p>
                            <p>
                                It is with great pride and enthusiasm that I welcome you to Plaza Sales Pvt. Ltd.
                                Since our inception in 2014, we have been committed to delivering excellence in IT
                                solutions and empowering businesses across Nepal with cutting-edge technology.
                                Our journey has been marked by continuous innovation, unwavering dedication to customer
                                satisfaction, and strategic partnerships with industry leaders.
                            </p>
                            <p>
                                As we look to the future, our commitment remains steadfast: to be your trusted partner
                                in navigating the digital landscape.
                            </p>
                            <p className="font-semibold">
                                Thank you for your continued trust and support.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-border hidden md:block">
                            <p className="font-bold md:text-xl text-primary">Mr. Binam P. Mul</p>
                            <p className="text-muted-foreground text-sm md:text-base">Managing Director</p>
                            <p className="text-sm text-muted-foreground">Plaza Sales Pvt. Ltd.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
