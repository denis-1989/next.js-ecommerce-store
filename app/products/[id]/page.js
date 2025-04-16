import { notFound } from 'next/navigation';
import { getProductsInsecure } from '../../../database/products';
import ProductItem from './Productitem';

export async function generateMetadata({ params }) {
  const products = await getProductsInsecure();
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    notFound();
  }

  return {
    title: product.name,
    description: 'This is a luxury watch from our collection',
  };
}

export default async function ProductPage({ params }) {
  const products = await getProductsInsecure();
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    notFound();
  }

  return <ProductItem sampleProducts={products} productId={params.id} />;
}
