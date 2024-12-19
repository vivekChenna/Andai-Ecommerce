"use client";

import { Carousel } from "@/components/carousel";
import { GridTileImage } from "@/components/grid/tile";
// import type { Metadata } from 'next';
// import { notFound } from 'next/navigation';

// import { GridTileImage } from "@/components/grid/tile";
import Footer from "@/components/layout/footer";
import { Gallery } from "@/components/product/gallery";
// import { Gallery } from 'components/product/gallery';
import { ProductDescription } from "@/components/product/product-description";
import {
  GET_FILTERED_PLUGINS,
  GET_SINGLE_PLUGIN_INFORMATION,
} from "@/lib/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
// import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
// import { getProduct, getProductRecommendations } from 'lib/shopify';
// import { Image } from 'lib/shopify/types';
// import Link from "next/link";
import { Suspense } from "react";

export default function ProductPage({ params }) {
  //   const product = await getProduct(params.handle);

  //   if (!product) return notFound();

  //   const productJsonLd = {
  //     '@context': 'https://schema.org',
  //     '@type': 'Product',
  //     name: product.title,
  //     description: product.description,
  //     image: product.featuredImage.url,
  //     offers: {
  //       '@type': 'AggregateOffer',
  //       availability: product.availableForSale
  //         ? 'https://schema.org/InStock'
  //         : 'https://schema.org/OutOfStock',
  //       priceCurrency: product.priceRange.minVariantPrice.currencyCode,
  //       highPrice: product.priceRange.maxVariantPrice.amount,
  //       lowPrice: product.priceRange.minVariantPrice.amount
  //     }
  //   };

  const { data, error, loading } = useQuery(GET_SINGLE_PLUGIN_INFORMATION, {
    variables: {
      where: {
        id: { _eq: params.handle },
      },
    },
  });

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 text-black  bg-[#FFF8E3]">
        <div className="flex flex-col rounded-lg border  border-neutral-300 p-8 md:p-12 lg:flex-row lg:gap-8 bg-[#FFF8E3]">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                image={data?.plugins[0]?.img_url || `/svg/product.svg`}
                isLoading={loading}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription
              product={data?.plugins[0]}
              isLoading={loading}
            />
          </div>
        </div>
        {/* <RelatedProducts
          id={data?.plugins[0]?.category_id}
          filterId={data?.plugins[0]?.id}
        /> */}
        <div className=" mt-[18px]">
          <Carousel />
        </div>
      </div>
      <Footer />
    </>
  );
}

function RelatedProducts({ id, filterId }) {
  const { error, data, loading } = useQuery(GET_FILTERED_PLUGINS, {
    variables: {
      where: {
        category_id: { _eq: id },
      },
    },
    skip: !id,
  });

  const plugins = data?.plugins?.filter((plugin) => {
    return plugin.id !== filterId;
  });

  if (loading) {
    return <div className=" w-full text-center text-black">Loading...</div>;
  }

  return plugins?.length > 0 ? (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Plugins</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {plugins?.map((product) => (
          <li
            key={product?.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product?.id}`}
            >
              <GridTileImage
                alt={product?.title}
                label={{
                  title: product?.title,
                  amount: product?.amount,
                  currencyCode: product?.currencyCode,
                }}
                src={product?.img_url || "/svg/product.svg"}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
