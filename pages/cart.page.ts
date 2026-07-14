import { Page, Locator } from '@playwright/test';

export class CartPage {
    page: Page;
    productTitle: Locator;
    proceedButton: Locator;
constructor(page: Page){
    this.page = page;
    this.productTitle = this.page.getByTestId('product-title');
    this.proceedButton = this.page.getByTestId('proceed-1');
     }}