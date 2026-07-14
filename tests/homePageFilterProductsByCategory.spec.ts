import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Categories } from '../enums/categories.enum';

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await page
    .getByRole('checkbox', { name: Categories.POWER_TOOLS })
    .check();

  const grinder = page.getByRole('checkbox', { name: 'Grinder' });
  const saw = page.getByRole('checkbox', { name: 'Saw' }).nth(1);
  const drill = page.getByRole('checkbox', { name: 'Drill' });

  if (await grinder.isChecked()) {
    await grinder.uncheck();
  }

  if (await saw.isChecked()) {
    await saw.uncheck();
  }

  if (await drill.isChecked()) {
    await drill.uncheck();
  }

  await page.waitForLoadState('networkidle');

  const productNames = (await page.locator('.card-title').allTextContents())
    .map(name => name.trim());

  productNames.forEach(name => {
    expect(name).toContain('Sander');
  });
});