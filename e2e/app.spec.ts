import { expect, test } from '@playwright/test';

test('homepage loads and shows controls and preview', async ({ page }) => {
  // Navigate to homepage
  await page.goto('/');
  // Wait for the Controls header to ensure page is loaded
  await expect(page.getByText('Controls', { exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Maze Preview/i })).toBeVisible();

  // Width/Height inputs
  const widthInput = page.locator('#width');
  const heightInput = page.locator('#height');
  await expect(widthInput).toBeVisible();
  await expect(heightInput).toBeVisible();

  // Complexity slider
  const complexitySlider = page.locator('[aria-label="Complexity"]');
  await expect(complexitySlider).toBeVisible();

  // Line color input
  const lineColorInput = await page.getByLabel('Line Color');
  await expect(lineColorInput).toBeVisible();

  // Background color input
  const bgColorInput = await page.getByLabel('Background Color');
  await expect(bgColorInput).toBeVisible();

  // Wall thickness slider
  const wallSlider = page.locator('[aria-label="Wall Thickness"]');
  await expect(wallSlider).toBeVisible();

  // Seed input
  const seedInput = await page.getByLabel('Seed');
  await expect(seedInput).toBeVisible();

  // Start/End position selectors
  await expect(page.getByLabel('Start Position')).toBeVisible();
  await expect(page.getByLabel('End Position')).toBeVisible();

  // Theme selector
  await expect(page.getByLabel('Maze Theme')).toBeVisible();

  // Toggle and other controls visibility
  await expect(page.getByLabel('Show Solution')).toBeVisible();
  await expect(page.getByLabel('Show Grid')).toBeVisible();
  await expect(page.getByLabel('Animate Generation')).toBeVisible();
  await expect(page.getByLabel('High Contrast')).toBeVisible();

  // Font size input
  await expect(page.getByLabel('Font Size')).toBeVisible();
}); 