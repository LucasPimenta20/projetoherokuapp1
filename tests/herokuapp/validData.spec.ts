import { test, expect } from '@playwright/test';

test('sign up with valid data', async ({ page }) => {
  // Access page 
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Wait for the Sign up button and click
  await page.waitForSelector('#signup', { timeout: 10000 });
  await page.click('#signup');

  // Wait for the registration page
  await page.waitForURL('**/addUser', { timeout: 10000 });
  await expect(page).toHaveURL(/.*addUser/);

  // Generate a random email with Math.random
  const randomEmail = `lucas${Math.floor(Math.random() * 100000)}@example.com`;

  // Complete form
  await page.fill('#firstName', 'Lucas');
  await page.fill('#lastName', 'Pimenta');
  await page.fill('#email', randomEmail);
  await page.fill('#password', 'Password123!');

  // Send form
  await page.click('#submit');

  // Wait for redirection to contact list
  await page.waitForURL('**/contactList', { timeout: 15000 });
  await expect(page).toHaveURL(/.*contactList/);
});
