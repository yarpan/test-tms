import { test, expect } from '@playwright/test';

test.describe('Page Load', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('has Testomat in the title', async ({ page }) => {
    await expect(page).toHaveTitle(/Testomat/i);
  });

  test('opens the testomat.io URL', async ({ page }) => {
    await expect(page).toHaveURL(/testomat\.io/);
  });

  test('shows the page body', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
  });
});
