const { test, expect } = require('@playwright/test');
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const CartPage = require('../pages/CartPage');

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
    const expectedPrice = await productsPage.productPrice.textContent();

    await productsPage.product1.click();
   
    const actualTitle = await prodDetailsPage.productName.textContent();
    const actualPrice = await prodDetailsPage.productPrice.textContent();
    
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");
    await expect(expectedTitle.trim()).toBe(actualTitle.trim());
    await expect(expectedPrice.trim()).toBe(actualPrice.trim());
    await expect(prodDetailsPage.productImg).toBeVisible();
    
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

test.describe('Sorting Products', () => {

    test('Sorting Products A-Z', async ({ page }) => {
            const productsPage = new ProductsPage(page);
            await productsPage.sortByNameAsc();
            await expect(productsPage.filterBtn).toHaveValue("az");
    });

    test('Sorting Products Z-A', async ({ page }) => {
            const productsPage = new ProductsPage(page);
            await productsPage.sortByNameDec();
            await expect(productsPage.filterBtn).toHaveValue("za");
    });

    test('Sorting Price low-high', async ({ page }) => {
            const productsPage = new ProductsPage(page);
            await productsPage.sortByPriceAsc();
            await expect(productsPage.filterBtn).toHaveValue("lohi");
    });

    test('Sorting Price high-low', async ({ page }) => {
            const productsPage = new ProductsPage(page);
            await productsPage.sortByPriceDec();
            await expect(productsPage.filterBtn).toHaveValue("hilo");
    });
});

test.describe('Adding products to cart', () =>{
    test('Add an item to cart', async ({ page }) => {
       const productsPage = new ProductsPage(page);
       await expect(productsPage.cartBadge).not.toBeVisible();
       await productsPage.addItemToCart();
       await expect(productsPage.removeFromCartBtn).toBeVisible();
       await expect(productsPage.cartBadge).toBeVisible();
       await expect(productsPage.cartBadge).toHaveText("1");
    });

    test('Add two items to cart', async ({ page }) => {
       const productsPage = new ProductsPage(page);
       await expect(productsPage.cartBadge).not.toBeVisible();
       await productsPage.addMultipleToCart();
       await expect(productsPage.removeFromCartBtn).toBeVisible();
       await expect(productsPage.removeFromCartBtn_2).toBeVisible();
       await expect(productsPage.cartBadge).toBeVisible();
       await expect(productsPage.cartBadge).toHaveText("2");
    });

    test('Remove item from cart', async ({ page }) => {
       const productsPage = new ProductsPage(page);
       await productsPage.addItemToCart();
       await expect(productsPage.removeFromCartBtn).toBeVisible();
       await expect(productsPage.cartBadge).toBeVisible();
       await expect(productsPage.cartBadge).toHaveText("1");
       await await productsPage.removeItemFromCart();
       await expect(productsPage.cartBadge).not.toBeVisible();
       await expect(productsPage.addToCart).toBeVisible();
    });

    test('Cart icon is visible', async ({ page }) => {
       const productsPage = new ProductsPage(page);
       await expect(productsPage.cartBtn).toBeVisible();
    });

    test('When cart icon is clicked cart page opens', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.cartBtn.click();
        const cartPage = new CartPage(page);
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        await expect(cartPage.title).toHaveText("Your Cart");
    });
});