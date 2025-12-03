import Link from 'next/link'
import React from 'react'
import { TransitionLink } from '../shared'

export function CompanyStory() {
    return (
        <div className="py-10 sm:py-28 lg:mt-14 bg-muted/50 px-4">
            <p className='text-left sm:text-xl max-w-7xl mx-auto sm:text-center  leading-relaxed text-foreground'>
                Since 2014, <b className='text-primary font-semibold'>Plaza Sales Pvt. Ltd.</b> has been on an incredible journey – transforming how businesses across Nepal embrace technology! We&apos;re not just suppliers; we&apos;re innovators, problem-solvers, and tech enthusiasts who live and breathe IT solutions. Whether you&apos;re a startup with big dreams or an enterprise scaling new heights, we&apos;re here to fuel your growth with cutting-edge hardware, smart software, and rock-solid networking that drives real <>efficiency, security, and sustainable success</>. Teaming up with industry giants like <b className='text-primary font-semibold'>
                    <TransitionLink href={"/brand/unv"}>UNV</TransitionLink>, <TransitionLink href={"/brand/uniarch"}>Uniarch</TransitionLink>, <TransitionLink href={"/brand/ziasys"}>Ziasys</TransitionLink>, <TransitionLink href={"/brand/unv"}>Forward</TransitionLink>, and <TransitionLink href={"/brand/unv"}>Deli</TransitionLink></b>, our passionate crew crafts custom solutions that keep you ahead in this thrilling digital revolution!
            </p>
        </div>
    )
}
