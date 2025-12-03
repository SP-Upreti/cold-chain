"use client";
import React from 'react'
import ImagePreviews from './image-previews'
import Specifications from './specifications'
import Summary from './product-simmary'
import RelatedProducts from './related-product'
import { IProductBySlugResponse } from '@/types/IProductBySlug';
import Videos from './videos';
import ShortDescription from './short-details';
import Downloads from './downloads';
import CustomBreadcrumb from '@/components/ui/custom-breadcum';
import DetailsImage from './details-image';
import { useParams } from 'next/navigation';

export default function DetailsMain({ slug, initialData }: { slug: string; initialData: IProductBySlugResponse }) {
    const product = initialData;
    const params = useParams();

    const paths = [
        { name: "Home", href: "/" },
        { name: String(params?.brand || 'Brand'), href: "/products" },
        { name: String(params?.category || 'Category'), href: "/products" },
        { name: String(params?.subcategory || 'Subcategory'), href: "/products" },
        { name: product?.product?.name || "Product", href: `/products/${slug}` }
    ]

    // Transform similarProducts to match IAllProduct interface
    const similarProductsTransformed = product?.similarProducts?.map(p => ({
        id: p.id,
        ispopular: p.isPopular,
        coverimage: p.coverImage || '',
        title: p.name,
        slug: p.slug,
        price: p.price,
        sortOrder: p.sortOrder,
        brandName: p.brand.name,
        brandId: p.brand.id,
        model: p.model || '',
        coverImage: p.coverImage || '',
        brand: {
            id: p.brand.id,
            name: p.brand.name,
            slug: p.brand.name.toLowerCase().replace(/\s+/g, '-')
        },
        category: {
            id: p.subcategory?.id || '',
            name: p.subcategory?.title || 'Category',
            slug: p.subcategory?.slug || 'category',
            title: p.subcategory?.title || 'Category'
        },
        subcategory: {
            id: p.subcategory?.id || '',
            name: p.subcategory?.title || 'Subcategory',
            slug: p.subcategory?.slug || 'subcategory',
            title: p.subcategory?.title || 'Subcategory'
        }
    })) || [];

    return (
        <section className="max-w-7xl px-4 xl:px-0 mx-auto mb-16 animate-in fade-in duration-300">
            <div className="mb-6 mt-4">
                <CustomBreadcrumb paths={paths} className='bg-transparent' />
            </div>
            <ImagePreviews slides={product?.product.gallery || []} defaultImage={product?.product?.coverImage as string} />
            <div className="mt-8 space-y-16">
                <ShortDescription product={product?.product} />
                <hr className='my-6' />
                <Summary summary={product?.product?.description || ""} />
                <Downloads downloads={product?.product?.downloads || []} categories={product?.product?.downloadCategories?.[0]} />
                <Specifications speficication={product?.product?.feature as string} productType={product?.product?.productType} />
                <DetailsImage images={product?.product?.detailImage} />
                <Videos productName={product?.product?.name || ""} videos={product?.product?.videos || []} />
                <RelatedProducts similarProduct={similarProductsTransformed} />
            </div>
        </section>
    )
}
