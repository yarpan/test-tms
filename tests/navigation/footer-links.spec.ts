import { test, expect } from '@playwright/test';

test.describe('Footer Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('shows the Terms link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Terms' }).first()).toBeVisible();
  });

  test('shows the Privacy link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Privacy' }).first()).toBeVisible();
  });

  test('shows the Contact us link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Contact us' }).first()).toBeVisible();
  });
});
