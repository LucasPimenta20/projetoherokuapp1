import { test, expect } from '@playwright/test';

test('login with wrong password should show authentication error', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Wait for the login fields to be visible
  await page.waitForSelector('#email', { timeout: 10000 });
  await page.waitForSelector('#password', { timeout: 10000 });

  // Fill in a existing email and an incorrect password
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'WrongPassword123!'); 

  // Click the submit button
  await page.click('#submit');

  // Locate the error message container
  const errorMessage = page.locator('#error');
  await expect(errorMessage).toBeVisible();

  // Assert the error message
  await expect(errorMessage).toHaveText(/invalid|incorrect|wrong|authentication|credentials/i);
});
