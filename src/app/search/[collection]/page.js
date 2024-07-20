"use client";

import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { GET_FILTERED_PLUGINS, GET_PLUGINS_BY_CATEGORY } from "@/lib/queries";
import { useQuery } from "@apollo/client";
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

  const { collection } = params;

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
    return <div>Loading...</div>;
  }

  const plugins = data?.plugins || [];

  return (
    <section>
      {plugins?.length === 0 ? (
        <p className="py-3 text-lg">{`No plugins found `}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={plugins} />
        </Grid>
      )}
    </section>
  );
}
