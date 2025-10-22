import { test, expect } from '@playwright/test';

test('should log in and log out successfully', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Login
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait until contact list is visible
  await page.waitForSelector('#add-contact');
  await expect(page).toHaveURL(/.*contactList.*/);

  // Click logout
  await page.click('#logout');

  // Confirm logout by checking login fields are visible again
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
});

