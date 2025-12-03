import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerStagger,
} from "@/components/about/hero-video"
import { Button } from "@/components/ui/button"
import { TransitionLink } from "../shared"

const AboutHero = () => {
  return (
    <ContainerScroll className="text-center py-8  md:py-20 h-auto md:h-[210vh]">

      <h1 className="text-2xl md:text-3xl lg:text-4xl  font-semibold">
        Innovating Today,  <br /> Empowering Tomorrow
      </h1>

      <p className="text-sm md:text-base  max-w-5xl mx-auto p-2 rounded-full text-zinc-800 md:mt-6 font-medium px-4">
        We&apos;re not just a tech company – we&apos;re your partners in digital transformation. From cutting-edge CCTV solutions to complete IT infrastructure, we bring passion, expertise, and innovation to every project we touch.
      </p>
      <div className="flex gap-4 justify-center items-center flex-wrap mt-8">
        <TransitionLink href="/products">
          <Button
          variant={"outline"}
          className="rounded-full border !py-2 px-4 text-xs md:text-base md:py-5 bg-primary text-white hover:bg-transparent hover:text-primary"
          size="lg"
        >
          Browse Products
        </Button>
        </TransitionLink>
        <TransitionLink href="/contact">
          
          <Button
          variant={"outline"}
          className="rounded-full !py-2 md:py-5 px-4 text-xs md:text-base border-primary text-primary hover:bg-primary hover:text-white"
          size="lg"
        >
          Make Inquiry
        </Button>
        </TransitionLink>
      </div>

      <div className="lg:hidden  rounded-xl overflow-hidden mt-6 px-4">
        <video
          width="100%"
          height="100%"
          loop
          playsInline
          autoPlay
          muted
          className="relative z-10 block h-auto max-h-full max-w-full rounded-lg object-contain align-middle"
        >
          <source
            src="https://videos.pexels.com/video-files/8084758/8084758-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <ContainerInset className="mt-8 md:mt-0 hidden lg:block">
        <video
          width="100%"
          height="100%"
          loop
          playsInline
          autoPlay
          muted
          className="relative z-10 block h-auto max-h-full max-w-full object-contain align-middle"
        >
          <source
            src="https://videos.pexels.com/video-files/8084758/8084758-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </ContainerInset>
    </ContainerScroll>
  )
}



export { AboutHero }