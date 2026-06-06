import {test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { AccountPage } from "../pages/account.page";

test('Verify login with valid credentials', async({page}) =>{
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
//Open URL: https://practicesoftwaretesting.com/auth/login.
await page.goto ('/auth/login');

//Fill in credentials:
//Email: customer@practicesoftwaretesting.com
//Password: welcome01
await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
//Click the Login button.
//await page.getByTestId('login-submit').click();
// Verify successful login
//Verify URL is https://practicesoftwaretesting.com/account.
await expect(page).toHaveURL('/account');
//Verify page title is "My Account"
await expect(accountPage.pageTitle).toHaveText('My account');
await expect(accountPage.navMenu).toHaveText('Jane Doe');
});
