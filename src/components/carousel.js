"use client";

// import { getCollectionProducts } from 'lib/shopify';
import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import Marquee from "react-fast-marquee";
import { useQuery } from "@apollo/client";
import { GET_ALL_PLUGINS } from "@/lib/queries";

export function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  //   const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  const {
    data: carouselPlugins,
    loading,
    error,
  } = useQuery(GET_ALL_PLUGINS, {
    variables: {
      where: {},
    },
  });

  if (loading) {
    return <div className=" w-full text-center my-10">Loading...</div>;
  }

  if (carouselPlugins?.plugins?.length === 0) return null;

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <Marquee>
        <ul className="flex animate-carousel gap-4">
          {carouselPlugins?.plugins?.map((plugin, i) => (
            <li
              key={`${plugin.id}${i}`}
              className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
            >
              <Link
                // href={`/product/${plugin.handle}`}
                href={`/product/${plugin.id}`}
                className="relative h-full w-full"
              >
                <GridTileImage
                  alt={plugin?.title}
                  label={{
                    title: plugin?.title,
                    amount: plugin?.amount,
                    currencyCode:
                      plugin?.priceRange?.maxVariantPrice?.currencyCode,
                  }}
                  src={plugin?.img_url || "/svg/product.svg"}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}
