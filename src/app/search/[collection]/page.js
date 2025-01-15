"use client";

import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { GET_FILTERED_PLUGINS, GET_PLUGINS_BY_CATEGORY } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useTheme } from "next-themes";
// import { defaultSort, sorting } from 'lib/constants';

// export async function generateMetadata({
//   params
// }){
//   const collection = await getCollection(params.collection);

//   if (!collection) return notFound();

//   return {
//     title: collection.seo?.title || collection.title,
//     description:
//       collection.seo?.description || collection.description || `${collection.title} products`
//   };
// }

export default function CategoryPage({ params, searchParams }) {
  //   const { sort } = searchParams;
  //   const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  //   const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  const {theme}= useTheme();
  const { collection } = params;
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

  const { data, error, loading } = useQuery(GET_FILTERED_PLUGINS, {
    variables: {
      where: {
        ...(collection === "inhouse" ? { Inhouse: { _eq: true } } : {}),
        ...(collection === "vendor" ? { Vendor: { _eq: true } } : {}),
        ...(collection !== "inhouse" && collection !== "vendor"
          ? {
              category_id: { _eq: collection },
            }
          : {}),
      },
    },
  });

  if (loading) {
    return <div className=" text-black ">Loading...</div>;
  }

  const plugins = data?.plugins || [];

  return (
    <section>
      {plugins?.length === 0 ? (
        <p className="py-3 text-lg">{`No plugins found `}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={plugins} baseColor={baseColor} highlightColor={highlightColor} />
        </Grid>
      )}
    </section>
  );
}
