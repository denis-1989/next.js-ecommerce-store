'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/'); // Redirect to home page after 5 seconds
    }, 5000);
  }, [router]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thank You for Your Purchase!</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
}
