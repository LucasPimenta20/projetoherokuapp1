import { test, expect } from '@playwright/test';

test('Validar A/B Testing', async ({ page }) => {
  //Acessar a página 
  await page.goto('https://the-internet.herokuapp.com/');

  //Clicar em A/B Testing
  await page.click('text=A/B Testing');

  //Verificar o título
  const titulo = page.locator('h3'); //Título
  await expect(titulo).toHaveText(/A\/B Test/);

  //Verificar o texto
  const paragrafo = page.locator('div.example > p');
  await expect(paragrafo).toBeVisible();
});
