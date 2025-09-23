import { test, expect } from '@playwright/test';

//Teste pagina "Redirect Link"
test('Redirect Link - Clicar em "here"', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/'); 
  await page.click('text=Redirect Link');
  await page.click('text=here');
  await expect(page).toHaveURL(/status_codes/);
});

//Teste página 200
test('Redirect Link - Verificar status 200', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/redirector');
  await page.click('text=here');
  await page.click('text=200');
  await expect(page.locator('p')).toHaveText(/This page returned a 200 status code/);
});

//Teste página 301
test('Redirect Link - Verificar status 301', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/redirector');
  await page.click('text=here');
  await page.click('text=301');
  await expect(page.locator('p')).toHaveText(/This page returned a 301 status code/);
});

//Teste página 404
test('Redirect Link - Verificar status 404', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/redirector');
  await page.click('text=here');
  await page.click('text=404');
  await expect(page.locator('p')).toHaveText(/This page returned a 404 status code/);
});

//Teste página 500
test('Redirect Link - Verificar status 500', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/redirector');
  await page.click('text=here');
  await page.click('text=500');
  await expect(page.locator('p')).toHaveText(/This page returned a 500 status code/);
});
