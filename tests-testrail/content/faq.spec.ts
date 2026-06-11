import { test, expect } from '@playwright/test';

test.describe('FAQ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('C73 shows the FAQ section', async ({ page }) => {
    await expect(page.getByText(/Frequently asked questions/i).first()).toBeVisible();
  });

  test('C74 mentions the free trial', async ({ page }) => {
    await expect(page.getByText(/free trial/i).first()).toBeVisible();
  });

  test('C75 mentions the credit card question', async ({ page }) => {
    await expect(page.getByText(/credit card/i).first()).toBeVisible();
  });
});
