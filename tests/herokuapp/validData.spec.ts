import { test, expect } from '@playwright/test';

test('sign up with valid data', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Wait for the sign up button to load
  await page.waitForSelector('#signup', { timeout: 10000 });

  // Click on button
  await page.click('#signup');

  // Wait for the registration page
  await page.waitForURL('**/addUser', { timeout: 10000 });
  await expect(page).toHaveURL(/.*addUser/);

  // Preencher o formulário
  await page.fill('#firstName', 'Lucas');
  await page.fill('#lastName', 'Pimenta');
  await page.fill('#email', `lucas${Date.now()}@example.com`);
  await page.fill('#password', 'SenhaForte123!');

  // Send form
  await page.click('#submit');

  // Wait redirection for contactlist
  await page.waitForURL('**/contactList', { timeout: 15000 });
  await expect(page).toHaveURL(/.*contactList/);
});