"use client";

// import { AddToCart } from 'components/cart/add-to-cart';
// import Price from "@/components/price";
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
              <button
                onClick={() => {
                  setShowModal();
                }}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 
                bg-white text-gray-800 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-100 
                border border-gray-300 hover:border-gray-400 
                dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 
                dark:text-gray-100 dark:hover:from-indigo-300 dark:hover:to-purple-300 
                dark:border-transparent dark:hover:border-indigo-400"
              >
                Request Access
              </button>
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
              <button
                onClick={() => {
                  window.open(product?.docs_url || "" , "_blank");
                }}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 
                bg-white text-gray-800 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-100 
                border border-gray-300 hover:border-gray-400 
                dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 
                dark:text-gray-100 dark:hover:from-indigo-300 dark:hover:to-purple-300 
                dark:border-transparent dark:hover:border-indigo-400"
              >
                DOCS
              </button>
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
              <button
                onClick={() => {
                  window.open(product?.Web_url || "" , "_blank");
                }}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 
                bg-white text-gray-800 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-100 
                border border-gray-300 hover:border-gray-400 
                dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 
                dark:text-gray-100 dark:hover:from-indigo-300 dark:hover:to-purple-300 
                dark:border-transparent dark:hover:border-indigo-400"
              >
                DEMO
              </button>
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
