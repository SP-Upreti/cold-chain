import React from 'react'
import BentoCards from '@/components/about/bento-card'
import InteractiveSelector from '@/components/about/gallery'
import { AboutHero } from '@/components/about/hero'
import { CompanyStory } from '@/components/about/company-story'
import { MDMessage } from '@/components/about/md-message'
import { BoardOfDirectors } from '@/components/about/board-of-directors'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import BackButton from '../../components/ui/back-button'

export const metadata = {
    title: 'About - Plaza Sales',
    description: 'Discover the story behind Plaza Sales Pvt. Ltd. – Nepal\'s most dynamic IT solutions provider since 2014! We\'re passionate innovators committed to empowering businesses with cutting-edge technology, exceptional service, and solutions that truly make a difference.',
    keywords: ['About Us', 'Plaza Sales', 'Company Information', 'Our Mission', 'Our Vision', 'Customer Service', 'Electronics Retailer', 'IT Solutions Nepal'],
}


export default function AboutPage() {
    return (
        <div className="w-full  mx-auto space-y-6 lg:space-y-12 py-20">

            <BackButton text="About" />

            <div className="space-y-0">
                <AboutHero />
                <CompanyStory />
            </div>
            <MDMessage />
            <BoardOfDirectors />
            <BentoCards />
            <InteractiveSelector />
        </div>
    )
}
