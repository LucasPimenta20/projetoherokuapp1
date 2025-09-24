import { test, expect } from '@playwright/test';

test('validate Remove and Add in Dynamic Controls', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Dynamic Controls');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls');  // Verify that the correct URL was loaded
  await expect(page.locator('h4:has-text("Dynamic Controls")')).toHaveText('Dynamic Controls'); // Verify that the page header is correct
  const checkboxButton = page.locator('button', { hasText: 'Remove' });  // Locate the "Remove" button

  // Locate the message element that appears after actions
  const message = page.locator('#message');
  await checkboxButton.click(); // Click "Remove" and check the confirmation message
  await expect(message).toHaveText("It's gone!");
  const addButton = page.locator('button', { hasText: 'Add' });  // Locate the "Add" button (appears after removing)
  await addButton.click();   // Click Add and check the confirmation message
  await expect(message).toHaveText("It's back!");
});
