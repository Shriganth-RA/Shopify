import { test, expect } from '@playwright/test'
import * as data from '../fixtures/data.json';

test.describe('Unit Testing on Shopify Website', () => {
    test.describe('Testing on Shopify Pricing Page', () => {

        // Navigate to the website
        test.beforeEach(async ({ page }) => {
            await page.goto(data.baseurl);
        })


        // Navigate to the Pricing Page
        test('Navigate to the Pricing Page', async ({ page }) => {
            const menu = page.locator('ul.flex.h-full > li').nth(1);
            await menu.isVisible();

            await menu.click();
            await expect(page).toHaveURL(/shopify\.com\/in\/pricing/);
        })


        // Testing a Frequently Asked Questions
        test('Test a Frequently Asked Questions', async ({ page }) => {
            const button = page.locator('div.container.grid.gap-y-xl > button[id="header-faq-0-0-:R1hjll5:"]');
            await button.isVisible();

            const accordian = page.locator('div.container.grid.gap-y-xl > div[id="panel-faq-0-0-:R1hjll5:"]');
            await accordian.isVisible();
        })

    })
})