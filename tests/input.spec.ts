import { test, expect } from '@playwright/test';

test('test input', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Inputs');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/inputs');
  await expect(page.locator('h3')).toHaveText('Inputs');
  const input = page.locator('input[type="number"]');
  await input.fill('155');
  await expect(input).toHaveValue('155');
});
