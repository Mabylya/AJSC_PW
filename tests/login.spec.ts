import test, { chromium, expect } from "@playwright/test";

test('Verify login with valid credentials', async({page}) =>{
//Open URL: https://practicesoftwaretesting.com/auth/login.
await page.goto ('/auth/login');

//Fill in credentials:
//Email: customer@practicesoftwaretesting.com
//Password: welcome01
await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
await page.getByTestId('password').fill('welcome01');
//Click the Login button.
await page.getByTestId('login-submit').click();
// Verify successful login
//Verify URL is https://practicesoftwaretesting.com/account.
await expect(page).toHaveURL('/account')
//Verify page title is "My Account"
await expect(page.getByTestId('page-title')).toHaveText('My account');
await expect(page.getByTestId('nav-menu')).toHaveText('Jane Doe');
});
