const { test, expect } = require('@playwright/test');
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutInformationPage = require('../pages/CheckoutInformationPage');
const CheckoutOverviewPage = require('../pages/CheckoutOverviewPage');
const CompletePage = require('../pages/CompletePage');

test.beforeEach(async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsStandardUser();
    await expect(page).toHaveURL(/inventory/)
    const productPage = new ProductsPage(page);
    await productPage.addItemToCart();
    await productPage.cartBtn.click();
    await expect(page).toHaveURL(/cart/)
    const cartPage = new CartPage(page);
    await cartPage.checkoutBtn.click();
    await expect(page).toHaveURL(/checkout-step-one/);
});

test('Checkout page is displayed', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await expect(checkoutInfo.title).toHaveText("Checkout: Your Information");
});

test("Checkout form is visible", async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await expect(checkoutInfo.firstName).toBeVisible();
    await expect(checkoutInfo.lastName).toBeVisible();
    await expect(checkoutInfo.postCode).toBeVisible();
    await expect(checkoutInfo.cancelBtn).toBeVisible();
    await expect(checkoutInfo.continueBtn).toBeVisible();
});

test("Leave first name field empty", async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.emptyFirstName();
    await expect(checkoutInfo.errorMessage).toBeVisible();
    await expect(checkoutInfo.errorMessage).toHaveText("Error: First Name is required");
    
});

test("Leave last name field empty", async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.emptyLastName();
    await expect(checkoutInfo.errorMessage).toBeVisible();
    await expect(checkoutInfo.errorMessage).toHaveText("Error: Last Name is required");
    
});

test("Leave post code field empty", async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.emptyPostCode();
    await expect(checkoutInfo.errorMessage).toBeVisible();
    await expect(checkoutInfo.errorMessage).toHaveText("Error: Postal Code is required");
    
});

test("Complete checkout form", async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    await expect(page).toHaveURL(/checkout-step-two/);
    
});

test('Cancel button routes back to cart', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.cancelBtn.click();
    await expect(page).toHaveURL(/cart/);
});

test('Continue button routes to overview', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    await expect(page).toHaveURL(/checkout-step-two/);
});

test('Checkout overview displays products selected', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();;
    const checkoutOverview = new CheckoutOverviewPage(page);
    await expect(checkoutOverview.inventoryItemName).toBeVisible();
    await expect(checkoutOverview.inventoryItemDescription).toBeVisible();
    await expect(checkoutOverview.inventoryItemPrice).toBeVisible();
});

test('Quantity is visible at checkout', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();;
    const checkoutOverview = new CheckoutOverviewPage(page);
    await expect(checkoutOverview.quantity).toBeVisible();
});

test('Payment information is visible', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();;
    const checkoutOverview = new CheckoutOverviewPage(page);
    await expect(checkoutOverview.paymentInfo).toBeVisible();
    await expect(checkoutOverview.paymentInfo).toHaveText("SauceCard #31337");
});

test('Shipping information is visible', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();;
    const checkoutOverview = new CheckoutOverviewPage(page);
    await expect(checkoutOverview.shippingInfo).toBeVisible();
    await expect(checkoutOverview.shippingInfo).toHaveText("Free Pony Express Delivery!");
});

test('Expected Tax', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    const checkoutOverview = new CheckoutOverviewPage(page);
    
    const itemTotal = await checkoutOverview.getItemTotal();
    const actualTax = await checkoutOverview.getTax();
    
    const expectedTax = Math.round((itemTotal * 0.08) * 100) / 100;

    expect(actualTax).toBeGreaterThan(0);
    expect(actualTax).toBe(expectedTax);
});

test('Prices are visible', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    const checkoutOverview = new CheckoutOverviewPage(page);
    
    const itemTotal = await checkoutOverview.getItemTotal();
    const actualTax = await checkoutOverview.getTax();
    const totalPrice = await checkoutOverview.getTotalPrice();
    const expectedTotal = itemTotal + actualTax;

    await expect(totalPrice).toBe(expectedTotal);
    await expect(checkoutOverview.subtotal).toBeVisible();
    await expect(checkoutOverview.tax).toBeVisible();
    await expect(checkoutOverview.totalPrice).toBeVisible();
});

test('Cancel button routes back to products page', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    const checkoutOverview = new CheckoutOverviewPage(page);
    await checkoutOverview.cancelBtn.click();
    await expect(page).toHaveURL(/inventory/);
});

test('Finsih button routes to complete page', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    const checkoutOverview = new CheckoutOverviewPage(page);
    await checkoutOverview.finishBtn.click();
    await expect(page).toHaveURL(/checkout-complete/);
});

test('Success message', async ({ page }) => {
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    const checkoutOverview = new CheckoutOverviewPage(page);
    await checkoutOverview.finishBtn.click();
    const completePage = new CompletePage(page);
    await expect(completePage.confirmationMessage).toHaveText("Thank you for your order!");
    await expect(completePage.dispatchMessage).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    await expect(completePage.cartBadge).not.toBeVisible();
});