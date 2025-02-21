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

export default function ThankYouMessage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thank You for Your Purchase!</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
}
