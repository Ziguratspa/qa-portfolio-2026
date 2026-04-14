// tests/agregar-carrito.spec.js
const { test, expect } = require('@playwright/test');

test('Agregar un producto al carrito y verificar que está allí', async ({ page }) => {
  // 1. Login primero
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // 2. Verificar que estamos en inventory
  await expect(page).toHaveURL(/.*inventory.html/);
  
  // 3. Agregar la mochila al carrito
  const botonAgregar = page.locator('#add-to-cart-sauce-labs-backpack');
  await botonAgregar.click();
  
  // 4. VERIFICACIÓN: el botón cambió a "Remove"
  await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
  
  // 5. Ir al carrito
  await page.click('.shopping_cart_link');
  
  // 6. VERIFICACIÓN FINAL: el producto está en el carrito
  await expect(page).toHaveURL(/.*cart.html/);
  const productoEnCarrito = page.locator('.cart_item');
  await expect(productoEnCarrito).toContainText('Sauce Labs Backpack');
  
  // 7. Verificar que el precio es visible
  const precio = page.locator('.inventory_item_price');
  await expect(precio).toContainText('29.99');
});