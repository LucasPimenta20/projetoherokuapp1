import { test, expect } from '@playwright/test';

test('test javaScript alerts', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=JavaScript Alerts');   // Click on the "JavaScript Alerts" link
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');   // Verify that the correct URL was loaded
  await expect(page.locator('h3')).toHaveText('JavaScript Alerts');   // Verify the page header text

  // Listen for the first alert dialog and accept it
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Alert'); // Verify alert message
    await dialog.accept(); // Accept the alert
  });
  await page.click('text=Click for JS Alert');
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

  // Listen for the confirm dialog and accept it
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept(); // Click "OK"
  });
  await page.click('text=Click for JS Confirm');
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');

  // Listen for the confirm dialog and dismiss it
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.dismiss(); // Click "Cancel"
  });
  await page.click('text=Click for JS Confirm');
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');

  // Listen for the prompt dialog, enter text, and accept
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS prompt');
    await dialog.accept('Playwright'); // Enter text into the prompt
  });
  await page.click('text=Click for JS Prompt');
  await expect(page.locator('#result')).toHaveText('You entered: Playwright');

  // Listen for the prompt dialog and dismiss it
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS prompt');
    await dialog.dismiss(); // Close without entering anything
  });
  await page.click('text=Click for JS Prompt');
  await expect(page.locator('#result')).toHaveText('You entered: null');
});
