'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from '../styles/thankyou.module.css';

export default function ThankYouMessage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.thankYouContainer}>
      <h1 className={styles.heading}>Thank You for Your Purchase!</h1>
      <p className={styles.subtext}>
        Your order has been placed successfully. You'll be redirected to the
        homepage shortly.
      </p>
      <button onClick={() => router.push('/')} className={styles.homeButton}>
        Return to Home Now
      </button>
    </div>
  );
}
