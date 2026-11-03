const { test, expect } = require('@playwright/test');
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutInformationPage = require('../pages/CheckoutInformationPage');

test.beforeEach(async( { page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.loginAsStandardUser();
});

test('Empty cart is displayed correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.cartBtn.click();

    const cartPage = new CartPage(page);

    await expect(cartPage.cartBadge).not.toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.continueShoppingBtn).toBeVisible();
    await expect(cartPage.checkoutBtn).toBeVisible();
});

test('Products are visible in cart', async({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addItemToCart();
    await productsPage.cartBtn.click();

    const cartPage = new CartPage(page);

    await expect(cartPage.inventoryName.nth(0)).toBeVisible();
    await expect(cartPage.inventoryDescription.nth(0)).toBeVisible();
    await expect(cartPage.inventoryPrice.nth(0)).toBeVisible();
});

test('Multiple products are visible in cart', async({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addMultipleToCart();
    await productsPage.cartBtn.click();

    const cartPage = new CartPage(page);

    await expect(cartPage.cartItems).toHaveCount(2);

    await expect(cartPage.inventoryName.nth(0)).toBeVisible();
    await expect(cartPage.inventoryDescription.nth(0)).toBeVisible();
    await expect(cartPage.inventoryPrice.nth(0)).toBeVisible();

    await expect(cartPage.inventoryName.nth(1)).toBeVisible();
    await expect(cartPage.inventoryDescription.nth(1)).toBeVisible();
    await expect(cartPage.inventoryPrice.nth(1)).toBeVisible();
});

test('Item quantity is visible', async ({ page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addMultipleToCart();
    await productsPage.cartBtn.click();

    const cartPage = new CartPage(page);
    await expect(cartPage.cartQuantity.nth(0)).toHaveText("1");
    await expect(cartPage.cartQuantity.nth(1)).toHaveText("1");
});

test('Product can be removed from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addMultipleToCart();
    await productsPage.cartBtn.click();

    const cartPage = new CartPage(page);
    const product = await cartPage.inventoryName.nth(0).textContent();

    await expect(cartPage.cartBadge).toHaveText("2");

    await cartPage.removeBtn.nth(0).click();

    await expect(cartPage.inventoryName.nth(0)).not.toHaveText(product);
    await expect(cartPage.cartBadge).toHaveText("1");
});

test('No badge when cart is empty', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addItemToCart();
    await productsPage.cartBtn.click();
    const cartPage = new CartPage(page);
    await expect(cartPage.cartBadge).toHaveText("1");
    await cartPage.removeBtn.nth(0).click();
    await expect(cartPage.cartBadge).not.toBeVisible();
});

test('Continue shopping button routes backs to product page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.cartBtn.click()
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    const cartPage = new CartPage(page);
    await cartPage.continueShoppingBtn.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test('Checkout button is visible', async ({ page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addItemToCart();
    await productsPage.cartBtn.click();
    const cartPage = new CartPage(page);
    await expect(cartPage.checkoutBtn).toBeVisible();
});

test('Checkout button routes to checkout page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addItemToCart();
    await productsPage.cartBtn.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutBtn.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
});

test('products stay in cart after leaving checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addItemToCart();
    await productsPage.cartBtn.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutBtn.click();
    const checkoutPage = new CheckoutInformationPage(page);
    await checkoutPage.cancelBtn.click();
    await expect(cartPage.cartItems).toBeVisible();

});