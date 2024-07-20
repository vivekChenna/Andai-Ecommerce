"use client";

import clsx from "clsx";
import { Suspense } from "react";

// import { getCollections } from 'lib/shopify';
import FilterList from "./filter";
import { useQuery } from "@apollo/client";
import { GET_ALL_PLUGIN_CATEGORIES } from "@/lib/queries";

function CollectionList() {
  // const collections = await getCollections();

  const { data, error, loading } = useQuery(GET_ALL_PLUGIN_CATEGORIES);

  const collections = data?.plugins_category?.map((pc) => ({
    title: pc?.category,
    id: pc?.id,
    path: `/search/${pc?.id}`,
  }));

  return <FilterList list={collections || []} title="Collections" />;
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
