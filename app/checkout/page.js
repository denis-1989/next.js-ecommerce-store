'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/checkout.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form: all fields must be filled
    const newErrors = {};
    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = 'This field is required';
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you could clear the cart and perform any further actions.
    localStorage.removeItem('cart');

    // Redirect to Thank You page
    router.push('/thank-you');
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.checkoutHeading}>Checkout</h1>
      <form className={styles.checkoutForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label
            htmlFor="firstName"
            className={styles.formLabel}
            data-test-id="checkout-first-name"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={styles.formInput}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="lastName"
            className={styles.formLabel}
            data-test-id="checkout-last-name"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={styles.formInput}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="email"
            className={styles.formLabel}
            data-test-id="checkout-email"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.formInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="address"
            className={styles.formLabel}
            data-test-id="checkout-address"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={styles.formInput}
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="city"
            className={styles.formLabel}
            data-test-id="checkout-city"
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className={styles.formInput}
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p>{errors.city}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="postalCode"
            className={styles.formLabel}
            data-test-id="checkout-postal-code"
          >
            Postal Code:
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            className={styles.formInput}
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
          {errors.postalCode && <p>{errors.postalCode}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="country"
            className={styles.formLabel}
            data-test-id="checkout-country"
          >
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className={styles.formInput}
            value={formData.country}
            onChange={handleChange}
            required
          />
          {errors.country && <p>{errors.country}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="creditCard"
            className={styles.formLabel}
            data-test-id="checkout-credit-card"
          >
            Credit Card:
          </label>
          <input
            type="text"
            id="creditCard"
            name="creditCard"
            className={styles.formInput}
            value={formData.creditCard}
            onChange={handleChange}
            required
          />
          {errors.creditCard && <p>{errors.creditCard}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="expirationDate"
            className={styles.formLabel}
            data-test-id="checkout-expiration-date"
          >
            Expiration Date:
          </label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            className={styles.formInput}
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
          {errors.expirationDate && <p>{errors.expirationDate}</p>}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="securityCode"
            className={styles.formLabel}
            data-test-id="checkout-security-code"
          >
            Security Code:
          </label>
          <input
            type="text"
            id="securityCode"
            name="securityCode"
            className={styles.formInput}
            value={formData.securityCode}
            onChange={handleChange}
            required
          />
          {errors.securityCode && <p>{errors.securityCode}</p>}
        </div>
        <button
          type="submit"
          className={styles.checkoutButton}
          data-test-id="checkout-confirm-order"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
