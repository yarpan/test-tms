import { test, expect } from '@playwright/test';

test.describe('Page Load', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('C85 has Testomat in the title', async ({ page }) => {
    await expect(page).toHaveTitle(/Testomat/i);
  });

  test('C86 opens the testomat.io URL', async ({ page }) => {
    await expect(page).toHaveURL(/testomat\.io/);
  });

  test('C87 shows the page body', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
  });
});
