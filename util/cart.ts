type CartItem = {
  id: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CombinedCartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export function combineCartWithProducts(
  cartItems: CartItem[],
  products: Product[],
): CombinedCartItem[] {
  return cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);

    return {
      id: cartItem.id,
      name: product?.name || 'Unknown Product',
      price: product?.price || 0,
      quantity: cartItem.quantity,
    };
  });
}

export function updateCartItems(
  cartItems: { id: number; quantity: number }[],
  productId: number,
  quantityToAdd: number,
): { id: number; quantity: number }[] {
  const productInCart = cartItems.find((item) => item.id === productId);

  if (!productInCart) {
    return [...cartItems, { id: productId, quantity: quantityToAdd }];
  }

  return cartItems.map((item) =>
    item.id === productId
      ? { ...item, quantity: item.quantity + quantityToAdd }
      : item,
  );
}

export function calculateCartTotal(cartItems: CombinedCartItem[]): number {
  return cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}
