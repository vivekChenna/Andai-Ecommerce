import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
// import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.id}`}>
            <GridTileImage
              alt={product?.title}
              label={{
                title: product?.title,
                amount: product?.amount,
                currencyCode: product?.currencyCode
              }}
              src={"/svg/product.svg"}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
