import Link from 'next/link';
import styles from './styles/home.module.css';

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Welcome to the Luxury Watch Store</h1>
      <p className={styles.homeSubtitle}>Find the finest luxury watches.</p>
      <img
        src="/images/watch-store.webp"
        alt="Luxury Watches"
        className={styles.homeImage}
      />
      <Link href="/products" className={styles.exploreButton}>
        Explore Products
      </Link>
    </div>
  );
}
