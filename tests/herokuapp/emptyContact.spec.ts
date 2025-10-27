import { test, expect } from '@playwright/test';

test('should show empty contact list message (feature not implemented)', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Login with valid credentials
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait until the contact list page loads
  await page.waitForURL('**/contactList');

  // Try to detect an "empty list" message 
  const emptyMessage = page.locator('text=No contacts found');

});
