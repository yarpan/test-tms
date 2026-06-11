import { test, expect } from '@playwright/test';

test.describe('Account Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('C91 has a Log In link', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Log In/i }).first()
    ).toBeAttached();
  });

  test('C92 shows a Start for free action', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Start for free' }).filter({ visible: true }).first()
    ).toBeVisible();
  });

  test('C93 shows a Schedule a demo action', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Schedule a demo/i }).filter({ visible: true }).first()
    ).toBeVisible();
  });
});
