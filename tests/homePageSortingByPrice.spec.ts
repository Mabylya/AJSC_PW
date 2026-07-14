import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page"; 

[
  { sort: 'Price (Low - High)', ascending: true },
  { sort: 'Price (High - Low)', ascending: false },
].forEach(({ sort, ascending }) => {
  test(`Verify user can sort products by ${sort}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await page.getByLabel('Sort').selectOption({ label: sort });

    await page.waitForLoadState('networkidle');

    const prices = (await page.locator('[data-test="product-price"]').allTextContents())
      .map(price =>
        Number(price.replace('$', '').trim())
      );

    const expected = [...prices].sort((a, b) => a - b);

    if (!ascending) {
      expected.reverse();
    }

    expect(prices).toEqual(expected);
  });
});