import { test, expect } from '@playwright/test';

test('should edit an existing contact and update the phone number', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Log in with valid credentials
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait for contact list page to load
  await page.waitForURL('**/contactList', { timeout: 15000 });
  await expect(page.locator('#add-contact')).toBeVisible();

  // Wait until at least one contact appears in the list
  const contactList = page.locator('.contacts');
  await contactList.first().waitFor({ state: 'visible', timeout: 15000 });

  // Click on the first contact
  await contactList.first().click();

  // Wait for the contact details page
  await page.waitForURL('**/contactDetails', { timeout: 10000 });
  await expect(page.locator('#edit-contact')).toBeVisible();

  // Click the "Edit Contact" button
  await page.click('#edit-contact');

  // Wait for the edit page to appear
  await page.waitForURL('**/editContact', { timeout: 10000 });
  await expect(page.locator('h1')).toHaveText('Edit Contact');

  // Update the phone number
  const phoneField = page.locator('#phone');
  await phoneField.waitFor({ state: 'visible' });
  await phoneField.fill('5559876543');

  // Save changes
  await page.click('#submit');

  // Wait to return to the contact details page
  await page.waitForURL('**/contactDetails', { timeout: 10000 });

  // Validate that the phone number was updated successfully
  const phoneText = page.locator('p').filter({ hasText: 'Phone:' });
  await expect(phoneText).toContainText('5559876543');

  // Go back to contact list
  await page.click('#return');
  await expect(page).toHaveURL(/contactList/);
});
