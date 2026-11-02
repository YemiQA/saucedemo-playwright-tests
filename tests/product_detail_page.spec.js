const { test, expect } = require('@playwright/test');
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsStandardUser();
});

test('User can go back to products list from product details page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    productsPage.product1.click();
    await expect (productDetailPage.backToProductsBtn).toBeVisible();
    await productDetailPage.backToProductsBtn.click();
    await expect(productsPage.title).toHaveText("Products");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});