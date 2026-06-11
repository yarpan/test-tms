import { test, expect } from '@playwright/test';

test.describe('Footer Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('C94 shows the Terms link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Terms' }).first()).toBeVisible();
  });

  test('C95 shows the Privacy link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Privacy' }).first()).toBeVisible();
  });

  test('C96 shows the Contact us link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Contact us' }).first()).toBeVisible();
  });
});
