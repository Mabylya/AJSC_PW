import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

   await homePage.clearSelectedTools();
   const [response] = await Promise.all([
    page.waitForResponse(response =>
      response.url().includes('/products') &&
      response.status() === 200
    ),
    homePage.selectSander(),
  ]);

  expect(response.ok()).toBeTruthy();
  

  await expect(homePage.grinder).not.toBeChecked();
  await expect(homePage.saw).not.toBeChecked();
  await expect(homePage.drill).not.toBeChecked();
  await expect(homePage.sander).toBeChecked();

  
  
  const productNames = (
    await homePage.productNames.allTextContents()
  ).map(name => name.trim());

  productNames.forEach(name => {
    expect(name).toContain('Sander');
  });
});