import { test, expect } from '@playwright/test';

test.describe('Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('C76 mentions AI test generation', async ({ page }) => {
    await expect(page.getByText('AI test generation').first()).toBeAttached();
  });

  test('C77 mentions Manual testing', async ({ page }) => {
    await expect(page.getByText(/Manual testing/i).first()).toBeVisible();
  });

  test('C78 mentions Integrations', async ({ page }) => {
    await expect(page.getByText(/Integrations/i).first()).toBeVisible();
  });
});
