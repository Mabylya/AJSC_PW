import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
    page: Page;
    productName: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoritesButton: Locator;
constructor(page: Page){
    this.page=page;
    this.productName=this.page.locator('h1');
    this.productPrice = this.page.getByTestId('unit-price');
    this.addToCartButton = this.page.getByRole('button', {
    name: 'Add to Cart',
  });
  this.addToFavoritesButton = this.page.getByRole('button', {
    name: /favorite/i,
  });
}
async verifyProductDetails(name: string, price: string) {
    await expect(this.productName).toHaveText(name);
    await expect(this.productPrice).toContainText(price);
}
}

