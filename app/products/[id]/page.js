'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function ProductPage({ params: paramsPromise }) {
  const router = useRouter();
  const params = use(paramsPromise); // Unwrapping the params promise
  const productId = params.id; // Now it's safe to access

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const sampleProducts = [
      { id: '1', name: 'Rolex Submariner', price: 10000 },
      { id: '2', name: 'Omega Speedmaster', price: 8000 },
      { id: '3', name: 'Audemars Piguet Royal Oak', price: 15000 },
      { id: '4', name: 'Patek Philippe Nautilus', price: 20000 },
    ];
    const foundProduct = sampleProducts.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} added to cart!`);
    router.push('/cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart} data-test-id="product-add-to-cart">
        Add to Cart
      </button>
    </div>
  );
}
