// import { AddToCart } from 'components/cart/add-to-cart';
import Price from "@/components/price";
import Link from "next/link";
// import Prose from 'components/prose';
// import { Product } from 'lib/shopify/types';
// import { Suspense } from 'react';
// import { VariantSelector } from './variant-selector';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ProductDescription({ product, isLoading }) {
  return (
    <>
      <div className="mb-6 flex flex-col  text-black">
        <h1 className="mb-2 md:text-4xl text-xl font-medium">
          {isLoading ? (
            <Skeleton
              baseColor="#E8D9C1"
              highlightColor="#EAE0C8"
              width={320}
            />
          ) : (
            product?.title
          )}
        </h1>
        <div className=" flex items-center justify-between">
          <div className="mr-auto ">
            {isLoading ? (
              <Skeleton
                baseColor="#E8D9C1"
                highlightColor="#EAE0C8"
                circle
                width={50}
                height={50}
              />
            ) : (
              <div className="w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                <Link
                  href={`https://docs.google.com/forms/d/e/1FAIpQLScfOhn111VpB2DB09HYpOSqyh3VKNMHORXyMugR2mndNsNRvw/viewform`}
                  target="_blank"
                >
                  {/* <Price
              amount={product?.amount}
              currencyCode={product?.currencyCode}
              /> */}
                  Pricing
                </Link>
              </div>
            )}
          </div>

          <div className=" mr-auto">
            {isLoading ? (
              <Skeleton
                baseColor="#E8D9C1"
                highlightColor="#EAE0C8"
                circle={true}
                width={50}
                height={50}
              />
            ) : (
              <a
                className=" w-auto rounded-full bg-blue-600 p-2 text-sm text-white"
                href={product?.docs_url}
                target="_blank"
              >
                DOCS
              </a>
            )}
          </div>

          <div className="mr-auto">
            {isLoading ? (
              <Skeleton
                baseColor="#E8D9C1"
                highlightColor="#EAE0C8"
                circle
                height={50}
                width={50}
              />
            ) : (
              <div className=" w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                <a href={product?.Web_url} target="_blank">
                  DEMO
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton baseColor="#E8D9C1" highlightColor="#EAE0C8" />
      ) : (
        <div className="border border-neutral-600" />
      )}

      <div className=" font-medium mt-2">
        {isLoading ? (
          <Skeleton
            baseColor="#E8D9C1"
            highlightColor="#EAE0C8"
            height={30}
            count={5}
          />
        ) : (
          product?.description
        )}
      </div>
      {/* <Suspense fallback={null}>
        <VariantSelector options={product.options} variants={product.variants} />
      </Suspense> */}

      {/* {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null} */}

      {/* <Suspense fallback={null}>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense> */}
    </>
  );
}
