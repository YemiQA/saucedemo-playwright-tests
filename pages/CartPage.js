class CartPage{

    constructor(page){
        this.page = page;
        this.title = page.locator(".title");
        this.continueShoppingBtn = page.locator("#continue-shopping");
        this.checkoutBtn = page.locator('#checkout');
        this.cartItems = page.locator(".cart_item");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.inventoryName = page.locator(".inventory_item_name");
        this.inventoryDescription = page.locator(".inventory_item_desc");
        this.inventoryPrice = page.locator(".inventory_item_price");
        this.cartQuantity = page.locator('[data-test="item-quantity"]');
        //this.product1RemoveBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.removeBtn = page.locator(".btn.btn_secondary.btn_small.cart_button");
        
        
    }
}
module.exports = CartPage;