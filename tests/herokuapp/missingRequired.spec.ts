import { test, expect } from '@playwright/test';

test('should show error when adding a contact with a required field missing', async ({ page }) => {
  // Step 1: Go to login page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Step 2: Log in with valid credentials
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Step 3: Wait for contact list page
  await page.waitForURL('**/contactList', { timeout: 15000 });
  await expect(page.locator('#add-contact')).toBeVisible();

  // Step 4: Click "Add Contact"
  await page.click('#add-contact');

  // Step 5: Wait for Add Contact form to appear
  await page.waitForSelector('#add-contact-form', { timeout: 10000 }).catch(() => {}); // fallback
  await page.waitForSelector('#lastName', { timeout: 10000 });

  // Step 6: Fill the form, but **omit a required field** (first name)
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

  // Step 7: Try to submit the form
  await page.click('#submit');

  // Step 8: Validate that an error message appears
 const errorMessage = page.locator('#error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Contact validation failed/i);;
});
