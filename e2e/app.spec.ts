import { expect, test } from '@playwright/test';

test('homepage loads and shows controls and preview', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  // Wait for the root element to be present
  await page.waitForSelector('#root', { timeout: 10000 });
  // Wait for the Controls text to appear
  await expect(page.getByText('Controls', { exact: false })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('heading', { name: /Maze Preview/i })).toBeVisible();
}); 