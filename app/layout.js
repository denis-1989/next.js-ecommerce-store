import './global.css';
import Link from 'next/link';
import styles from './styles/layout.module.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Luxury Watch Store</title>
      </head>
      <body>
        <header className={styles.navbar}>
          <h2>Luxury Watch Store</h2>
          <nav className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/cart">Cart 🛒</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
