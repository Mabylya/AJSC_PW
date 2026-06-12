import {test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductDetailsPage } from "../pages/productDetails.page";

test('Verify user can view product details', async({page}) =>{
const homePage = new HomePage(page);
const productDetailsPage = new ProductDetailsPage(page);
    //Open URL: https://practicesoftwaretesting.com/
await homePage.goto();
await homePage.openProduct('Combination Pliers');

  await expect(page).toHaveURL(/product/);

  await productDetailsPage.verifyProductDetails(
    'Combination Pliers',
    '14.15'
  );


});

