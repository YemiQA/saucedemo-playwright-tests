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
    const productPage = new ProductsPage(page);
    await productPage.addItemToCart();
    await productPage.cartBtn.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutBtn.click();
    const checkoutInfo = new CheckoutInformationPage(page);
    await checkoutInfo.validInfo();
    const checkoutOverview = new CheckoutOverviewPage(page);
    await checkoutOverview.finishBtn.click();
});

test('Back home button is visible', async ({ page }) => {
    const completePage = new CompletePage(page);
    await expect(completePage.backHomeBtn).toBeVisible();
});

test('Generate PDF button is visible', async ({ page }) => {
    const completePage = new CompletePage(page);
    await expect(completePage.generatePDF).toBeVisible();
});

test('Back home button routes back to products page', async ({ page }) => {
    const completePage = new CompletePage(page);
    await expect(completePage.backHomeBtn).toBeVisible();
    await completePage.backHomeBtn.click();
    await expect(page).toHaveURL(/inventory/)
});

test('Generate PDF button downloads order details in a file', async ({ page }) => {
    const completePage = new CompletePage(page);
    await expect(completePage.generatePDF).toBeVisible();
    await completePage.generatePDF.click();
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;

    const fileName = download.suggestedFilename();
    expect(fileName.endsWith('.pdf')).toBe(true);
});