// import { AddToCart } from 'components/cart/add-to-cart';
import Price from "@/components/price";
import Link from "next/link";
// import Prose from 'components/prose';
// import { Product } from 'lib/shopify/types';
// import { Suspense } from 'react';
// import { VariantSelector } from './variant-selector';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ProductDescription({
  product,
  isLoading,
  baseColor,
  highlightColor,
  setShowModal,
}) {
  return (
    <>
      <div className="mb-6 flex flex-col  text-black dark:text-white">
        <h1 className="mb-2 md:text-4xl text-xl font-medium">
          {isLoading ? (
            <Skeleton
              baseColor={baseColor}
              highlightColor={highlightColor}
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
                baseColor={baseColor}
                highlightColor={highlightColor}
                circle
                width={50}
                height={50}
              />
            ) : (
              <div className="w-auto rounded-full bg-[#FFB07C] p-2 text-sm text-white  font-medium">
                <button
                  onClick={() => {
                    setShowModal();
                  }}
                >
                  Request Access
                </button>
              </div>
            )}
          </div>

          <div className=" mr-auto">
            {isLoading ? (
              <Skeleton
                baseColor={baseColor}
                highlightColor={highlightColor}
                circle={true}
                width={50}
                height={50}
              />
            ) : (
              <a
                className=" w-auto rounded-full bg-[#FFB07C] p-2 text-sm text-white font-medium"
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
                baseColor={baseColor}
                highlightColor={highlightColor}
                circle
                height={50}
                width={50}
              />
            ) : (
              <div className=" w-auto rounded-full bg-[#FFB07C] p-2 text-sm text-white font-medium">
                <a href={product?.Web_url} target="_blank">
                  DEMO
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton baseColor={baseColor} highlightColor={highlightColor} />
      ) : (
        <div className="border border-neutral-600" />
      )}

      <div className=" font-medium mt-2 dark:text-white">
        {isLoading ? (
          <Skeleton
            baseColor={baseColor}
            highlightColor={highlightColor}
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
