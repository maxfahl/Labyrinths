import { expect, test } from '@playwright/test';

test('homepage loads and shows controls and preview', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  // Wait for the root element to be present
  await page.waitForSelector('#root', { timeout: 10000 });
  // Wait for the Controls text to appear
  await expect(page.getByText('Controls', { exact: false })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('heading', { name: /Maze Preview/i })).toBeVisible();

  // Maze type select
  const typeTrigger = await page.getByLabel('Type');
  await expect(typeTrigger).toBeVisible();
  await typeTrigger.click();
  const roundOption = await page.getByRole('option', { name: /Round/i });
  await roundOption.click();
  await expect(typeTrigger).toHaveText(/Round/i);

  // Width/Height inputs
  const widthInput = await page.getByLabel('Width');
  const heightInput = await page.getByLabel('Height');
  await expect(widthInput).toBeVisible();
  await expect(heightInput).toBeVisible();
  await widthInput.fill('800');
  await heightInput.fill('400');
  await expect(widthInput).toHaveValue('800');
  await expect(heightInput).toHaveValue('400');

  // Complexity slider
  const complexitySlider = page.getByRole('slider', { name: 'Complexity' });
  await expect(complexitySlider).toBeVisible();

  // Line color input
  const lineColorInput = await page.getByLabel('Line Color');
  await expect(lineColorInput).toBeVisible();
  await lineColorInput.fill('#123456');
  await expect(lineColorInput).toHaveValue('#123456');

  // Background color input
  const bgColorInput = await page.getByLabel('Background Color');
  await expect(bgColorInput).toBeVisible();
  await bgColorInput.fill('#abcdef');
  await expect(bgColorInput).toHaveValue('#abcdef');

  // Wall thickness slider
  const wallSlider = page.getByRole('slider', { name: 'Wall Thickness' });
  await expect(wallSlider).toBeVisible();
}); 