'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/products.module.css';
import { addOrUpdateCartItem } from './action';

// Define the type for a product
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Define the props type for the component
type ProductItemProps = {
  productId: string;
  sampleProducts: Product[];
};

export default function ProductItem({
  productId,
  sampleProducts,
}: ProductItemProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productLoaded, setProductLoaded] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Fetch product details based on productId
  useEffect(() => {
    if (!productId) return;
    console.log('props.productId', productId);
    console.log('props.sampleProducts', sampleProducts);

    // Find the product in the sampleProducts array
    const foundProduct = sampleProducts.find((p) => p.id === Number(productId));
    console.log('Found product', foundProduct);

    setProduct(foundProduct || null);
    if (foundProduct) {
      setProductLoaded(true);
    }
  }, [productId, sampleProducts]);

  // Show loading message until product is found
  if (!productLoaded || !product) {
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
            await addOrUpdateCartItem(Number(productId), quantity);
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
