
import {test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');


test('Verify login with valid credentials', async({page}) =>{
    const loginPage = new LoginPage(page);
//Open URL: https://practicesoftwaretesting.com/auth/login.
await loginPage.goto ();

//Fill in credentials:
//Email: customer@practicesoftwaretesting.com
//Password: welcome01
await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
//Click the Login button.
//await page.getByTestId('login-submit').click();
// Verify successful login
//Verify URL is https://practicesoftwaretesting.com/account.
await expect(page).toHaveURL('/account');
  
  await page.context().storageState({ path: authFile });

});
