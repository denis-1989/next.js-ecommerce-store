'use client';

import { useRouter } from 'next/navigation';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import styles from '../styles/checkout.module.css';

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  creditCard: string;
  expirationDate: string;
  securityCode: string;
};

type FormErrors = {
  [key in keyof FormDataType]?: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    creditCard: '',
    expirationDate: '',
    securityCode: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};
    for (const key in formData) {
      if (!formData[key as keyof FormDataType].trim()) {
        newErrors[key as keyof FormDataType] = 'This field is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.removeItem('cart');
    router.push('/thank-you');
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutBox}>
        <h1 className={styles.checkoutHeading}>Checkout</h1>
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className={styles.formGroup} key={`checkout-field-${key}`}>
              <label
                htmlFor={key}
                className={styles.formLabel}
                data-test-id={`checkout-${key}`}
              >
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, ' $1')}
                :
              </label>
              <input
                id={key}
                name={key}
                type={key === 'email' ? 'email' : 'text'}
                className={styles.formInput}
                value={formData[key as keyof FormDataType]}
                onChange={handleChange}
                required
              />
              {errors[key as keyof FormDataType] && (
                <p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>
                  {errors[key as keyof FormDataType]}
                </p>
              )}
            </div>
          ))}

          <button
            className={styles.checkoutButton}
            data-test-id="checkout-confirm-order"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
