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
          <>
            <div className={styles.cartTableWrapper}>
              <table className={styles.cartTable}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedCartState.map((item) => (
                    <tr
                      key={`cart-item-${item.id}`}
                      data-test-id={`cart-product-${item.id}`}
                    >
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className={styles.removeButton}
                          data-test-id={`cart-product-remove-${item.id}`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
}
