import { notFound } from 'next/navigation';
import { getProductsInsecure } from '../../../database/products';
import ProductItem from './Productitem';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Props) {
  const { id } = await props.params;
  const products = await getProductsInsecure();
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  return {
    title: product.name,
    description: `This is a luxury watch from our collection`,
  };
}

export default async function ProductPage(props: Props) {
  const { id } = await props.params;
  const products = await getProductsInsecure();
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  return <ProductItem sampleProducts={products} productId={id} />;
}
