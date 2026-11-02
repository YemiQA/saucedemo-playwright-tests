class ProductsPage {

    constructor(page){
        this.page = page;
        this.title = page.locator(".title");
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.closeMenuBtn = page.locator('#react-burger-cross-btn');
        this.cartBtn = page.locator("a[aria-label='Cart, empty']");
        this.filterBtn = page.locator("select[aria-label='Sort products']");
        this.allItemsBtn = page.locator('#inventory_sidebar_link');
        this.catalogBtn = page.locator('#dynamic_catalog_sidebar_link');
        this.aboutBtn = page.locator('#about_sidebar_link');
        this.logoutBtn = page.locator('#logout_sidebar_link');
        this.resetApp = page.locator('#reset_sidebar_link');
        this.product1 = page.locator("a[id='item_4_title_link'] div[class='inventory_item_name ']");
        this.product2 = page.locator("a[id='item_0_title_link'] div[class='inventory_item_name ']");
        this.product3 = page.locator("a[id='item_1_title_link'] div[class='inventory_item_name ']");
        this.product4 = page.locator("a[id='item_5_title_link'] div[class='inventory_item_name ']");
        this.product5 = page.locator("a[id='item_2_title_link'] div[class='inventory_item_name ']");
        this.product6 = page.locator("a[id='item_3_title_link'] div[class='inventory_item_name ']");
        this.addToCart = page.locator("#add-to-cart-sauce-labs-backpack");
        this.addToCart_2 = page.locator("#add-to-cart-sauce-labs-bike-light");
        this.removeFromCartBtn = page.locator("#remove-sauce-labs-backpack");
        this.removeFromCartBtn_2 = page.locator("#remove-sauce-labs-bike-light");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.productImg = page.locator("img[alt='Sauce Labs Backpack']");
        this.productDescription = page.locator("body div[id='root'] div[id='page_wrapper'] div[id='contents_wrapper'] div[id='inventory_container'] div div[id='inventory_container'] div[class='inventory_list'] div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1)");
        this.productPrice = page.locator("div[class='inventory_list'] div:nth-child(1) div:nth-child(2) div:nth-child(2) div:nth-child(1)");
    }

    async logoutOfAccount(){
        await this.menuBtn.click();
        await this.logoutBtn.click();
    }

    async getAllProducts() {
        return [this.product1,this.product2,this.product3,this.product4,this.product5,this.product6];
    }

    async sortByNameAsc(){
        await this.filterBtn.click();
        await this.filterBtn.selectOption("Name (A to Z)");
    }

    async sortByNameDec(){
        await this.filterBtn.click();
        await this.filterBtn.selectOption("Name (Z to A)");
    }

    async sortByPriceAsc(){
        await this.filterBtn.click();
        await this.filterBtn.selectOption("Price (low to high)");
    }

    async sortByPriceDec(){
        await this.filterBtn.click();
        await this.filterBtn.selectOption("Price (high to low)");
    }

    async addItemToCart(){
        await this.addToCart.click();
    }

    async removeItemFromCart(){
        await this.removeFromCartBtn.click();
    }

    async addMultipleToCart(){
        await this.addToCart.click();
        await this.addToCart_2.click();

    }

}

module.exports = ProductsPage;