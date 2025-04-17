-- Create products table
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(100) NOT NULL,
  price integer NOT NULL,
  image varchar(100) NOT NULL
);

-- inserting into products table (C from CRUD)
INSERT INTO
  products (name, price, image)
VALUES
  (
    'Rolex Submariner',
    12500,
    '/images/rolex-submariner.webp'
  ),
  (
    'Omega Speedmaster',
    8500,
    '/images/omega-speedmaster.webp'
  ),
  (
    'Audemars Piguet Royal Oak',
    30000,
    '/images/audemars-piguet-royal-oak.webp'
  ),
  (
    'Patek Philippe Nautilus',
    40000,
    '/images/patek-philippe-nautilus.webp'
  );

-- Select all products (R from CRUD)
SELECT
  *
FROM
  products;
