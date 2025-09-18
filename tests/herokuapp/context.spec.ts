import { test, expect } from '@playwright/test';

test('test context menu', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Context Menu');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/context_menu');
  await expect(page.locator('h3')).toHaveText('Context Menu');
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('You selected a context menu');
    await dialog.accept();
  });
  await page.click('#hot-spot', { button: 'right' });
});