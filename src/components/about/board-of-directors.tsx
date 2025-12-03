import React from 'react'
import Image from 'next/image'
import Title from '../home/title'
import { getAllTeamMembersServer, TeamMember } from '@/services/teamService'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'

export async function BoardOfDirectors() {
    let members: TeamMember[] = []
    
    try {
        const response = await getAllTeamMembersServer({ limit: 100 })
        members = response.data.members
    } catch (error) {
        console.error('Error fetching team members:', error)
    }

    return (
        <div className="py-12 md:py-28 px-4 md:px-8 bg-muted/80">
            <div className="max-w-7xl mx-auto">
                <Title title='Board of Directors' wrapperClassName="!mb-1" />
                <p className="md:text-center text-sm md:text-base text-muted-foreground mb-6 md:mb-12 max-w-2xl mx-auto">
                    Meet the visionary leaders steering Plaza Sales towards excellence and innovation
                </p>

                {members.length === 0 ? (
                    <p className="text-center text-muted-foreground">No team members found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="md:bg-background md:p-4 rounded-xl overflow-hidden hover:shadow-sm transition-shadow duration-300"
                            >
                                <div className="relative h-64 lg:h-72 rounded-xl overflow-hidden bg-[#DF4225] w-full">
                                    <Image
                                        src={member.image}
                                        alt={member.fullname}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="space-y-1  mt-4">
                                    <h3 className="text-xl font-bold text-foreground">
                                        {member.fullname}
                                    </h3>
                                    <p className="text-primary font-semibold text-sm">
                                        {member.designation}
                                    </p>
                                    
                                   
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
