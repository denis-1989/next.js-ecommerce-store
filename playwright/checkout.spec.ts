import { expect, test } from '@playwright/test';

test('user can complete checkout and see thank you page', async ({ page }) => {
  await page.goto('/products');

  await page.getByRole('link', { name: 'Omega Speedmaster' }).click();

  await page.getByRole('button', { name: /add to cart/i }).click();

  await page.getByRole('link', { name: /cart/i }).click();

  await page.getByRole('button', { name: /checkout/i }).click();
  await expect(page).toHaveURL('/checkout');

  await page.getByLabel('First Name:').fill('denis');
  await page.getByLabel('Last Name:').fill('koco');
  await page.getByLabel('Email:').fill('deniskoco89@gmail.com');
  await page.getByLabel('Address:').fill('Schmelzgasse');
  await page.getByLabel('City:').fill('Wien');
  await page.getByLabel('Postal Code:').fill('1020');
  await page.getByLabel('Country:').fill('Austria');
  await page.getByLabel('Credit Card:').fill('1234567834516789');
  await page.getByLabel('Expiration Date:').fill('12/29');
  await page.getByLabel('Security Code:').fill('234');

  await page.getByRole('button', { name: /confirm order/i }).click();

  await expect(page).toHaveURL('/thank-you');
  await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
});
