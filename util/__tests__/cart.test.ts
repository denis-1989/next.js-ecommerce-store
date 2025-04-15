import { expect, test } from '@jest/globals';
import {
  calculateCartTotal,
  combineCartWithProducts,
  updateCartItems,
} from '../cart';

test('combines cart items with product data', () => {
  const cartItems = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ];

  const sampleProducts = [
    {
      id: 1,
      name: 'Rolex Submariner',
      price: 12500,
      image: '/images/rolex-submariner.webp',
    },
    {
      id: 2,
      name: 'Omega Speedmaster',
      price: 8500,
      image: '/images/omega-speedmaster.webp',
    },
  ];

  const result = combineCartWithProducts(cartItems, sampleProducts);

  expect(result).toEqual([
    {
      id: 1,
      name: 'Rolex Submariner',
      price: 12500,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Omega Speedmaster',
      price: 8500,
      quantity: 1,
    },
  ]);
});

test('returns fallback values when product is missing', () => {
  const cartItems = [{ id: 99, quantity: 1 }];
  const sampleProducts: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[] = [];

  const result = combineCartWithProducts(cartItems, sampleProducts);

  expect(result).toEqual([
    {
      id: 99,
      name: 'Unknown Product',
      price: 0,
      quantity: 1,
    },
  ]);
});

test('adds new item to cart if not present', () => {
  const cartItems = [{ id: 1, quantity: 2 }];
  const result = updateCartItems(cartItems, 2, 1);

  expect(result).toEqual([
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ]);
});

test('updates quantity if item already exists in cart', () => {
  const cartItems = [{ id: 1, quantity: 2 }];
  const result = updateCartItems(cartItems, 1, 3);

  expect(result).toEqual([{ id: 1, quantity: 5 }]);
});

test('calculates total price of all cart items', () => {
  const cartItems = [
    { id: 1, name: 'Rolex', price: 10000, quantity: 2 },
    { id: 2, name: 'Omega', price: 5000, quantity: 1 },
  ];

  const total = calculateCartTotal(cartItems);

  expect(total).toBe(25000); // 2 x 10000 + 1 x 5000
});

test('returns 0 if cart is empty', () => {
  const total = calculateCartTotal([]);
  expect(total).toBe(0);
});
