import { notFound } from "next/navigation";
import BrandSlider from "../_components/brand-slider";
import { Pricing } from "@/components/brands/pricing";
import PopularProducts from "../_components/popular-products";
import { fetchBrandBySlugServer } from "@/services/brandService";
import BrandAbout from "../_components/about";
import Title from "@/components/home/title";
import Certificate from "../_components/certificate";
import { TransitionLink } from "@/components/shared";

export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true; // Allow dynamic params

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  let brandData;
  try {
    const response = await fetchBrandBySlugServer(slug);
    brandData = response.brand;
  } catch (error) {
    console.error("Error fetching brand:", error);
    notFound();
  }

  const isSaaS = brandData.usp?.toLowerCase().includes('saas');
  return (
    <div className="min-h-screen ">

      <div className="relative  overflow-hidden flex items-center justify-center bg-gradient-to-b from-zinc-200 to-zinc-100">
        <BrandSlider options={{ loop: true }} slides={brandData.bannerUrls} />
      </div>
      <div className="w-full  max-w-[90%] mx-auto">
        <BrandAbout brand={brandData} />
      </div>


      <Certificate url={brandData?.certificate as string} />

      {/* Features/Benefits Section */}
      <section className="pb-8 md:py-12 lg:py-20 bg-muted/60 ">
        <div className=" mx-auto px-4 max-w-7xl">
          <div className="text-left md:text-left lg:text-center space-y-4 mb-6 md:mb-16">
            <Title title="Why Choose Deli?" wrapperClassName="mb-2 !mx-0  lg:!mx-auto" />
            <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl lg:mx-auto">
              Experience excellence with our comprehensive solutions and dedicated support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="size-8" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.75H6a2.25 2.25 0 0 0 0 4.5h12a2.25 2.25 0 0 0 0-4.5M8.25 4.5a3.75 3.75 0 1 0 7.5 0a3.75 3.75 0 0 0-7.5 0M12 11.25A8.23 8.23 0 0 1 5.944 8.6L9.75 18.75h4.5L18.056 8.6A8.23 8.23 0 0 1 12 11.25"></path></svg>,
                title: "Industry Leading",
                description: "Trusted by thousands of businesses worldwide for reliable solutions"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="size-8" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M17.684 3.603c.521-.659.03-1.603-.836-1.603h-6.716a1.06 1.06 0 0 0-.909.502l-5.082 8.456c-.401.666.103 1.497.908 1.497h3.429l-3.23 8.065c-.467 1.02.795 1.953 1.643 1.215L20 9.331h-6.849z"></path></svg>,
                title: "Fast & Efficient",
                description: "Optimized performance to keep your operations running smoothly"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width={256} height={256} className="size-8" strokeWidth={4} viewBox="0 0 256 256"><path fill="currentColor" d="M208 82h-34V56a46 46 0 0 0-92 0v26H48a14 14 0 0 0-14 14v112a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V96a14 14 0 0 0-14-14M94 56a34 34 0 0 1 68 0v26H94Zm116 152a2 2 0 0 1-2 2H48a2 2 0 0 1-2-2V96a2 2 0 0 1 2-2h160a2 2 0 0 1 2 2Zm-82-94a26 26 0 0 0-6 51.29V184a6 6 0 0 0 12 0v-18.71a26 26 0 0 0-6-51.29m0 40a14 14 0 1 1 14-14a14 14 0 0 1-14 14"></path></svg>,
                title: "Secure & Reliable",
                description: "Enterprise-grade security to protect your valuable data"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} className="size-8" viewBox="0 0 25 24"><path fill="currentColor" d="M9.063 18.045c-.046-1.131-.794-2.194-1.803-3.18a7.5 7.5 0 1 1 10.48 0c-1.041 1.017-1.805 2.117-1.805 3.29v1.595a2.25 2.25 0 0 1-2.25 2.25h-2.373a2.25 2.25 0 0 1-2.25-2.25zM6.5 9.5a5.98 5.98 0 0 0 1.808 4.293c.741.724 1.512 1.633 1.933 2.707h4.518c.421-1.074 1.192-1.984 1.933-2.707A6 6 0 1 0 6.5 9.5m4.063 8.713v1.537c0 .414.335.75.75.75h2.372a.75.75 0 0 0 .75-.75V18h-3.873v.017a4 4 0 0 1 0 .196M1.75 9.5a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m2.465-5.65a.75.75 0 1 0-.75 1.3l.866.5a.75.75 0 1 0 .75-1.3zM3.19 14.875a.75.75 0 0 1 .275-1.024l.866-.5a.75.75 0 0 1 .75 1.298l-.866.5a.75.75 0 0 1-1.025-.274M21.5 8.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5zm-1.855 4.875a.75.75 0 0 1 1.025-.274l.866.5a.75.75 0 1 1-.75 1.298l-.866-.5a.75.75 0 0 1-.275-1.024m.275-9.275a.75.75 0 0 0 .75 1.3l.866-.5a.75.75 0 1 0-.75-1.3z"></path></svg>,
                title: "Innovation Driven",
                description: "Cutting-edge technology to stay ahead of the competition"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width={256} height={256} className="size-8" viewBox="0 0 256 256"><path fill="currentColor" d="M252.51 108.8L227 57.75a14 14 0 0 0-18.78-6.27l-25.56 12.78l-53.13-14.06a6.1 6.1 0 0 0-3.06 0L73.34 64.26L47.79 51.48A14 14 0 0 0 29 57.75L3.49 108.8a14 14 0 0 0 6.26 18.78l27.15 13.58l55.61 39.72a6 6 0 0 0 2 .94l64 16a6 6 0 0 0 1.49.18a6 6 0 0 0 4.24-1.76l55.31-55.31l26.7-13.35a14 14 0 0 0 6.26-18.78m-53 35.16l-35.8-28.68a6 6 0 0 0-8 .45c-18.65 18.79-39.5 16.42-52.79 7.92a2 2 0 0 1-.94-1.5a1.9 1.9 0 0 1 .51-1.55L146.43 78h33.86l28.41 56.82Zm-185.4-28.27a2 2 0 0 1 .11-1.52l25.52-51.06a2 2 0 0 1 1.8-1.1a2 2 0 0 1 .89.21l22.21 11.1L37.32 128l-22.21-11.1a2 2 0 0 1-1-1.21m144.05 69.67l-59.6-14.9l-50.9-36.36l29.18-58.35L128 62.21l14.8 3.92a5.9 5.9 0 0 0-3 1.57l-45.7 44.35a14 14 0 0 0 2.39 21.72c20.22 12.92 44.75 10.49 63.8-5.89L191 152.5Zm83.73-69.67a2 2 0 0 1-1 1.16L218.68 128l-27.32-54.68l22.21-11.1a2 2 0 0 1 1.53-.11a2 2 0 0 1 1.16 1l25.52 51.06a2 2 0 0 1 .11 1.52m-112 101.76a6 6 0 0 1-7.27 4.37l-41.73-10.43a5.9 5.9 0 0 1-2-.94l-26.37-18.81a6 6 0 1 1 7-9.77L84.91 200l40.61 10.15a6 6 0 0 1 4.36 7.3Z"></path></svg>,
                title: "24/7 Support",
                description: "Dedicated team ready to assist you whenever you need help"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} className="size-8" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8}><path d="M.643.643v12.714h12.714"></path><path d="M4.581 3.854a1.776 1.776 0 1 1 0 3.552a1.776 1.776 0 0 1 0-3.552m7-2.968a1.776 1.776 0 1 1 0 3.551a1.776 1.776 0 0 1 0-3.551m-2.469 6.52a1.776 1.776 0 1 1 0 3.552a1.776 1.776 0 0 1 0-3.552M.643 9.424l2.534-2.706m2.953-.202L7.755 8.03m2.141-.452l1.171-3.219"></path></g></svg>,
                title: "Scalable Solutions",
                description: "Grow your business without worrying about technical limitations"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-4 md:p-8 rounded-lg md:rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {
        brandData?.popularProducts.length > 0 && (
          <section className="relative py-8 md:py-12 lg:py-20 ">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className=" mx-auto px-4 max-w-7xl">
              {isSaaS ? (
                <Pricing data={brandData} />
              ) : (
                brandData.popularProducts && brandData.popularProducts.length > 0 && (
                  <div className="space-y-6 md:space-y-12">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center lg:items-center gap-6">
                      <div className="space-y-3 text-left md:text-left lg:text-center lg:flex-1">
                        <Title title="Popular Products" wrapperClassName="!mx-0 lg:!mx-auto w-fit mb-2 " />
                        <p className="text-muted-foreground lg:text-lg max-w-2xl lg:mx-auto">
                          Discover our most sought-after solutions trusted by industry leaders
                        </p>
                      </div>
                    </div>

                    <PopularProducts products={brandData.popularProducts} />
                  </div>
                )
              )}
            </div>

            {brandData.popularProducts && brandData.popularProducts.length > 0 && (<div className="max-w-7xl mx-auto px-4  flex justify-end items-center mt-6">
              <TransitionLink
                href="/products"
                className="group inline-flex items-center gap-2 text-primary   hover:gap-3 transition-all duration-300"
              >
                View all products
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </TransitionLink>
            </div>)}
          </section>
        )

      }



      {/* CTA Section */}
      <section className="py-8 md:py-12 lg:py-20 bg-primary">
        <div className=" mx-auto px-4 max-w-5xl">
          <div className="relative  bg-gradient-to-r from-primary to-primary/80 sm:p-12 md:p-16 text-left md:text-left lg:text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />

            <div className="relative z-10 space-y-2">
              <h2 className="text-2xl lg:text-4xl font-bold text-primary-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/90 sm:text-lg md:text-xl max-w-3xl mx-auto">
                Join thousands of satisfied customers and transform your business today
              </p>
              <div className="flex mt-8  gap-4 sm:justify-center pt-4">
                <TransitionLink
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 text-xs sm:text-base sm:px-8 py-2   rounded-full bg-background text-primary hover:bg-background/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Contact Sales
                </TransitionLink>
                <TransitionLink
                  href="/products"
                  className="inline-flex items-center justify-center px-4 text-xs sm:text-base sm:px-8 py-2   rounded-full border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                >
                  Explore Products
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


