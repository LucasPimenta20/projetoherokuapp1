import { test, expect } from '@playwright/test';

test('validar Remove e Add em Dynamic Controls', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Dynamic Controls');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls');
  await expect(page.locator('h4:has-text("Dynamic Controls")')).toHaveText('Dynamic Controls');

  const checkboxButton = page.locator('button', { hasText: 'Remove' });
  const message = page.locator('#message');
  await checkboxButton.click();
  await expect(message).toHaveText("It's gone!");
  const addButton = page.locator('button', { hasText: 'Add' });
  await addButton.click();
  await expect(message).toHaveText("It's back!");
});
