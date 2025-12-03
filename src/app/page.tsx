import Zoom from "@/components/home/zoom";
import About from "@/components/home/about";
import Blogs from "@/components/home/blogs";
import ProductCategory from "@/components/home/product-category";
import PlazaHero from "@/components/home/scroll-hero";
import OurBrands from "@/components/home/our-brands";
import ActivityAreas from "@/components/home/activity-areas";
import ProjectPortfolio from "@/components/home/project-portfolio";
import Testimonial from "@/components/home/testimonial";

export default function Home() {
  return (
    <main className="font-sans max-w-screen  ">
      <PlazaHero />
      <About />
      <ActivityAreas />
      <OurBrands />
      <ProjectPortfolio />
      {/* <ProductCategory /> */}
      {/* <Testimonial /> */}
      <Blogs />
    </main>
  );
}