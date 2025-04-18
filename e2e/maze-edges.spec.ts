import { expect, test } from '@playwright/test';

test.describe('Maze edge start/end positions', () => {
  const edgeOptions = [
    { value: 'top', label: 'Top Edge' },
    { value: 'right', label: 'Right Edge' },
    { value: 'bottom', label: 'Bottom Edge' },
    { value: 'left', label: 'Left Edge' },
  ];

  for (const start of edgeOptions) {
    for (const end of edgeOptions) {
      test(`select start=${start.label} and end=${end.label} updates maze`, async ({ page }) => {
        await page.goto('/');
        const startSelect = await page.getByLabel('Start Position');
        const endSelect = await page.getByLabel('End Position');
        await expect(startSelect).toBeVisible();
        await expect(endSelect).toBeVisible();
        await startSelect.selectOption(start.value);
        await endSelect.selectOption(end.value);
        // Check that the SVG maze preview exists and is not empty
        const svg = await page.getByRole('img', { name: 'Maze Preview' });
        await expect(svg).toBeVisible();
        await expect(await svg.innerHTML()).not.toEqual('');
      });
    }
  }
}); 