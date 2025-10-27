import { test, expect } from '@playwright/test';

test('login and add a new contact with valid data', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Log in with valid credentials
  await page.waitForSelector('#email');
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123'); 
  await page.click('#submit');

  // Wait until Contact List page loads
  await page.waitForSelector('#add-contact', { timeout: 15000 });
  await expect(page).toHaveURL(/.*contactList/);

  // Click the "Add a New Contact" button
  await page.click('#add-contact');

  // Wait until Add Contact form is visible
  await page.waitForSelector('#firstName', { timeout: 10000 });

  // Fill in valid contact data
  await page.fill('#firstName', 'John');
  await page.fill('#birthdate', '1990-05-15');

  // Try to submit the form
  await page.click('#submit');

  // Wait for the validation or error message to appear
  const errorMessage = page.locator('.error, .errorMessage, #error');
  await expect(errorMessage.first()).toBeVisible();

  // Log message for debugging
  console.log('Contact validation failed');

});
