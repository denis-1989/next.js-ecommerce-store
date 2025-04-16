import { cookies } from 'next/headers';
import { combineCartWithProducts } from '../../util/cart';
import CartItem from './CartItem';

export const metadata = {
  title: 'Cart - Luxury Watch Store',
  description: 'View and manage the items in your shopping cart.',
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Rolex Submariner',
    price: 12500,
    image: '/images/rolex-submariner.webp',
  },
  {
    id: 2,
    name: 'Omega Speedmaster',
    price: 8500,
    image: '/images/omega-speedmaster.webp',
  },
  {
    id: 3,
    name: 'Audemars Piguet Royal Oak',
    price: 30000,
    image: '/images/audemars-piguet-royal-oak.webp',
  },
  {
    id: 4,
    name: 'Patek Philippe Nautilus',
    price: 40000,
    image: '/images/patek-philippe-nautilus.webp',
  },
];

export default async function CartPage() {
  const cartCookie = (await cookies()).get('cart');
  let cartData: { id: number; quantity: number }[] = [];

  if (cartCookie) {
    try {
      const parsedCart = JSON.parse(cartCookie.value);
      if (Array.isArray(parsedCart)) {
        cartData = parsedCart;
      }
    } catch (error) {
      console.error('Error parsing cart cookie:', error);
    }
  }

  if (cartData.length === 0) {
    console.log('No cart data found, setting cart to empty.');
  }

  const combinedCart = combineCartWithProducts(cartData, sampleProducts);

  console.log('Combined Cart (Server Side):', combinedCart);

  return <CartItem cart={combinedCart} />;
}
