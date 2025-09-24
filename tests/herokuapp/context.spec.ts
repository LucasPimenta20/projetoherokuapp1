import { test, expect } from '@playwright/test';

test('test context menu', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Context Menu');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/context_menu'); // Verify that the correct URL was loaded
  await expect(page.locator('h3')).toHaveText('Context Menu');  // Verify the page header text
  page.once('dialog', async dialog => { // Listen for the alert dialog 
    expect(dialog.message()).toBe('You selected a context menu'); // Validate alert message
    await dialog.accept(); // Accept the alert
  });

  // Perform a right-click on the hotspot area
  await page.click('#hot-spot', { button: 'right' });
});
