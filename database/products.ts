import { cache } from 'react';
import { sql } from './connect';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// export const products = [
//   { id: 1, name: 'Rolex Submariner', price: 10000 },
//   { id: 2, name: 'Omega Speedmaster', price: 8000 },
//   { id: 3, name: 'Audemars Piguet Royal Oak', price: 15000 },
//   { id: 4, name: 'Patek Philippe Nautilus', price: 20000 },
// ];

export const getProductsInsecure = cache(async () => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;

  return products;
});

export const getProductInsecure = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;

  return product;
});
