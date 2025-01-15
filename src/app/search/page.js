"use client";

import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { usePlugins } from "@/context/pluginsContext";
import { GET_ALL_PLUGINS } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useTheme } from "next-themes";
// import { defaultSort, sorting } from 'lib/constants';
// import { getProducts } from 'lib/shopify';

export default function SearchPage({ searchParams }) {

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

  const { sort, q: searchValue } = searchParams;
  // const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  // const products = await getProducts({ sortKey, reverse, query: searchValue });

  const { pluginsText } = usePlugins();

  // console.log("pluginsText from context", pluginsText);

  const pluginsList = pluginsText
    ?.split("\n") // Split by line breaks
    ?.map((plugin) => plugin.replace("-" || "•", "").trim()) // Remove dashes and extra spaces
    ?.filter((plugin) => plugin); // Remove empty values (if any)

  // Log the result
  // console.log("my plugins array:", pluginsList);

  // console.log("searchPlugins", searchPlugins);

  const {
    data: AllPlugins,
    error,
    loading,
  } = useQuery(GET_ALL_PLUGINS, {
    variables: {
      where: {
        // ...(searchValue ? { title: { _ilike: `%${searchValue}%` } } : {}),
        ...(searchValue ? { title: { _in: pluginsList } } : {}),
      },
    },
  });

  const resultsText = AllPlugins?.plugins?.length > 1 ? "results" : "result";
  const plugins = AllPlugins?.plugins || [];

  return (
    <>
      {searchValue && !loading ? (
        <p className="mb-4 text-black">
          {plugins.length === 0
            ? "There are no plugins that match "
            : `Showing ${plugins.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ProductGridItems products={plugins} isLoading={loading} baseColor={baseColor} highlightColor={highlightColor} />
      </Grid>
    </>
  );
}
