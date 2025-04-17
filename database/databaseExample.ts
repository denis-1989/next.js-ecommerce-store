import { getProductsInsecure } from './products';

async function main() {
  const products = await getProductsInsecure();
  console.log(' Products from DB:', products);
}

main().catch((error) => {
  console.error(' Error:', error);
});
