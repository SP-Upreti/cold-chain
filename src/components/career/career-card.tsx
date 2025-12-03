import React from 'react';
import { ICareer } from '@/types/ICareer';
import { Briefcase, MapPin, Clock, ArrowRight, DollarSign, Sparkles } from 'lucide-react';
import { TransitionLink } from '@/components/shared';
import { Icon } from '@iconify/react';

interface CareerCardProps {
    career: ICareer;
}

const CareerCard: React.FC<CareerCardProps> = ({ career }) => {
    return (
        <TransitionLink
            href={`/career/${career.id}`}
            className="group relative w-full"
        >
            <div className="flex gap-4 hover:shadow-lg hover:bg-[#9FE574] transition-all duration-300 p-6 bg-card rounded-2xl">
                <div>
                    <h2 className="text-sm font-semibold text-lg underline">Cold Chains Pvt. Lts</h2>
                    <h3 className="text-lg font-bold my-2  transition-colors duration-300 line-clamp-2 leading-tight">
                        UI /UX Designer | Product Designer
                    </h3>

                    <div className=" gap-y-2 gap-x-4 mt-4 text-sm text-muted-foreground group-hover:text-[#1A4D2E]">
                        <div className="flex items-center gap-1.5">
                            <Icon icon={"fluent:location-28-regular"} className="size-5" />
                            <span>{career.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-5">
                            {["Full Time", "Senior Level", "Remote"].map((item) => (
                                <span key={item} className="px-2 py-1 text-xs font-medium rounded-xs bg-muted group-hover:bg-[#1A4D2E] group-hover:text-white transition-colors duration-300">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </TransitionLink>
    );
};

export default CareerCard;
