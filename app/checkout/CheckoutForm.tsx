'use client';

import { useRouter } from 'next/navigation';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import styles from '../styles/checkout.module.css';

// Define the structure for the form data
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

// Define the structure for form errors
type FormErrors = {
  [key in keyof FormDataType]?: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  // Step 1: State for Form Data with Type
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

  // Step 2: Handle Input Changes with Proper Type
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 3: Handle Form Submission with Proper Type
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form: all fields must be filled
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

    // Clear the cart in localStorage after successful submission
    localStorage.removeItem('cart');

    // Redirect to Thank You page
    router.push('/thank-you');
  };

  return (
    <div className={styles.checkoutContainer}>
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
              <p>{errors[key as keyof FormDataType]}</p>
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
  );
}
