import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Wait for the login fields to appear
  await page.waitForSelector('#email', { timeout: 10000 });
  await page.waitForSelector('#password', { timeout: 10000 });

  // Fill in valid email and password
  await page.fill('#email', 'lucas20@gmail.com'); 
  await page.fill('#password', 'test123'); 

  // Click on "Submit"
  await page.click('#submit');

  // Check redirection to contact list
  await page.waitForURL('**/contactList', { timeout: 10000 });
  await expect(page).toHaveURL(/.*contactList/);

  // Validate that the "Contact List" title is visible
  await expect(page.locator('h1')).toHaveText('Contact List');
});
