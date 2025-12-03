"use client"

import React from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Icon } from "@iconify/react";
import { IFAQ } from '@/types/IFAQ';
import { TransitionLink } from '@/components/shared';

interface FAQListProps {
    faqs: IFAQ[];
}

export default function FAQList({ faqs }: FAQListProps) {
    return (
        <section className='py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-950'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
                {/* Header */}
                <div className="md:text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                    <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 rounded-full bg-primary/10 border border-primary/20">
                        <Icon icon="mdi:frequently-asked-questions" className="text-primary mr-2" width="18" height="18" />
                        <span className="text-xs sm:text-sm font-medium text-primary">FAQ</span>
                    </div>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent md:px-4'>
                        Our Most Asked Questions
                    </h1>
                    <div className='mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-gray-400 md:px-4'>
                        <p className='max-w-2xl mx-auto'>
                            Can&apos;t find the answer you&apos;re looking for? Feel free to{" "}
                            <TransitionLink
                                className='text-primary font-semibold whitespace-nowrap hover:underline underline-offset-4 transition-all inline-flex items-center gap-1'
                                href='/contact'>
                                contact us
                                <Icon icon="lucide:arrow-right" width="14" height="14" className='sm:w-4 sm:h-4' />
                            </TransitionLink>

                        </p>
                    </div>
                </div>

                {/* FAQ List */}
                <div className='space-y-8 sm:space-y-6 md:space-y-5 lg:space-y-6'>
                    {faqs.length > 0 ? (
                        faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="group relative bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl md:border border-zinc-200 dark:border-zinc-800  md:p-6 lg:p-8 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 overflow-hidden"
                            >
                                <div className="pr-0 sm:pr-8 md:pr-12 lg:pr-14">
                                    <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-3 md:gap-4 lg:gap-8 mb-3 sm:mb-4">
                                        <div className="flex-shrink-0 hidden md:flex items-center text-primary/50 justify-center size-10 sm:size-11 md:size-12 rounded-full font-bold border text-xs sm:text-sm group-hover:border-primary group-hover:text-primary border-primary/30 transition-all duration-300">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-primary transition-colors duration-300 leading-snug sm:leading-tight pt-1 sm:pt-1.5">
                                            {faq.title}
                                        </h4>
                                    </div>

                                    <div className='  md:pl-16 lg:pl-20'>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: faq.description.content }}
                                            className='text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed prose prose-sm sm:prose-base md:prose-lg max-w-none prose-p:mb-2 prose-ul:ml-4 prose-li:marker:text-primary prose-headings:text-zinc-800 dark:prose-headings:text-zinc-100'
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                            <div className="text-center py-12 sm:py-16 md:py-20 px-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4 sm:mb-6">
                                    <Icon icon="tabler:help-off" width="32" height="32" className="sm:w-12 sm:h-12 text-zinc-400 dark:text-zinc-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                                    No FAQs Available
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-4 sm:mb-6 max-w-md mx-auto">
                                    We&apos;re working on adding frequently asked questions.
                                </p>
                                <TransitionLink href="/contact">
                                    <Button className="rounded-full text-sm sm:text-base">
                                        <Icon icon="lucide:message-circle" width="16" height="16" className="mr-2 sm:w-[18px] sm:h-[18px]" />
                                        Ask a Question
                                    </Button>
                                </TransitionLink>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
