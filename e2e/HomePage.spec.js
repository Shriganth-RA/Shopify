import { test, expect } from '@playwright/test'

import { getFooterData } from '../utils/readFooterCSV'
import * as data from '../fixtures/data.json'


test.describe('Unit testing on Shopify website', () => {
      test.describe('Testing on Shopify home page', () => {
            test.describe('Test header section in Shopify website', () => {

                  // Navigate to the website
                  test.beforeEach(async ({ page }) => {
                        await page.goto(data.baseurl);
                  })


                  // Testing a Shopify logo
                  test('Test a Shopify logo', async ({ page }) => {
                        const logo = page.locator('img[data-component-name="logo-home"]');
                        await logo.isVisible();
                  })


                  // Testing a Solutions menu
                  test('Test a Solution menu', async ({ page }) => {
                        const menu = page.locator('button[data-component-name="Solutions-toggle-open"]');
                        await menu.isVisible();

                        await menu.click();

                        const dropdown = page.locator('id="SolutionsDesktopMenu"');
                        await dropdown.isVisible();
                  })


                  // Testing a Pricing menu
                  test('Test a Pricing menu', async ({ page }) => {
                        const menu = page.locator('ul.flex.h-full > li').nth(1);
                        await menu.isVisible();

                        await menu.click();

                        await expect(page).toHaveURL(/shopify\.com\/in\/pricing/);
                        await page.goBack({ waitUntil: 'load' });
                  })


                  // Testing a Resources menu
                  test('Test a Resource menu', async ({ page }) => {
                        const menu = page.locator('ul.flex.h-full > li').nth(2);
                        await menu.isVisible();

                        await menu.click();

                        const dropdown = page.locator('relative no-scrollbar overflow-y-auto');
                        await dropdown.isVisible();
                  })


                  // Testing a Enterprise menu
                  test('Test a Enterprise menu', async ({ page }) => {
                        const menu = page.locator('ul.flex.h-full > li').nth(3);
                        await menu.isVisible();

                        await menu.click();

                        await expect(page).toHaveURL(/shopify\.com\/in\/enterprise/);
                        await page.goBack({ waitUntil: 'load' });
                  })


                  // Testing a Winter edition button
                  test('Test a Winter edition button', async ({ page }) => {
                        const menu = page.locator('ul.flex.h-full > li').nth(4);
                        await menu.isVisible();

                        await menu.click();

                        await expect(page).toHaveURL(/shopify\.com\/editions/);
                        await page.goBack({ waitUntil: 'load' });
                  })


                  // Testing a buttons in the landing page
                  test('Test a Start for free button', async ({ page }) => {
                        const startForFree = page.locator('#main').getByRole('link', { name: 'Start for free' });
                        await startForFree.isVisible();

                        // TODO: Need to verify the page navigation
                  })


                  // Testing a Premium button
                  test('Test a Premium button', async ({ page }) => {
                        const premiumButton = page.getByText('Pick a plan that fits');
                        await premiumButton.isVisible();

                        premiumButton.click();

                        await expect(page).toHaveURL(/shopify\.com\/in\/pricing/);
                        await page.goBack({ waitUntil: 'load' });
                  })


                  // Testing a Footer section
                  const footerData = getFooterData();

                  test('Test Footer topics and Footer links are visible', async ({ page }) => {

                        for (const topic in footerData) {
                              // Check Footer heading
                              await expect(
                                    page.locator('footer').getByText(topic, { exact: true })
                              ).toBeVisible();

                              // Check Footer links
                              for (const link of footerData[topic]) {
                                    await expect(
                                          page.locator('footer').getByText(link, { exact: true })
                                    ).toBeVisible();
                              }
                        }

                  })

            })
      })
})