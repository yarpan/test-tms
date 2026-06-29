import { test, expect } from '@playwright/test';

test.describe('Account Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('has a Log In link', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Log In/i }).first()
    ).toBeAttached();
  });

  test('shows a Start for free action', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Start for free' }).filter({ visible: true }).first()
    ).toBeVisible();
  });

  test('shows a Schedule a demo action', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Schedule a demo/i }).filter({ visible: true }).first()
    ).toBeVisible();
  });
});
