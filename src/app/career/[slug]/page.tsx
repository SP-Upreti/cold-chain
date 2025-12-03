"use client";

import React, { useState, useEffect } from "react";
import {
    Briefcase,
    MapPin,
    Users,
    Building2,
    DollarSign,
    Share2,
    Bookmark,
    BookmarkCheck,
    ArrowLeft,
    Calendar,
} from "lucide-react";
import Link from "next/link";
import { getCareerById } from "@/services/careerService";
import { ICareerDetail } from "@/types/ICareer";
import { TransitionLink } from "@/components/shared";


const jobTypeMap: Record<string, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
};

export default function JobDetailPage({ params }: { params: { slug: string } }) {
    const [job, setJob] = useState<ICareerDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                setLoading(true);
                const response = await getCareerById(params.slug);
                setJob(response?.career);

                // Check if job is already saved
                const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
                const isJobSaved = savedJobs.some((savedJob: { id: string }) => savedJob.id === response.career.id);
                setIsSaved(isJobSaved);
            } catch (err) {
                console.error("Failed to fetch career:", err);
                setError("Failed to load job details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCareer();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || "Job not found"}</p>
                    <TransitionLink href="/career" className="text-primary hover:underline">
                        Back to careers
                    </TransitionLink>
                </div>
            </div>
        );
    }

    const handleShare = async () => {
        const shareData = {
            title: job.title,
            text: `Check out this job opportunity: ${job.title} at Plaze Electronics`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleSaveJob = () => {
        try {
            const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');

            if (isSaved) {
                // Remove from saved jobs
                const updatedJobs = savedJobs.filter((savedJob: { id: string }) => savedJob.id !== job.id);
                localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
                setIsSaved(false);
            } else {
                // Add to saved jobs
                const jobToSave = {
                    id: job.id,
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    jobType: job.jobType,
                    salaryRange: job.salaryRange,
                    url: window.location.href,
                    savedAt: new Date().toISOString(),
                };
                savedJobs.push(jobToSave);
                localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
                setIsSaved(true);
            }
        } catch (error) {
            console.error('Error saving job:', error);
            alert('Failed to save job. Please try again.');
        }
    };



    return (
        <div className="min-h-screen ">
            {/* Back Button */}
            <div className="bg-white border-b">
                <div className="max-w-7xl  mx-auto px-4 xl:px-0 py-2  md:py-3">
                    <TransitionLink
                        href="/career"
                        className="inline-flex items-center gap-2 text-xs sm:text-base text-gray-600 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Back to all jobs</span>
                    </TransitionLink>
                </div>
            </div>


            <div className="max-w-7xl mx-auto  px-4 xl:px-0 xl py-6 sm:py-8">
                <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 lg:gap-8">

                    <div className="lg:col-span-2  md:border sm:py-8 bg-white space-y-6 sm:space-y-8 rounded-md md:border-sm">
                        {/* Job Header */}
                        <div className=" sm:px-6 md:px-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-full">
                                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                                        {job.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                            <span className="font-medium">Plaze Electronics</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                                            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {jobTypeMap[job.jobType] || job.jobType}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-green-50 text-green-700 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                                            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {job.salaryRange}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className=" sm:px-6 md:px-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About the role</h2>
                            <div
                                className="text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose-base max-w-none"
                                dangerouslySetInnerHTML={{ __html: job.description.overview }}
                            />
                        </div>

                        {/* Requirements */}
                        <div className="bg-white  sm:px-6 md:px-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                Requirements
                            </h2>
                            <div className="flex flex-col gap-1">
                                {job?.description?.responsibilities?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-500"></div>
                                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 ">
                        <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-6">

                            <div className="bg-white rounded-lg md:border border-gray-100 sm:p-6 ">
                                <TransitionLink href={`/career/${job.id}/apply`}>
                                    <button className="w-full bg-primary text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-primary/90 border border-primary transition-all">
                                        Apply Now
                                    </button>
                                </TransitionLink>
                                <button
                                    onClick={handleShare}
                                    className="w-full mt-3 border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Share</span>
                                </button>
                            </div>

                            {/* Company Info */}
                            <div className="bg-white rounded-lg  sm:p-6  sm:border border-gray-100">
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">About Plaze Electronics</h3>
                                <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                                    <div className="flex items-center gap-2.5 sm:gap-3">
                                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                        <span>Technology & Electronics</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 sm:gap-3">
                                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                        <span>50+ employees</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 sm:gap-3">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                        <span>Addis Ababa, Ethiopia</span>
                                    </div>
                                </div>
                                <p className="mt-3 sm:mt-4 text-gray-700 text-xs sm:text-sm leading-relaxed">
                                    Leading provider of security systems, networking solutions, and
                                    technology products in Ethiopia.
                                </p>
                                <TransitionLink
                                    href="/about"
                                    className="inline-block mt-3 sm:mt-4 text-primary font-semibold text-xs sm:text-sm hover:underline"
                                >
                                    Learn more about us →
                                </TransitionLink>
                            </div>

                            {/* Job Details */}
                            <div className="bg-white rounded-lg  sm:p-6 sm:border-sm sm:border border-gray-100">
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Job Details</h3>
                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Department</p>
                                        <p className="text-sm sm:text-base  text-gray-900">{job.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Employment Type</p>
                                        <p className="text-sm sm:text-base  text-gray-900">{jobTypeMap[job.jobType] || job.jobType}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Salary Range</p>
                                        <p className="text-sm sm:text-base  text-gray-900">{job.salaryRange}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Location</p>
                                        <p className="text-sm sm:text-base  text-gray-900">{job.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
