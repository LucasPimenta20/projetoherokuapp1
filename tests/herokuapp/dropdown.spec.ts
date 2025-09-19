import { test, expect } from '@playwright/test';

test('Validar seleção no Dropdown', async ({ page }) => {

  //Acessar a página
  await page.goto('https://the-internet.herokuapp.com/');

  //Clicar em Dropdown
  await page.click('text=Dropdown');

  //Opção 1
  await page.selectOption('#dropdown', '1'); //Selecionar 1
  await expect(page.locator('#dropdown')).toHaveValue('1');

  //Opção 2
  await page.selectOption('#dropdown', '2'); //Selecionar 2
  await expect(page.locator('#dropdown')).toHaveValue('2');
});
