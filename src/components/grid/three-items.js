"use client";

import { useQuery } from "@apollo/client";
import { GridTileImage } from "./tile";
import Link from "next/link";
import { GET_HOME_PAGE_PLUGINS } from "@/lib/queries";

function ThreeItemGridItem({ item, size, priority }) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item?.id}`}
      >
        <GridTileImage
          src={item?.img_url || "/svg/product.svg"}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item?.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item?.title,
            amount: item?.amount,
            currencyCode: item?.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  const { data, loading } = useQuery(GET_HOME_PAGE_PLUGINS, {
    variables: {
      limit: 3,
    },
  });

  if (loading) {
    return <div className=" w-full text-center">Loading...</div>;
  }

  const homePagePlugins = data?.plugins || [];

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem
        size="full"
        item={homePagePlugins?.[0]}
        priority={true}
      />
      <ThreeItemGridItem
        size="half"
        item={homePagePlugins?.[1]}
        priority={true}
      />
      <ThreeItemGridItem size="half" item={homePagePlugins?.[2]} />
    </section>
  );
}
