import { test, expect } from '@playwright/test';

test('test javaScript alerts', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=JavaScript Alerts');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');
  await expect(page.locator('h3')).toHaveText('JavaScript Alerts');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });
  await page.click('text=Click for JS Alert');
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept();
  });
  await page.click('text=Click for JS Confirm');
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.dismiss();
  });
  await page.click('text=Click for JS Confirm');
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS prompt');
    await dialog.accept('Playwright');
  });
  await page.click('text=Click for JS Prompt');
  await expect(page.locator('#result')).toHaveText('You entered: Playwright');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS prompt');
    await dialog.dismiss();
  });
  await page.click('text=Click for JS Prompt');
  await expect(page.locator('#result')).toHaveText('You entered: null');
});
