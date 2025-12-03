import { TransitionLink } from '@/components/shared';
import BlogCard from '@/components/ui/blogs-card'
import { getAllBlogs } from '@/services/blogService';

export const metadata = {
    title: 'Blogs - Plaze Electronics',
    description: 'Explore expert blogs on cutting-edge gadgets, home appliances, and emerging tech. Learn how modern electronics redefine comfort, productivity, and entertainment in your daily life.',
    keywords: ['Blogs', 'Tech Blogs', 'Gadgets', 'Home Appliances', 'Electronics Reviews', 'Tech News', 'Plaze Electronics Blogs', 'Smart Home', 'Innovative Technology'],
}

export default async function BlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className=" pb-16 px-4">
            <div className=' space-y-6  max-w-7xl  mx-auto w-full'>
                <div className="pt-10 md:py-14   md:text-center  md:pb-8">
                    <h2 className='text-xl md:text-3xl  font-semibold'>Our Pupular Blogs </h2>
                    <p className='text-sm md:text-lg mx-auto max-w-5xl mt-2'>Explore expert blogs on cutting-edge gadgets, home appliances, and emerging tech.</p>
                </div>
                <div className="">

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4 ">
                        {blogs?.data?.blogs?.map((blog, idx) => (
                            <TransitionLink key={idx} href={`/blogs/${blog?.slug || blog?.id}`}>
                                <BlogCard data={blog} />
                            </TransitionLink>
                        ))}
                    </div>
                </div>
            </div >
        </div>
    )
}
