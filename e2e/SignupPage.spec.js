import { test, expect } from '@playwright/test'
import * as data from '../fixtures/data.json'

test.describe('Unit Testing on Shopify Website', () => {
      test.describe('Testing on Shopify Signup Page', () => {

            test.beforeEach(async ({ page }) => {
                  await page.goto(data.baseurl, { waitUntil: 'domcontentloaded' });

                  const startForFree = page.getByText('Start for free').nth(0);
                  await expect(startForFree).toBeVisible({ timeout: 15000 });
                  await startForFree.click();

                  await expect(page).toHaveURL(/accounts\.shopify\.com\/signup?/);
            })

            // Email feild test
            test('Test Email Feild', async ({ page }) => {
                  const EmailFeild = page.locator('input[name="account[email]"]');
                  await expect(EmailFeild).toBeVisible();
            })

            // Apple Auth (conditional)
            test('Test Apple Authenticator', async ({ page }) => {
                  const apple = page.locator('text=/apple/i');

                  if (await apple.count > 0) {
                        await expect(apple).toBeVisible();
                  } else {
                        test.skip(true, 'Apple login not available');
                  }
            })

            // Facebook Auth (conditional)
            test('Test Facebook Authenticator', async({page}) => {
                  const facebook = page.locator('text=/facebook/i');

                  if (await facebook.count > 0) {
                        await expect(facebook).toBeVisible();
                  } else {
                        test.skip(true, 'Facebook login not available');
                  }
            })

            // Google Auth (conditional)
            test('Test Google Authenticator', async({page}) => {
                  const google = page.locator('text=/google/i');

                  if (await google.count > 0) {
                        await expect(google).toBeVisible();
                  } else {
                        test.skip(true, 'Google login not available');
                  }
            })

      })

})