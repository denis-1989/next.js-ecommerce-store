export const products = [
  { id: 1, name: 'Rolex Submariner', price: 10000 },
  { id: 2, name: 'Omega Speedmaster', price: 8000 },
  { id: 3, name: 'Audemars Piguet Royal Oak', price: 15000 },
  { id: 4, name: 'Patek Philippe Nautilus', price: 20000 },
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}
