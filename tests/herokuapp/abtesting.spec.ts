import { test, expect } from '@playwright/test';

test('Validar A/B Testing', async ({ page }) => {
  // Access the page 
  await page.goto('https://the-internet.herokuapp.com/');

  // Click on A/B Testing
  await page.click('text=A/B Testing');

  // Check title
  const titulo = page.locator('h3'); //Title
  await expect(titulo).toHaveText(/A\/B Test/);

  // Check title
  const paragrafo = page.locator('div.example > p');
  await expect(paragrafo).toBeVisible();
});
