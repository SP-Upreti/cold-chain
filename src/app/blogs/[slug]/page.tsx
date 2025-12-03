import { getBlogBySlug } from '@/services/blogService';
import Image from 'next/image'
import React from 'react'
import "@/styles/ckeditor-custom.css"
import Link from 'next/link';
import { Icon } from '@iconify/react';
import BlogCard from '@/components/ui/blogs-card';
import { TransitionLink } from '@/components/shared';


export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const blogDetails = await getBlogBySlug(slug);
    return (
        <div className='pb-20'>
            <div className="relative p-4 !pb-10">
                <div className="max-w-7xl text-xl  mx-auto ">
                    <div
                        className="  rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                        <div className="">

                            <div className="w-full h-[40vh] md:h-[55vh] mb-4 rounded-sm overflow-hidden border  relative">
                                <Image src={blogDetails?.blog?.coverImage || ''} alt="Blog Image" fill className="object-cover " />
                            </div>

                            <h1 className="text-gray-900 font-bold text-xl md:text-3xl">{blogDetails?.blog?.title}</h1>
                            <div className="py-5 mb-5 border-b  font-regular text-gray-900 flex flex-wrap gap-4 lg:gap-8">
                                <span className="mr-3 flex gap-2 flex-row items-center">
                                    <svg className="text-primary size-5" fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <g>
                                        <g>
                                            <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
                                                    c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
                                                    c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="ml-1">Reading  Time {blogDetails?.blog?.estimatedReadTime} min</span>
                                </span>

                                {
                                    blogDetails?.blog?.author && (
                                        <TransitionLink href="#" className="flex flex-row items-center hover:text-primary  mr-3">
                                    <Icon icon="solar:pen-2-bold" className="text-primary size-5" />

                                    <span className="ml-1">{blogDetails?.blog?.author?.firstname} {blogDetails?.blog?.author?.lastname}</span>
                                        </TransitionLink>
                                    )
                                }

                            </div>
                            <div className=" lg:text-2xl" dangerouslySetInnerHTML={{ __html: blogDetails?.blog?.excerpt }}></div>

                            <div className="ckeditor-content-display px-0 mx-0 !text-sm" dangerouslySetInnerHTML={{ __html: blogDetails?.blog?.description }}></div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {blogDetails?.blog?.mediaAssets?.map((media) => (
                                    <div key={media.id} className="w-full aspect-video border bg-zinc-100 relative">
                                        {media.type.toLowerCase() === 'image' ? (
                                            <Image
                                                src={media.fileUrl}
                                                alt="Blog Media"
                                                fill
                                                className="object-contain rounded-sm"
                                            />
                                        ) : (
                                            <video controls className="w-full h-full rounded-sm object-cover">
                                                <source src={media.fileUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 lg:p-0">
                <h2 className='col-span-3 text-xl md:text-3xl font-semibold'>Similar Blogs</h2>
                {blogDetails.similarBlogs.map((blog) => (
                    <TransitionLink href={`/blogs/${blog.slug}`} key={blog.id} className='col-span-3  md:col-span-1' >
                        <BlogCard className='!p-0' data={blog} />
                    </TransitionLink>
                ))}
                <div className="col-span-3 flex justify-end items-center">
                    <TransitionLink href="/blogs">
                        <button className='mt-4  flex gap-4 items-center px-8 py-4 text-zinc-800 hover:text-primary text-lg w-fit'>View All Blogs <Icon icon="akar-icons:chevron-right" /></button>
                    </TransitionLink>
                </div>
            </div>
        </div>
    )
}
