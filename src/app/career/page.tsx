import React from "react";
import { Briefcase, MapPin, Clock, Users, ArrowRight, Building2 } from "lucide-react";
import CareerCard from "@/components/career/career-card";
import { getAllCareers } from "@/services/careerService";
import { ICareer } from "@/types/ICareer";
import Image from "next/image";

export const metadata = {
    title: 'Career -  Cold Chain',
    description: 'Join our team at Cold Chain and explore exciting career opportunities in the tech industry.',
    keywords: ['Career', 'Jobs', 'Opportunities', 'Tech Jobs', 'Join Our Team', 'Cold Chain Careers'],
}

const jobTypeMap: Record<string, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
};

export default async function Career() {
    const jobOpenings: ICareer[] = [
        {
            "id": "d0d22375-4328-46e7-95b2-04beea0a6869",
            "title": "Senior Software Engineer",
            "slug": "senior-software-engineer",
            "location": "New York, NY",
            "jobType": "FULL_TIME",
            "salaryRange": "$120,000 – $150,000"
        },
        {
            "id": "d0d22375-4328-46e7-95b2-04beea0a6869",
            "title": "Senior Software Engineer",
            "slug": "senior-software-engineer",
            "location": "New York, NY",
            "jobType": "FULL_TIME",
            "salaryRange": "$120,000 – $150,000"
        },
        {
            "id": "d0d22375-4328-46e7-95b2-04beea0a6869",
            "title": "Senior Software Engineer",
            "slug": "senior-software-engineer",
            "location": "New York, NY",
            "jobType": "FULL_TIME",
            "salaryRange": "$120,000 – $150,000"
        },
        {
            "id": "d0d22375-4328-46e7-95b2-04beea0a6869",
            "title": "Senior Software Engineer",
            "slug": "senior-software-engineer",
            "location": "New York, NY",
            "jobType": "FULL_TIME",
            "salaryRange": "$120,000 – $150,000"
        },
        {
            "id": "d0d22375-4328-46e7-95b2-04beea0a6869",
            "title": "Senior Software Engineer",
            "slug": "senior-software-engineer",
            "location": "New York, NY",
            "jobType": "FULL_TIME",
            "salaryRange": "$120,000 – $150,000"
        },
        {
            "id": "d0d22375-4328-46e7-95b2-04beea0a6869",
            "title": "Senior Software Engineer",
            "slug": "senior-software-engineer",
            "location": "New York, NY",
            "jobType": "FULL_TIME",
            "salaryRange": "$120,000 – $150,000"
        },

    ]
    return (
        <div className="min-h-screen bg-muted/60  dark:from-gray-950 dark:to-gray-900">

            <div className="flex  gap-16 items-center min-h-screen max-w-7xl mx-auto ">
                <div className="space-y-5 w-full max-w-[60%]">
                    <h3 className="text-xl font-bold">Join our team</h3>
                    <h1 className="lg:text-4xl text-2xl font-bold">Build your career while building a sustainable future</h1>
                    <p className="lg:text-xl text-lg mt-8">Join passionate professionals transforming laboratory sustainability. Work remotely with flexible schedules, generous benefits, and meaningful impact.</p>
                </div>
                <div className="w-[30%] aspect-square bg-primary rounded-full overflow-hidden relative">
                    <Image src="/career/home.jpg" alt="career" fill className="object-cover" />
                </div>
            </div>



            <div className="bg-muted! py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 xl:px-0">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold lg:text-4xl mb-6">Career at Cold Chain®</h2>
                        <p className="text-lg text-muted-foreground">
                            Join passionate professionals transforming laboratory sustainability. Work remotely with flexible schedules, generous benefits, and meaningful impact.
                        </p>
                    </div>

                    {jobOpenings.length > 0 ? (
                        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {jobOpenings.map((career) => (
                                <CareerCard key={career.id} career={career} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Openings Currently</h3>
                            <p className="text-muted-foreground">Check back later for new opportunities.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
