class ProductDetailPage {
    constructor(page) {
        this.backToProductsBtn = page.locator("#back-to-products");
        this.productName = page.locator(".inventory_details_name.large_size");
        this.productImg = page.locator("img[alt='Sauce Labs Backpack']");
        this.productDescription = page.locator(".inventory_details_desc.large_size");
        this.productPrice = page.locator(".inventory_details_price");
        this.addToCartBtn= page.locator("#add-to-cart");
        this.removeFromCartBtn = page.locator("#remove");
    }
}
module.exports = ProductDetailPage;