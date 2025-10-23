import { test, expect } from '@playwright/test';

test('should display contacts in alphabetical order (feature not implemented)', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Login with valid credentials
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait until redirected to the contact list page
  await page.waitForURL('**/contactList');

  // Get all contact names from the list
  const contactNames = await page.locator('.contactItem').allTextContents();

  // Create a sorted version of the same list (alphabetically)
  const sortedNames = [...contactNames].sort((a, b) => a.localeCompare(b));

  // Compare actual order with expected order
  await expect(contactNames).toEqual(sortedNames);
});
