import { test, expect } from '@playwright/test';

test('sign up with an existing email should show error message', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Go to Sign up
  await page.waitForSelector('#signup', { timeout: 10000 });
  await page.click('#signup');
  await page.waitForURL('**/addUser', { timeout: 10000 });

  // Fill out the form with an email that has been used before
  const existingEmail = 'lucas20@example.com';
  await page.fill('#firstName', 'Lucas');
  await page.fill('#lastName', 'Pimenta');
  await page.fill('#email', existingEmail);
  await page.fill('#password', 'SenhaForte123!');
  await page.click('#submit');

  // Wait for the error message to appear
  const errorMessage = page.locator('#error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Email address is already in use/i);
});
