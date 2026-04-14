// tests/login-fallido.spec.js
const { test, expect } = require('@playwright/test');

test('Login fallido muestra mensaje de error', async ({ page }) => {
  // 1. Navegar a la página de login
  await page.goto('https://www.saucedemo.com');
  
  // 2. Completar con credenciales inválidas
  await page.fill('#user-name', 'usuario_invalido');
  await page.fill('#password', 'contraseña_incorrecta');
  
  // 3. Intentar login
  await page.click('#login-button');
  
  // 4. VERIFICACIÓN: aparece el mensaje de error
  const mensajeError = page.locator('[data-test="error"]');
  await expect(mensajeError).toBeVisible();
  await expect(mensajeError).toContainText('Username and password do not match');
  
  // 5. Verificar que NO redirige a inventory
  await expect(page).not.toHaveURL(/.*inventory.html/);
});