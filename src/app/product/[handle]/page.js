"use client";

import { Carousel } from "@/components/carousel";
import { GridTileImage } from "@/components/grid/tile";

// import { GridTileImage } from "@/components/grid/tile";
import Footer from "@/components/layout/footer";
import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import {
  GET_FILTERED_PLUGINS,
  GET_SINGLE_PLUGIN_INFORMATION,
} from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useTheme } from "next-themes";
import Link from "next/link";
// import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
// import { getProduct, getProductRecommendations } from 'lib/shopify';
// import { Image } from 'lib/shopify/types';
// import Link from "next/link";
import { Suspense } from "react";

export default function ProductPage({ params }) {

  const {theme}= useTheme();
  const getSkeletonColors = (theme) => {
    switch (theme) {
      case "dark":
        return {
          baseColor: "hsl(217.2 32.6% 17.5%)", // Using your dark theme muted color
          highlightColor: "hsl(222.2 84% 4.9%)", // Using your dark theme background color
        };
      case "andai":
        return {
          baseColor: "#E8D9C1",
          highlightColor: "#EAE0C8", // Using your andai theme background color
        };
      default: // light theme
        return {
          baseColor: "hsl(210 40% 96.1%)", // Using your light theme muted color
          highlightColor: "hsl(0 0% 100%)", // Using your light theme background color
        };
    }
  };
 const {baseColor , highlightColor}  =  getSkeletonColors(theme);
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
      <div className="mx-auto max-w-screen-2xl px-4 text-black andai:bg-[#FFF8E3] ">
        <div className="flex flex-col rounded-lg p-8 md:p-12 lg:flex-row lg:gap-8 andai:bg-[#FFF8E3] shadow-md border ">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                image={data?.plugins[0]?.img_url || `/svg/product.svg`}
                isLoading={loading}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription
              product={data?.plugins[0]}
              isLoading={loading}
              baseColor={baseColor}
              highlightColor={highlightColor}
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
