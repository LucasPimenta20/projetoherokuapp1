import { test, expect } from '@playwright/test';

test('Validar seleção no Dropdown', async ({ page }) => {

  // Access the page
  await page.goto('https://the-internet.herokuapp.com/');

  // Click on Dropdown
  await page.click('text=Dropdown');

  // Option 1
  await page.selectOption('#dropdown', '1'); //  Select 1
  await expect(page.locator('#dropdown')).toHaveValue('1');

  // Option 2
  await page.selectOption('#dropdown', '2'); // Select 2
  await expect(page.locator('#dropdown')).toHaveValue('2');
});
