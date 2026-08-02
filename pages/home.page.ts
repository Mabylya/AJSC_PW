import { Locator, Page } from "@playwright/test";
import { Categories } from '../enums/categories.enum';


export class HomePage {
    
    page: Page;
    signInLink: Locator;
    powerToolsCheckbox: Locator;
    grinder: Locator;
    saw: Locator;
    drill: Locator;
    sander: Locator;
    productNames: Locator;
    sortDropdown: Locator;
    productPrices: Locator;

  constructor(page: Page) {
  this.page = page;
  this.signInLink = page.getByRole('link', { name: 'Sign in' });
  this.powerToolsCheckbox = page.getByRole('checkbox', { name: Categories.POWER_TOOLS });
  this.grinder = page.getByRole('checkbox', { name: 'Grinder' });
  this.saw = page.getByRole('checkbox', { name: 'Saw' }).nth(1);
  this.drill = page.getByRole('checkbox', { name: 'Drill' });
  this.sander = page.getByRole('checkbox', { name: 'Sander' });
  this.productNames = page.locator('.card-title');
  this.sortDropdown = page.getByLabel('Sort');
  this.productPrices = page.locator('[data-test="product-price"]');
} 

async getPrices(): Promise<number[]> {
  const prices = await this.productPrices.allTextContents();

  return prices.map(price =>
    Number(price.replace(/[^0-9.]/g, ""))
  );
}
   async clearSelectedTools() {
    await this.uncheckAll(
      this.grinder,
      this.saw,
      this.drill,
    );
  }

  async uncheckAll(...locators: Locator[]) {
    for (const locator of locators) {
      await locator.uncheck();
    }
  }

  async selectGrinder() {
    await this.grinder.check();
  }

  async selectSaw() {
    await this.saw.check();
  }

  async selectDrill() {
    await this.drill.check();
  }

  async selectSander() {
    await this.sander.check();
  }
  async goto() {
    await this.page.goto('/');
  }
  async openProduct(productName: string) {
  await this.productNames
    .filter({ hasText: productName })
    .click();
  }

  async sortBy(label: string) {
  await this.sortDropdown.selectOption({ label });
  }
}

  

