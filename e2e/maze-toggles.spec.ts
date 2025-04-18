import { expect, test } from '@playwright/test';

test.describe('Maze toggles and visual effects', () => {
  test('Show Solution toggle displays solution path', async ({ page }) => {
    await page.goto('/');
    const solutionToggle = await page.getByLabel('Show Solution');
    await expect(solutionToggle).toBeVisible();
    await solutionToggle.check();
    // Check for a red polyline (solution path) in SVG
    const svg = await page.locator('svg');
    await expect(svg.locator('polyline[stroke="red"]')).toBeVisible();
  });

  test('Grid Overlay toggle displays grid lines', async ({ page }) => {
    await page.goto('/');
    const gridToggle = await page.getByLabel('Show Grid');
    await expect(gridToggle).toBeVisible();
    await gridToggle.check();
    // Check for grid lines (assume stroke-dasharray or a specific class, or count of <line> increases)
    const svg = await page.locator('svg');
    const lineCountBefore = await svg.locator('line').count();
    await gridToggle.uncheck();
    const lineCountAfter = await svg.locator('line').count();
    expect(lineCountBefore).toBeGreaterThan(lineCountAfter);
  });

  test('Theme/color changes are reflected in SVG', async ({ page }) => {
    await page.goto('/');
    const lineColorInput = await page.getByLabel('Line Color');
    await lineColorInput.fill('#ff0000');
    const svg = await page.locator('svg');
    // Check for a line with stroke="#ff0000"
    await expect(svg.locator('line[stroke="#ff0000"]')).toBeVisible();
  });

  test('High Contrast toggle changes style', async ({ page }) => {
    await page.goto('/');
    const contrastToggle = await page.getByLabel('High Contrast');
    await expect(contrastToggle).toBeVisible();
    await contrastToggle.check();
    // Check for a style change (e.g., background or border color)
    const svg = await page.locator('svg');
    // This is a basic check; you may want to check for a specific class or style
    await expect(svg).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  });

  test('Font size input changes style', async ({ page }) => {
    await page.goto('/');
    const fontSizeInput = await page.getByLabel('Font Size');
    await fontSizeInput.fill('32');
    // Check for a style change in the controls panel or preview (e.g., font-size)
    const controls = await page.getByText('Controls');
    await expect(controls).toHaveCSS('font-size', '32px');
  });
}); 