import { test, expect } from '@playwright/test';

test.describe('Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('mentions AI test generation', async ({ page }) => {
    await expect(page.getByText('AI test generation').first()).toBeAttached();
  });

  test('mentions Manual testing', async ({ page }) => {
    await expect(page.getByText(/Manual testing/i).first()).toBeVisible();
  });

  test('mentions Integrations', async ({ page }) => {
    await expect(page.getByText(/Integrations/i).first()).toBeVisible();
  });
});
