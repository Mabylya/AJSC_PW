import {test, expect } from "@playwright/test";


test('Verify login with valid credentials', async({page}) =>{
    
await page.goto ('https://practicesoftwaretesting.com/');


// Use a locator instead of a non-existent page.navMenu property
await test.expect(page.getByTestId('nav-menu')).toHaveText('Jane Doe');
});
