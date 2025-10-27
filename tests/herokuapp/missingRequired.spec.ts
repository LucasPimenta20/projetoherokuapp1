import { test, expect } from '@playwright/test';

test('should show error when adding a contact with a required field missing', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Log in with valid credentials
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait for contact list page
  await page.waitForURL('**/contactList', { timeout: 15000 });
  await expect(page.locator('#add-contact')).toBeVisible();

  // Click "Add Contact"
  await page.click('#add-contact');

  // Wait for Add Contact form to appear
  await page.waitForSelector('#add-contact-form', { timeout: 10000 }).catch(() => {});
  await page.waitForSelector('#lastName', { timeout: 10000 });

  // Fill the form, but **omit a required field** (first name)
  await page.fill('#lastName', 'Pimenta');
  await page.fill('#birthdate', '1990-05-15');
  await page.fill('#email', `john${Math.floor(Math.random() * 10000)}@example.com`);
  await page.fill('#phone', '5551234567');
  await page.fill('#street1', '123 Main Street');
  await page.fill('#street2', 'Apt 4B');
  await page.fill('#city', 'New York');
  await page.fill('#stateProvince', 'NY');
  await page.fill('#postalCode', '10001');
  await page.fill('#country', 'United States');

  // Try to submit the form
  await page.click('#submit');

  // Validate that an error message appears
 const errorMessage = page.locator('#error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Contact validation failed/i);;
});
