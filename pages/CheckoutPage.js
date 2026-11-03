class CheckoutPage{

    constructor(page){
        this.page = page;
        this.cancelBtn = page.locator("#cancel");
        this.continueBtn = page.locator("#continue");
        
    }
}
module.exports = CheckoutPage;