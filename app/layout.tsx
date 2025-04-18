import './global.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './styles/layout.module.css';

export const metadata: Metadata = {
  title: 'Luxury Watch Store',
  description: 'Browse the finest selection of luxury timepieces.',
  icons: {
    icon: '/favicon-32x32.png',
  },
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
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
            <Link href="/cart">Cart 🛒</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
