class CheckoutPage{

    constructor(page){
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.firstName = page.locator("#first-name");
        this.lastName = page.locator("#last-name");
        this.postCode = page.locator("#postal-code");
        this.cancelBtn = page.locator("#cancel");
        this.continueBtn = page.locator("#continue");
        this.errorMessage = page.locator("h3[role='alert']");
        
    }

    async emptyFirstName(){
        await this.lastName.click();
        await this.lastName.fill("Doe");

        await this.postCode.click();
        await this.postCode.fill("EC3V 4TS");

        await this.continueBtn.click();
    }

    async emptyLastName(){
        await this.firstName.click();
        await this.firstName.fill("John");

        await this.postCode.click();
        await this.postCode.fill("EC3V 4TS");

        await this.continueBtn.click();
    }

    async emptyPostCode(){
        await this.firstName.click();
        await this.firstName.fill("John");

        await this.lastName.click();
        await this.lastName.fill("Doe");
        
        await this.continueBtn.click();
    }

    async validInfo(){
        await this.firstName.fill("John");
        await this.lastName.fill("Doe");
        await this.postCode.fill("EC3V 4TS");
        await this.continueBtn.click();
    }
}
module.exports = CheckoutPage;