class CompletePage{

    constructor(page){
        this.page = page;
        this.confirmationMessage = page.locator(".complete-header");
        this.dispatchMessage = page.locator(".complete-text");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.backHomeBtn = page.locator("#back-to-products");
        this.generatePDF = page.locator('[data-test="generate-pdf-order"]');
    }
}
module.exports = CompletePage;