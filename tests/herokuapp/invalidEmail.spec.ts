import { test, expect } from '@playwright/test';

test('sign up with invalid email format should show error message', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Go to Sign up
  await page.waitForSelector('#signup', { timeout: 10000 });
  await page.click('#signup');
  await page.waitForURL('**/addUser', { timeout: 10000 });

  // Fill out the form with an invalid email address
  await page.fill('#firstName', 'Lucas');
  await page.fill('#lastName', 'Pimenta');
  await page.fill('#email', 'lucas@test');
  await page.fill('#password', 'SenhaForte123!');
  await page.click('#submit');

  // Wait and check for error message
  const errorMessage = page.locator('#error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Email is invalid/i);
});
