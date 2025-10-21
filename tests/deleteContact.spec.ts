import { test, expect } from '@playwright/test';

test('should delete an existing contact successfully', async ({ page }) => {
  // Access page
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // Log in with valid credentials
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait for contact list page to load
  await page.waitForURL('**/contactList', { timeout: 15000 });
  await expect(page.locator('#add-contact')).toBeVisible();

  // Wait for at least one contact in the list
  const contactList = page.locator('.contacts');
  await contactList.first().waitFor({ state: 'visible', timeout: 15000 });

  // Click on the first contact to open its details
  const firstContactName = await contactList.first().innerText();
  await contactList.first().click();

  // Wait for the contact details page
  await page.waitForURL('**/contactDetails', { timeout: 10000 });
  await expect(page.locator('#delete')).toBeVisible();

  // Click on "Delete" button
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  await page.click('#delete');

  // Wait to return to the contact list page
  await page.waitForURL('**/contactList', { timeout: 10000 });

  // Validate that the contact was deleted (name should no longer be in list)
  const contactNames = await contactList.allInnerTexts();
  expect(contactNames).not.toContain(firstContactName);

  // Log message in console
  console.log(`Contato "${firstContactName}" deletado com sucesso!`);
});
