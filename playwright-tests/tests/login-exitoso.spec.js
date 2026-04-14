// tests/login-exitoso.spec.js
const { test, expect } = require('@playwright/test');

test('Login exitoso con usuario estándar', async ({ page }) => {
  // 1. Navegar a la página de login
  await page.goto('https://www.saucedemo.com');
  
  // 2. Completar campos
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  
  // 3. Hacer clic en login
  await page.click('#login-button');
  
  // 4. VERIFICACIÓN (assertion): la URL cambió a inventory.html
  await expect(page).toHaveURL(/.*inventory.html/);
  
  // 5. Verificación adicional: el título de la página es visible
  const titulo = page.locator('.title');
  await expect(titulo).toHaveText('Products');
});