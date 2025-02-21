import ProductItem from './Productitem';

const sampleProducts = [
  {
    id: '1',
    name: 'Rolex Submariner',
    price: 12500,
    image: '/images/rolex-submariner.webp',
  },
  {
    id: '2',
    name: 'Omega Speedmaster',
    price: 8500,
    image: '/images/omega-speedmaster.webp',
  },
  {
    id: '3',
    name: 'Audemars Piguet Royal Oak',
    price: 30000,
    image: '/images/audemars-piguet-royal-oak.webp',
  },
  {
    id: '4',
    name: 'Patek Philippe Nautilus',
    price: 40000,
    image: '/images/patek-philippe-nautilus.webp',
  },
];

export default async function ProductPage({ params }) {
  const productId = (await params).id;
  console.log(productId);
  return <ProductItem sampleProducts={sampleProducts} productId={productId} />;
}
