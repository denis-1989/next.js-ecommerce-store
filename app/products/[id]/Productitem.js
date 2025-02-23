'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/products.module.css';
import { addOrUpdateCartItem } from './action';

export default function ProductItem(props) {
  const router = useRouter();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!props.productId) return;

    const foundProduct = props.sampleProducts.find(
      (p) => p.id === props.productId,
    );
    setProduct(foundProduct);
  }, [props.productId]);

  // const handleAddToCart = () => {
  //   if (!product) {
  //     console.error('Product is null in handleAddToCart');
  //     return;
  //   }
  //   const cart = JSON.parse(localStorage.getItem('cart')) || [];
  //   const existingProduct = cart.find((item) => item.id === product.id);
  //   if (existingProduct) {
  //     existingProduct.quantity += 1;
  //   } else {
  //     cart.push({ ...product, quantity: 1 });
  //   }
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   alert(`${product.name} added to cart!`);
  //   router.push('/cart');
  // };
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productContainer}>
      <h1 className={styles.productTitle}>{product.name}</h1>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className={styles.productImage}
      />
      <p className={styles.productPrice}>Price: ${product.price}</p>
      <div className={styles.actionContainer}>
        <input
          type="number"
          value={quantity}
          min={1}
          data-test-id="product-quantity"
          className={styles.inputField}
          onChange={(event) => {
            const value = Number(event.currentTarget.value);
            if (value >= 1) {
              setQuantity(value);
            }
          }}
        />

        <button
          onClick={async () => {
            await addOrUpdateCartItem(props.productId, quantity);
            alert(`${product.name} added to cart!`);
            router.push('/cart');
          }}
          data-test-id="product-add-to-cart"
          disabled={!product}
          className={styles.addButton}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
