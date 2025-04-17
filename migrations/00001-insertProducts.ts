import type { Sql } from 'postgres';

const products = [
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
  {
    id: 3,
    name: 'Audemars Piguet Royal Oak',
    price: 30000,
    image: '/images/audemars-piguet-royal-oak.webp',
  },
  {
    id: 4,
    name: 'Patek Philippe Nautilus',
    price: 40000,
    image: '/images/patek-philippe-nautilus.webp',
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
      INSERT INTO
        products (name, price, image)
      VALUES
        (
          ${product.name},
          ${product.price},
          ${product.image}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products
      WHERE
        id = ${product.id}
    `;
  }
}
