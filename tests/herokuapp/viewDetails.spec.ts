import { test, expect } from '@playwright/test';

test('should view details of an existing contact', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Login with valid credentials
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait until redirected to the contact list page
  await page.waitForURL('**/contactList');

  // Click on the first contact in the list 
  const firstContact = page.locator('.contacts').first();
  await firstContact.click();

  // Wait for the contact details page to load
  await page.waitForURL('**/contactDetails');

  // Verify that the contact's details are visible
  await expect(page.locator('#firstName')).toBeVisible();
  await expect(page.locator('#lastName')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  const name = await page.locator('#firstName').textContent();
  console.log(`Opened contact details for: ${name?.trim()}`);
});
