'use server';

import { cookies } from 'next/headers';

// Case A: cookie is undefined (cart not set)
// Case B: cart exists, productId not in cart
// Case C: cart exists, productId already in cart

export async function addOrUpdateCartItem(productId, quantity) {
  console.log(productId, quantity);
  // 1. Get current cart from cookies
  const cartCookie = (await cookies()).get('cart');

  // 2. Parse the cookie value
  const cartItems = !cartCookie
    ? // Case A: cart cookie is undefined
      []
    : JSON.parse(cartCookie.value);

  // 3. Find if the product already exists in the cart
  const productInCart = cartItems.find((item) => item.id === productId);

  if (!productInCart) {
    // Case B: Add new product to cart
    cartItems.push({ id: productId, quantity });
  } else {
    // Case C: Update quantity of existing product
    productInCart.quantity += quantity;
  }

  // 4. Save updated cart to cookies
  (await cookies()).set('cart', JSON.stringify(cartItems), { path: '/' });
}
