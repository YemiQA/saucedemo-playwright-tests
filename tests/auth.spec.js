const { test, expect } = require('@playwright/test');
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require('../pages/ProductsPage')

test.describe('Authentication Matrix Tests', () => {

    const validUsers = [
        { username: 'standard_user' },
        { username: 'problem_user' },
        { username: 'performance_glitch_user' },
        { username: 'error_user' },
        { username: 'visual_user' }
    ];

    const invalidUsers = [
        { 
            username: 'locked_out_user', 
            password: 'secret_sauce', 
            error: 'Epic sadface: Sorry, this user has been locked out.' 
        },
        { 
            username: 'standard_user', 
            password: 'wrong_password', 
            error: 'Epic sadface: Username and password do not match any user in this service' 
        },
        { 
            username: '', 
            password: 'secret_sauce', 
            error: 'Epic sadface: Username is required' 
        },
        { 
            username: 'standard_user', 
            password: '', 
            error: 'Epic sadface: Password is required' 
        }
    ];

    for (const user of validUsers) {
        test(`Successful Login - User Profile: ${user.username}`, async ({ page }) => {
            await page.goto('https://saucedemo.com');
            const loginPage = new LoginPage(page);
            
            await loginPage.loginToAccount(user.username, 'secret_sauce');
            
            await expect(page).toHaveURL(/inventory.html/);
        });
    }

    for (const nullUser of invalidUsers) {
        test(`Failed Login Scenario - ${nullUser.username || 'Blank'} / ${nullUser.password || 'Blank'}`, async ({ page }) => {
            await page.goto('https://saucedemo.com');
            const loginPage = new LoginPage(page);
            
            await loginPage.loginToAccount(nullUser.username, nullUser.password);
            const errorMessage = await loginPage.getErrorMessage();
            
            await expect(errorMessage).toContain(nullUser.error);
        });
    }

    for (const user of validUsers) {
        test(`Logout of website - User Profile: ${user.username}`, async ({ page }) => {
            await page.goto('https://saucedemo.com');
            const loginPage = new LoginPage(page);
            
            await loginPage.loginToAccount(user.username, 'secret_sauce');

            await expect(page).toHaveURL(/inventory.html/);

            const productsPage = new ProductsPage(page);
            await productsPage.logoutOfAccount();
            
            await expect(page).toHaveURL('https://www.saucedemo.com');
        });
    }
});
