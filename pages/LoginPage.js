class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.errorMessage = page.locator("h3[role='alert']");

    }

    async loginToAccount(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async loginAsStandardUser(){
         await this.page.goto("https://saucedemo.com");
         await this.loginToAccount("standard_user","secret_sauce");
    }

    async getErrorMessage() {
        return this.errorMessage.innerText();
    }

}

module.exports = LoginPage;
