import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

[
  { sort: 'Name (A - Z)', ascending: true },
  { sort: 'Name (Z - A)', ascending: false },
].forEach(({ sort, ascending }) => {
  test(`Verify user can sort products by ${sort}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await Promise.all([
      page.waitForResponse(response =>
        response.url().includes('/products') &&
        response.status() === 200
      ),
      homePage.selectSander(),
    ]);

    await Promise.all([
      page.waitForResponse(response =>
        response.url().includes('/products') &&
        response.status() === 200
      ),
      homePage.sortBy(sort),
    ]);

    const productNames = (await homePage.productNames.allTextContents())
      .map(name => name.trim());

    const expected = [...productNames].sort((a, b) =>
      a.localeCompare(b)
    );

    if (!ascending) {
      expected.reverse();
    }

    expect(productNames).toEqual(expected);
  });
});