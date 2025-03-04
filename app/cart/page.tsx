import { cookies } from 'next/headers';
import CartItem from './CartItem';

// Define product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Sample products
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
  // Step 1: Get the cart cookie
  const cartCookie = (await cookies()).get('cart');
  let cartData: { id: number; quantity: number }[] = [];

  // Step 2: Check if cartCookie exists and is valid
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

  // Step 3: Ensure the cart is EMPTY if no valid cart data exists
  if (cartData.length === 0) {
    console.log('No cart data found, setting cart to empty.');
  }

  // Step 4: Combine cart data with product details
  const combinedCart = cartData.map((cartItem) => {
    const productDetails = sampleProducts.find(
      (product) => product.id === cartItem.id,
    );

    return {
      id: cartItem.id,
      name: productDetails?.name || 'Unknown Product',
      price: productDetails?.price || 0,
      quantity: cartItem.quantity,
    };
  });

  console.log('Combined Cart (Server Side):', combinedCart);

  return <CartItem cart={combinedCart} />;
}
