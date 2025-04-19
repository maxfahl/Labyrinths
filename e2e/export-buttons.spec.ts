import { expect, test } from '@playwright/test';

test.describe('Export & Print feature', () => {
  test('Export SVG button triggers file download', async ({ page }) => {
    await page.goto('/');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Export SVG/i }).click(),
    ]);
    const suggested = download.suggestedFilename();
    expect(suggested).toMatch(/maze\.svg$/);
  });

  test('Export PNG button triggers file download', async ({ page }) => {
    await page.goto('/');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Export PNG/i }).click(),
    ]);
    const suggested = download.suggestedFilename();
    expect(suggested).toMatch(/maze\.png$/);
  });

  test('Export PDF button triggers file download', async ({ page }) => {
    await page.goto('/');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Export PDF/i }).click(),
    ]);
    const suggested = download.suggestedFilename();
    expect(suggested).toMatch(/maze\.pdf$/);
  });

  test('Print button opens new window for print', async ({ page, context }) => {
    await page.goto('/');
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: /Print/i }).click(),
    ]);
    await expect(popup).not.toBeNull();
    await popup.close();
  });
}); 