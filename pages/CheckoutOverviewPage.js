class CheckoutOverview{
    constructor(page){
        this.page = page;
        this.title= page.locator(".title");
        this.inventoryItemName = page.locator(".inventory_item_name");
        this.inventoryItemDescription = page.locator(".inventory_item_desc");
        this.inventoryItemPrice = page.locator(".item_pricebar");
        this.quantity = page.locator('[data-test="item-quantity"]');
        this.paymentInfo = page.locator('[data-test="payment-info-value"]');
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
        this.subtotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.cancelBtn = page.locator("#cancel");
        this.finishBtn = page.locator("#finish");
    }

    async getItemTotal(){
        const subtotal = await this.subtotal.nth(0).innerText();
        return parseFloat(subtotal.replace(/[^0-9.]/g, ''));
    }

    async getTax(){
        const tax = await this.tax.nth(0).innerText();
        return parseFloat(tax.replace(/[^0-9.]/g, ''));
    }

    async getTotalPrice(){
        const total = await this.totalPrice.nth(0).innerText();
        return parseFloat(total.replace(/[^0-9.]/g, ''));
    }
}
module.exports = CheckoutOverview;