import { Suspense } from "react";

import { getProductBySlugServer } from "@/services/productService";
import { Metadata } from "next";
import ProductDetailsSkeleton from "@/app/products/_components/product-details-skeleton";
import DetailsMain from "@/app/products/_components/details-main";

export async function generateMetadata({ params }: { params: Promise<{ brand: string; category: string; subcategory: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await getProductBySlugServer(slug);
    const { product } = data;
    const seo = product.seoMetadata;

    return {
      title: seo?.title || product.metaTitle || product.name,
      description: seo?.description || product.metadescription || product.shortDescription,
      keywords: seo?.keywords || product.metatag || [],
      openGraph: {
        title: seo?.openGraph?.title || product.name,
        description: seo?.openGraph?.description || product.shortDescription,
        // type: (seo?.openGraph?.type as 'website' | 'article') || 'website',
        url: seo?.openGraph?.url || seo?.canonicalUrl,
        siteName: seo?.openGraph?.siteName,
        locale: seo?.openGraph?.locale || 'en_US',
        images: seo?.openGraph?.images?.map(img => img.url) || [product.coverImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.twitter?.title || product.name,
        description: seo?.twitter?.description || product.shortDescription,
        images: seo?.twitter?.images || [product.coverImage],
      },
      robots: {
        index: seo?.robots?.index ?? true,
        follow: seo?.robots?.follow ?? true,
        'max-snippet': seo?.robots?.maxSnippet,
        'max-image-preview': "large",
        'max-video-preview': seo?.robots?.maxVideoPreview,
      },
      alternates: {
        canonical: seo?.canonicalUrl,
        languages: seo?.alternates?.languages,
      },
      other: {
        'theme-color': seo?.extraMeta?.themeColor,
        'category': seo?.extraMeta?.category,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product',
      description: 'Product details',
    };
  }
}

export default async function Page({ params }: { params: Promise<{ brand: string; category: string; subcategory: string; slug: string }> }) {
  const { slug } = await params;

  // Fetch product data on server
  const productData = await getProductBySlugServer(slug);
  const { product } = productData;
  const jsonLd = product.seoMetadata?.jsonLd;

  return (
    <main className="min-h-screen bg-background">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <DetailsMain slug={slug} initialData={productData} />
      </Suspense>
    </main>
  );
}
