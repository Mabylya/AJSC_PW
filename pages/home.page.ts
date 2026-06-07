import { Locator, Page } from "@playwright/test";

export class HomePage {
    
    page: Page;
    signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole('link', { name: 'Sign in' }); 
  }

  async goto() {
    await this.page.goto('/');
  }
  async openProduct(productName: string) {
    await this.page.getByText(productName, { exact: true }).click();
  }
}
    
  

    