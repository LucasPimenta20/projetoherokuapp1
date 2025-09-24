import { test, expect } from '@playwright/test';

test('test input', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Inputs');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/inputs'); // Verify that the correct URL was loaded
  await expect(page.locator('h3')).toHaveText('Inputs'); // Verify that the page header is correct
  const input = page.locator('input[type="number"]'); // Locate the input field of type number
  await input.fill('155');  // Fill the input field with the value "155"
  await expect(input).toHaveValue('155');  // Verify that the input field contains the correct value
});

