const { test, expect } = require('@playwright/test');
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');

test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsStandardUser();
    });

test('All Items are visible on products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const product = await productsPage.getAllProducts();

    for (const locator of product) {
        await expect(locator).toBeVisible();
    }
});

test('Open details page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const prodDetailsPage = new ProductDetailPage(page);

    const expectedTitle = await productsPage.product1.textContent();

    await productsPage.product1.click();
   
    const actualTitle = await prodDetailsPage.productName.textContent();
    
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");
    expect(expectedTitle.trim()).toBe(actualTitle.trim());
    
});