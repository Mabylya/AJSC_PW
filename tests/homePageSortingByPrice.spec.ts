import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page"; 

[
  { sort: 'Price (Low - High)', ascending: true },
  { sort: 'Price (High - Low)', ascending: false },
].forEach(({ sort, ascending }) => {
  test(`Verify user can sort products by ${sort}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await homePage.sortBy(sort);

// Wait until at least one price is visible
await expect(homePage.productPrices.first()).toBeVisible();

const prices = await homePage.getPrices();


const expected = [...prices].sort((a, b) => a - b);

if (!ascending) {
  expected.reverse();
}

expect(prices).toEqual(expected);
  });
});