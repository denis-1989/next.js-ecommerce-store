import Image from 'next/image';
import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import styles from '../styles/products.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Products - Luxury Watch Store',
  description: 'Browse our premium selection of luxury timepieces.',
};

export default async function ProductsPage() {
  const products = await getProductsInsecure();
  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.productsTitle}>Products</h1>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={`product-${product.id}`} className={styles.productItem}>
            <Link
              href={`/products/${product.id}`}
              data-test-id={`product-${product.id}`}
              className={styles.productLink}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={220}
                className={styles.productCardImage}
              />
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
