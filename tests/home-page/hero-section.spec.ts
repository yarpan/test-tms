import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testomat.io/');
  });

  test('shows the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('shows a "Start for free" call to action', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Start for free' }).filter({ visible: true }).first()
    ).toBeVisible();
  });

  test('shows a "Schedule" demo action', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Schedule a demo/i }).filter({ visible: true }).first()
    ).toBeVisible();
  });
});
