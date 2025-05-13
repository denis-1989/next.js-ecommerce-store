import Link from 'next/link';
import styles from './styles/home.module.css';

export const metadata = {
  title: 'Luxury Watch Store',
  description: 'Welcome to the finest luxury watch collection online.',
};

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <div>
        <h1 className={styles.homeTitle}>Welcome to the Luxury Watch Store</h1>
        <p className={styles.homeSubtitle}>Find the finest luxury watches.</p>
        <Link href="/products" className={styles.exploreButton}>
          Explore Products
        </Link>
      </div>
    </div>
  );
}
