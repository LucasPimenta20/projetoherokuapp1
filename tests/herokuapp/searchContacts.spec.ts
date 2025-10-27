import { test, expect } from '@playwright/test';

test.skip('should display only contacts that match the search term', async ({ page }) => {
  // Access page 
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.fill('#email', 'lucas20@gmail.com');
  await page.fill('#password', 'test123');
  await page.click('#submit');

  // Wait for the contact list page 
  await page.waitForURL('**/contactList', { timeout: 15000 });
  await expect(page.locator('#add-contact')).toBeVisible();

  // Make sure there is at least one contact in the list
  const contactList = page.locator('.contacts');
  await contactList.first().waitFor({ state: 'visible', timeout: 15000 });

  // Capture part of the first contact’s name to use as a search term
  const firstContactName = await contactList.first().innerText();
  const searchTerm = firstContactName.slice(0, 3); // use the first 3 letters
  console.log(`🔍 Using search term: "${searchTerm}"`);

  // Locate the search input field and type the search term
  const searchInput = page.locator('#search');
  await searchInput.fill(searchTerm);

  // Trigger the search
  await searchInput.press('Enter');

});
