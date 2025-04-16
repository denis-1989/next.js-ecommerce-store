import { expect, test } from '@playwright/test';

test('user can add product to cart, see correct quantity and remove it', async ({
  page,
}) => {
  await page.goto('/products');

  await page.waitForLoadState('networkidle');

  const productLink = page.getByRole('link', { name: 'Omega Speedmaster' });
  await productLink.waitFor({ state: 'visible' });
  await productLink.click();

  const addToCartButton = page.getByRole('button', { name: /add to cart/i });
  await addToCartButton.waitFor({ state: 'visible' });
  await addToCartButton.click();

  const cartLink = page.getByRole('link', { name: /cart/i });
  await cartLink.waitFor({ state: 'visible' });
  await cartLink.click();

  const cartItem = page.getByTestId('cart-product-2');
  await expect(cartItem).toBeVisible();

  await expect(page.getByTestId('cart-total')).toContainText('8500');

  await page.getByTestId('cart-product-remove-2').click();

  await expect(page.locator('text=Your cart is empty.')).toBeVisible();
});
