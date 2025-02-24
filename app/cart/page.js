import { cookies } from 'next/headers';
import CartItem from './CartItem';

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

export default async function CartPage() {
  // Step 1: Get the cart cookie
  const cartCookie = (await cookies()).get('cart');
  const cartData = cartCookie ? JSON.parse(cartCookie.value) : [];

  // Step 2: Combine cart data with product details
  const combinedCart = cartData.map((cartItem) => {
    // Find the product details from sampleProducts
    const productDetails = sampleProducts.find(
      (product) => product.id === cartItem.id,
    );

    // Combine cart item with product details
    return {
      ...productDetails,
      quantity: cartItem.quantity,
    };
  });

  console.log('Combined Cart (Server Side):', combinedCart); // Debugging

  // Step 3: Pass the combined cart as props
  return <CartItem cart={combinedCart} />;
}
