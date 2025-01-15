"use client";

import { useQuery } from "@apollo/client";
import { GridTileImage } from "./tile";
import Link from "next/link";
import { GET_HOME_PAGE_PLUGINS } from "@/lib/queries";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";
import { useEffect } from "react";

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

export function ThreeItemGrid() {
  const { theme } = useTheme();

  useEffect(() => {
    getSkeletonColors(theme);
  }, [theme]);
  const { baseColor, highlightColor } = getSkeletonColors(theme);
  const { data, loading } = useQuery(GET_HOME_PAGE_PLUGINS, {
    variables: {
      limit: 3,
    },
  });

  const homePagePlugins = data?.plugins || [];

  if (loading) {
    return (
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
        {/* 1st */}

        <div className="md:col-span-4 md:row-span-2 rounded-lg">
          <Skeleton
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="relative block aspect-square h-full w-full"
          />
        </div>

        {/* 2nd */}

        <div className="md:col-span-2 md:row-span-1 rounded-lg">
          <Skeleton
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="relative block aspect-square h-full w-full"
          />
        </div>

        {/* 3rd */}
        <div className="md:col-span-2 md:row-span-1 rounded-lg">
          <Skeleton
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="relative block aspect-square h-full w-full"
          />
        </div>
      </section>
    );
  }

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
