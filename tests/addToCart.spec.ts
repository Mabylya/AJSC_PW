import {test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductDetailsPage } from "../pages/productDetails.page";
import { CartPage } from "../pages/cart.page";

test('Verify user can view product details', async({page}) =>{
const homePage = new HomePage(page);
const productDetailsPage = new ProductDetailsPage(page);
const cartPage = new CartPage(page);

    //Open URL: https://practicesoftwaretesting.com/
  await homePage.goto();
  await homePage.openProduct('Slip Joint Pliers');

  await expect(page).toHaveURL(/product/);

  await productDetailsPage.verifyProductDetails(
    'Slip Joint Pliers',
    '9.17'
  );
  await productDetailsPage.addToCartButton.click();
   
  // Verify alert is visible
  await expect(productDetailsPage.alert).toBeVisible({ timeout: 8000 });

  // Verify alert text
  await expect(productDetailsPage.alert).toHaveText('Product added to shopping cart.');

  // Verify alert disappears within 8 seconds
  await expect(productDetailsPage.alert).toBeHidden({ timeout: 8000 });

  // Verify cart quantity is 1
  
  await expect(productDetailsPage.cartBadge).toHaveText('1');

  await productDetailsPage.navCart.click();
await expect(page).toHaveURL(/checkout/);
await expect(cartPage.productTitle).toHaveCount(1);
await expect(cartPage.productTitle).toHaveText('Slip Joint Pliers');
await expect(cartPage.proceedButton).toBeVisible();

});
