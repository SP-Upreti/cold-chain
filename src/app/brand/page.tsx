import { fetchBrandsServer } from "@/services/brandService";
import BrandCard from "@/components/ui/brand-card";
import { TransitionLink } from "@/components/shared";
import Title from "@/components/home/title";
import { IBrand } from "@/types/IBrand";

export const metadata = {
  title: "Our Brands | Plaza Sales",
  description: "Explore our trusted brands and authorized partnerships",
};

export const revalidate = 3600; // Revalidate every hour

export default async function BrandsPage() {
  let brands: IBrand[] = [];

  try {
    const response = await fetchBrandsServer();
    brands = response?.data?.brands || [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    // Return empty array on error, page will show "No brands available"
  }

  return (
    <main className="py-8 md:py-12 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-left md:text-center mb-6 md:mb-12">
          <Title title="Our Brands" />
          <p className="md:text-lg mt-1 md:mt-3 text-muted-foreground">
            Discover our trusted partners and authorized brands
          </p>
        </div>

        {brands.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <p className="text-muted-foreground text-lg">No brands available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4 lg:gap-6">
            {brands.map((brand) => (
              <TransitionLink key={brand.id} href={`/brand/${brand.slug}`}>
                <BrandCard data={brand} />
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}