'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/cart.module.css';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantity
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className={styles.cartItem}
              data-test-id={`cart-product-${item.id}`}
            >
              <span className={styles.cartProductName}>{item.name}</span>
              <span
                className={styles.cartQuantity}
                data-test-id={`cart-product-quantity-${item.id}`}
              >
                {item.quantity}
              </span>
              <span className={styles.cartSubtotal}>
                ${item.price * item.quantity}
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
            {totalPrice}
          </h2>
          <button
            onClick={handleCheckout}
            className={styles.checkoutButton}
            data-test-id="cart-checkout"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
