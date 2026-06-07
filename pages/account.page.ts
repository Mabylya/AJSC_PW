import { Page, Locator } from '@playwright/test';

export class AccountPage {
  page: Page;

  pageTitle: Locator;
  navMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByTestId('page-title');
    this.navMenu = page.getByTestId('nav-menu');
  }

  async goto() {
    await this.page.goto('/account');
  }
}