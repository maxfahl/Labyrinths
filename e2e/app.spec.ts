import { expect, test } from '@playwright/test';

test('homepage loads and shows controls and preview', async ({ page }) => {
  await page.goto('/');
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

  // Seed input
  const seedInput = await page.getByLabel('Seed');
  await expect(seedInput).toBeVisible();
  await seedInput.fill('test-seed-123');
  await expect(seedInput).toHaveValue('test-seed-123');

  // Start/End position selectors
  const startSelect = await page.getByLabel('Start Position');
  const endSelect = await page.getByLabel('End Position');
  await expect(startSelect).toBeVisible();
  await expect(endSelect).toBeVisible();
  await startSelect.selectOption('top-left');
  await endSelect.selectOption('bottom-right');
  await expect(startSelect).toHaveValue('top-left');
  await expect(endSelect).toHaveValue('bottom-right');

  // Maze theme selector
  const themeSelect = await page.getByLabel('Maze Theme');
  await expect(themeSelect).toBeVisible();
  await themeSelect.selectOption('print');
  await expect(themeSelect).toHaveValue('print');

  // Solution path toggle
  const solutionToggle = await page.getByLabel('Show Solution');
  await expect(solutionToggle).toBeVisible();
  await expect(solutionToggle).not.toBeChecked();
  await solutionToggle.check();
  await expect(solutionToggle).toBeChecked();

  // Grid overlay toggle
  const gridToggle = await page.getByLabel('Show Grid');
  await expect(gridToggle).toBeVisible();
  await expect(gridToggle).not.toBeChecked();
  await gridToggle.check();
  await expect(gridToggle).toBeChecked();

  // Animated generation toggle
  const animToggle = await page.getByLabel('Animate Generation');
  await expect(animToggle).toBeVisible();
  await expect(animToggle).not.toBeChecked();
  await animToggle.check();
  await expect(animToggle).toBeChecked();

  // High-contrast mode toggle
  const contrastToggle = await page.getByLabel('High Contrast');
  await expect(contrastToggle).toBeVisible();
  await expect(contrastToggle).not.toBeChecked();
  await contrastToggle.check();
  await expect(contrastToggle).toBeChecked();

  // Font size input
  const fontSizeInput = await page.getByLabel('Font Size');
  await expect(fontSizeInput).toBeVisible();
  await fontSizeInput.fill('24');
  await expect(fontSizeInput).toHaveValue('24');
}); 