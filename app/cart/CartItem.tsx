'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/cart.module.css';

type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = {
  cart: CartItemType[];
};

export default function CartItem({ cart }: CartProps) {
  const router = useRouter();

  const [updatedCartState, setUpdatedCartState] =
    useState<CartItemType[]>(cart);

  useEffect(() => {
    document.cookie = `cart=${encodeURIComponent(
      JSON.stringify(
        updatedCartState.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      ),
    )}; path=/`;
  }, [updatedCartState]);

  const handleRemove = (productId: number) => {
    const newCart = updatedCartState.filter((item) => item.id !== productId);
    setUpdatedCartState(newCart);
  };

  const handleCheckout = () => {
    if (updatedCartState.length === 0) {
      alert('Your cart is empty. Add some products first!');
      return;
    }

    document.cookie = `cart=${encodeURIComponent(
      JSON.stringify(
        updatedCartState.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      ),
    )}; path=/`;

    router.push('/checkout');
  };

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.pathname === '/thank-you'
    ) {
      console.log('User is on Thank You page. Clearing cart...');
      document.cookie = 'cart=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      setUpdatedCartState([]);
    }
  }, [router]);

  const totalPrice = updatedCartState.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>Your Cart</h1>
        {updatedCartState.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {updatedCartState.map((item) => (
              <div
                key={`cart-item-${item.id}`}
                className={styles.cartItem}
                data-test-id={`cart-product-${item.id}`}
              >
                <span className={styles.cartProductName}>{item.name}</span>
                <span className={styles.cartQuantity}>
                  Quantity: {item.quantity}
                </span>
                <span className={styles.cartPrice}>
                  Price: ${item.price.toFixed(2)}
                </span>
                <span className={styles.cartSubtotal}>
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className={styles.removeButton}
                  data-test-id={`cart-product-remove-${item.id}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <h2 className={styles.cartTotal} data-test-id="cart-total">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button
              className={styles.checkoutButton}
              onClick={handleCheckout}
              data-test-id="checkout-button"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
