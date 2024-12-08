import Grid from "@/components/grid";
import { GridTileImage } from "@/components/grid/tile";
// import { Product } from 'lib/shopify/types';
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductGridItems({ products, isLoading }) {
  const skeletonItems = new Array(9).fill(null);
  return (
    <>
      {isLoading
        ? skeletonItems.map((_, index) => (
            <Grid.Item
              key={index}
              className="animate-fadeIn"
              style={{ height: "100%" }}
            >
              <div className="relative inline-block h-full w-full">
                <Skeleton
                  containerClassName="h-full w-full"
                  baseColor="#E8D9C1" highlightColor="#EAE0C8"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </Grid.Item>
          ))
        : products.map((product) => (
            <Grid.Item key={product.id} className="animate-fadeIn">
              <Link
                className="relative inline-block h-full w-full"
                href={`/product/${product.id}`}
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
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </Link>
            </Grid.Item>
          ))}
    </>
  );
}
