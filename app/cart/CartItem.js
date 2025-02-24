'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/cart.module.css';

export default function CartItem({ cart }) {
  // Step 1: State for Updated Cart
  const [updatedCartState, setUpdatedCartState] = useState(cart);

  // Step 2: useEffect to Update Cookie
  useEffect(() => {
    // Update the cookie whenever the cart state changes
    document.cookie = `cart=${encodeURIComponent(
      JSON.stringify(
        updatedCartState.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      ),
    )}; path=/`;
  }, [updatedCartState]);

  // Step 3: Remove an item from the cart
  const handleRemove = (productId) => {
    // Filter out the product to be removed
    const newCart = updatedCartState.filter((item) => item.id !== productId);
    setUpdatedCartState(newCart);
  };

  // Step 4: Calculate the total price
  const totalPrice = updatedCartState.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0,
  );

  // Step 5: Display the cart items
  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Your Cart</h1>
      {updatedCartState.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {updatedCartState.map((item) => (
            <div
              key={`item-${item.id}`}
              className={styles.cartItem}
              data-test-id={`cart-product-${item.id}`}
            >
              <span className={styles.cartProductName}>{item.name}</span>
              <span className={styles.cartQuantity}>
                Quantity: {item.quantity}
              </span>
              <span className={styles.cartPrice}>Price: ${item.price}</span>
              <span className={styles.cartSubtotal}>
                Subtotal: ${item.price * item.quantity}
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
            Total: ${totalPrice}
          </h2>
        </div>
      )}
    </div>
  );
}
