import Image from 'next/image';
import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import styles from '../styles/products.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Products - Luxury Watch Store',
  description: 'Browse our premium selection of luxury timepieces.',
};

// const products = [
//   {
//     id: 1,
//     name: 'Rolex Submariner',
//     price: 12500,
//     image: '/images/rolex-submariner.webp',
//   },
//   {
//     id: 2,
//     name: 'Omega Speedmaster',
//     price: 8500,
//     image: '/images/omega-speedmaster.webp',
//   },
//   {
//     id: 3,
//     name: 'Audemars Piguet Royal Oak',
//     price: 30000,
//     image: '/images/audemars-piguet-royal-oak.webp',
//   },
//   {
//     id: 4,
//     name: 'Patek Philippe Nautilus',
//     price: 40000,
//     image: '/images/patek-philippe-nautilus.webp',
//   },
// ];

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
                height={300}
                className={styles.productImage}
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
